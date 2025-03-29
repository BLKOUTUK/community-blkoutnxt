import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SPREADSHEET_ID = '16sqPMjCkdmoxV-gOW0yPyBJCAF55n69_12Sx2X_8-iE'
const SHEET_NAME = 'CommunityMembers'

serve(async (req) => {
  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing Supabase credentials')
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get all contacts from Supabase
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      throw error
    }

    // Format data for Google Sheets
    const values = contacts.map(contact => [
      contact.created_at,
      contact.name,
      contact.email,
      contact.role,
      contact.organisation || '',
      contact.status
    ])

    // Update Google Sheet
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:clear`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
      }
    )

    if (!response.ok) {
      throw new Error('Failed to clear sheet')
    }

    // Append new data
    const appendResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [
            ['Timestamp', 'Name', 'Email', 'Role', 'Organisation', 'Status'],
            ...values
          ]
        })
      }
    )

    if (!appendResponse.ok) {
      throw new Error('Failed to append data')
    }

    return new Response(
      JSON.stringify({ success: true, message: `Synced ${values.length} records` }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in sync-to-sheets:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}) 