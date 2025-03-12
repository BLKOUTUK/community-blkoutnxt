
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.5.0";

// Define the headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const SHOW_API_KEY = Deno.env.get("SHOW_API_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !SHOW_API_KEY) {
      console.error("Required environment variables are not set");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Create a Supabase client with the service role key
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get current time
    const now = new Date();
    
    // Find all reminders that are due
    const { data: dueReminders, error: findError } = await supabase
      .from('email_reminders')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_for', now.toISOString());

    if (findError) {
      throw new Error(`Failed to fetch due reminders: ${findError.message}`);
    }

    console.log(`Found ${dueReminders?.length || 0} reminders due for processing`);

    if (!dueReminders || dueReminders.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "No reminders due for processing" 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Process each reminder
    const results = await Promise.all(
      dueReminders.map(async (reminder) => {
        try {
          // Invoke the send-email function to send the reminder
          const response = await fetch(
            `${SUPABASE_URL}/functions/v1/send-email`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
              },
              body: JSON.stringify({
                email: reminder.email,
                firstName: reminder.first_name,
                emailType: reminder.reminder_type
              }),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Failed to send email");
          }

          // Update the reminder status
          const { error: updateError } = await supabase
            .from('email_reminders')
            .update({ 
              status: 'sent',
              processed_at: new Date().toISOString() 
            })
            .eq('id', reminder.id);

          if (updateError) {
            throw new Error(`Failed to update reminder status: ${updateError.message}`);
          }

          return {
            id: reminder.id,
            success: true,
            message: `Sent ${reminder.reminder_type} email to ${reminder.email}`
          };
        } catch (error) {
          console.error(`Error processing reminder ${reminder.id}:`, error);
          
          // Update the reminder status to 'failed'
          await supabase
            .from('email_reminders')
            .update({ 
              status: 'failed',
              processed_at: new Date().toISOString(),
              error_message: error.message 
            })
            .eq('id', reminder.id);
            
          return {
            id: reminder.id,
            success: false,
            error: error.message
          };
        }
      })
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        processed: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length,
        results: results
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in process-reminders function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
