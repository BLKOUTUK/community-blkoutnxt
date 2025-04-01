import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Log the request body
    const body = await req.json()
    console.log('Raw request body:', body)
    console.log('Request headers:', Object.fromEntries(req.headers.entries()))
    
    const { name, email, userType, organisation } = body
    console.log('Extracted fields:', { name, email, userType, organisation })

    // Validate required fields
    if (!name || !email || !userType) {
      console.error('Missing fields:', { name, email, userType })
      throw new Error('Missing required fields: name, email, or userType')
    }

    const SENDFOX_API_KEY = Deno.env.get('SENDFOX_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!SENDFOX_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing environment variables:', {
        hasSendFoxKey: !!SENDFOX_API_KEY,
        hasSupabaseUrl: !!SUPABASE_URL,
        hasServiceKey: !!SUPABASE_SERVICE_ROLE_KEY
      })
      throw new Error('Missing required environment variables')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 1. Check if contact exists
    const { data: existingContact, error: checkError } = await supabase
      .from('contacts')
      .select()
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking existing contact:', checkError)
      throw new Error(`Error checking existing contact: ${checkError.message}`)
    }

    let contact
    if (existingContact) {
      // Update existing contact
      const { data: updatedContact, error: updateError } = await supabase
        .from('contacts')
        .update({
          name,
          role: userType,
          organisation,
          status: 'updated',
          updated_at: new Date().toISOString(),
        })
        .eq('email', email)
        .select()
        .single()

      if (updateError) {
        console.error('Error updating contact:', updateError)
        throw new Error(`Error updating contact: ${updateError.message}`)
      }
      contact = updatedContact
    } else {
      // Create new contact
      const { data: newContact, error: insertError } = await supabase
        .from('contacts')
        .insert([
          {
            name,
            email,
            role: userType,
            organisation,
            status: 'initial_signup',
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (insertError) {
        console.error('Error creating contact:', insertError)
        throw new Error(`Error creating contact: ${insertError.message}`)
      }
      contact = newContact
    }

    // 2. Create/Update contact in SendFox
    const contactResponse = await fetch('https://api.sendfox.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SENDFOX_API_KEY}`
      },
      body: JSON.stringify({
        email,
        first_name: name,
        custom_fields: {
          user_type: userType,
          organisation: organisation,
          signup_date: new Date().toISOString()
        },
        category: userType,
        // Add to the appropriate list based on user type
        lists: [{
          name: userType === 'black_queer_man' ? 'BLKOUT NXT BQM' :
                userType === 'ally' ? 'BLKOUT NXT ALLY' :
                userType === 'organization' ? 'BLKOUT NXT ORGANISATION' :
                'BLKOUT NXT ORGANISER'
        }],
        // This will trigger SendFox's automation for new contacts
        automation: existingContact ? undefined : {
          name: userType === 'black_queer_man' ? "BQM Welcome Series" :
                userType === 'ally' ? "Ally Welcome Series" :
                userType === 'organization' ? "Organization Welcome Series" :
                "Organiser Welcome Series",
          trigger: "on_add"
        }
      }),
    })

    if (!contactResponse.ok) {
      const error = await contactResponse.json()
      console.error('SendFox contact error:', error)
      throw new Error(`SendFox error: ${error.message || 'Failed to create contact'}`)
    }

    // 3. Log the successful operations
    await supabase
      .from('email_logs')
      .insert([
        {
          email_type: existingContact ? 'update' : 'welcome',
          sent_at: new Date().toISOString(),
          status: 'success',
          user_type: userType
        }
      ])

    return new Response(
      JSON.stringify({ 
        success: true,
        message: existingContact ? 'Contact updated successfully' : 'Contact created successfully'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in handle-signup:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})