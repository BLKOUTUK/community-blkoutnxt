import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SPREADSHEET_ID = Deno.env.get('GOOGLE_SHEET_ID')
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

    // Trigger GitHub Actions workflow
    const githubToken = Deno.env.get('GITHUB_TOKEN')
    if (!githubToken) {
      throw new Error('Missing GitHub token')
    }

    const workflowResponse = await fetch(
      'https://api.github.com/repos/BLKOUTUK/community-blkoutnxt/actions/workflows/sheets-sync.yml/dispatches',
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ref: 'main',
          inputs: {
            spreadsheet_id: SPREADSHEET_ID,
            data: JSON.stringify(values)
          }
        })
      }
    )

    if (!workflowResponse.ok) {
      const error = await workflowResponse.json()
      console.error('GitHub API error:', error)
      throw new Error(`Failed to trigger workflow: ${JSON.stringify(error)}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: `Triggered sync for ${values.length} records` }),
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