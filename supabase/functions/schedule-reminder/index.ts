
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.5.0";

// Define the headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ScheduleRequest {
  email: string;
  userId: string;
  firstName: string;
  reminderAfterDays: number;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Supabase credentials are not set");
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

    // Get the request data
    const { email, userId, firstName, reminderAfterDays = 3 }: ScheduleRequest = await req.json();

    if (!email || !userId) {
      return new Response(
        JSON.stringify({ error: "Email and userId are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Calculate the reminder date (e.g., 3 days from now)
    const reminderDate = new Date();
    reminderDate.setDate(reminderDate.getDate() + reminderAfterDays);

    // Store the reminder in a table (we need to create this table)
    const { data, error } = await supabase
      .from('email_reminders')
      .insert([
        { 
          user_id: userId,
          email: email,
          first_name: firstName,
          reminder_type: 'survey',
          scheduled_for: reminderDate.toISOString(),
          status: 'scheduled'
        }
      ]);

    if (error) {
      throw new Error(`Failed to schedule reminder: ${error.message}`);
    }

    console.log(`Reminder scheduled for ${email} on ${reminderDate}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Reminder scheduled for ${reminderDate}`,
        data: data
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in schedule-reminder function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
