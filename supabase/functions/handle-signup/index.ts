import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// Google Sheets API helper function
async function appendToGoogleSheet(values: any[]) {
  const SPREADSHEET_ID = '16sqPMjCkdmoxV-gOW0yPyBJCAF55n69_12Sx2X_8-iE'
  const SHEET_NAME = 'CommunityMembers'
  
  // Get access token using secure method
  const accessToken = await getAccessToken()
  
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        values: [values]
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    console.error('Google Sheets API error:', error)
    throw new Error(`Failed to append to Google Sheet: ${error.message}`)
  }

  return response.json()
}

// Get access token using secure method
async function getAccessToken() {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: Deno.env.get('GOOGLE_CLIENT_ID') || '',
      client_secret: Deno.env.get('GOOGLE_CLIENT_SECRET') || '',
      scope: 'https://www.googleapis.com/auth/spreadsheets'
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to get access token: ${error.message}`)
  }

  const data = await response.json()
  return data.access_token
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { name, email, userType, organisation } = await req.json()
    const SENDFOX_API_KEY = Deno.env.get('SENDFOX_API_KEY')
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    if (!SENDFOX_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables')
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

    // 1. Create contact in Supabase
    const { data: contact, error: supabaseError } = await supabase
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

    if (supabaseError) {
      console.error('Supabase error:', supabaseError)
      throw supabaseError
    }

    // 2. Store in Google Sheets (with error handling)
    try {
      const sheetValues = [
        new Date().toISOString(),
        name,
        email,
        userType,
        organisation || '',
        'Initial Signup'
      ]
      await appendToGoogleSheet(sheetValues)
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError)
      // Continue with the flow even if Google Sheets fails
    }

    // 3. Create contact in SendFox
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
          organisation: organisation
        },
        category: userType // This will trigger the appropriate SendFox automation
      }),
    })

    if (!contactResponse.ok) {
      const error = await contactResponse.json()
      console.error('SendFox contact error:', error)
      throw new Error(`Failed to create contact in SendFox: ${error.message}`)
    }

    // 4. Log the successful operations
    await supabase
      .from('email_logs')
      .insert([
        {
          email_type: 'welcome',
          sent_at: new Date().toISOString(),
          status: 'success',
          user_type: userType
        }
      ])

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in handle-signup:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})