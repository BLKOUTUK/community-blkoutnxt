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
    // Get the GitHub token from environment variables
    const GITHUB_TOKEN = Deno.env.get('GITHUB_TOKEN_SHEETS_SYNC')
    if (!GITHUB_TOKEN) {
      throw new Error('Missing GITHUB_TOKEN_SHEETS_SYNC environment variable')
    }

    // Trigger the GitHub Actions workflow
    const response = await fetch(
      'https://api.github.com/repos/onboardblkoutnxt/community-blkoutnxt/dispatches',
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'database_changes',
          client_payload: {
            timestamp: new Date().toISOString(),
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`GitHub API error: ${error.message}`)
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Successfully triggered sheets sync workflow'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error triggering workflow:', error)
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