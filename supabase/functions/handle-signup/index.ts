// This endpoint should have JWT verification disabled since it's a signup endpoint
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
    // Get environment variables
    const SENDFOX_ACCESS_TOKEN = Deno.env.get('SENDFOX_ACCESS_TOKEN')
    
    if (!SENDFOX_ACCESS_TOKEN) {
      throw new Error('Missing SendFox access token')
    }

    // Parse request body
    const body = await req.json()
    const { name, email, userType, organisation } = body

    // Validate required fields
    if (!name || !email || !userType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create/Update contact in SendFox
    const sendfoxData = {
      email: email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' ') || '',
      lists: [
        userType === 'black_queer_man' ? 1 :
        userType === 'ally' ? 2 :
        userType === 'organization' ? 3 : 4
      ]
    }

    // Send to SendFox
    const contactResponse = await fetch('https://api.sendfox.com/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${SENDFOX_ACCESS_TOKEN}`
      },
      body: JSON.stringify(sendfoxData)
    })

    const responseData = await contactResponse.json()

    if (!contactResponse.ok) {
      return new Response(
        JSON.stringify({ error: responseData.message || 'SendFox API error' }),
        { status: contactResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    return new Response(
      JSON.stringify({ success: true, data: responseData }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})