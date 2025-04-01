import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Define the headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface FormCompletionPayload {
  record: {
    id: string;
    email: string;
    first_name: string;
    user_type: "black_queer_man" | "organizer" | "ally" | "organization";
    form_completed: boolean;
    form_completed_at: string;
  };
  type: "INSERT" | "UPDATE";
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SENDFOX_API_KEY = Deno.env.get("SENDFOX_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SENDFOX_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing required environment variables");
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Get the payload from the request
    const payload: FormCompletionPayload = await req.json();

    // Only process if it's an UPDATE and form_completed is true
    if (payload.type === "UPDATE" && payload.record.form_completed) {
      const { email, first_name, user_type } = payload.record;

      // Send welcome email via SendFox
      const response = await fetch("https://api.sendfox.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SENDFOX_API_KEY}`
        },
        body: JSON.stringify({
          to: email,
          subject: `Welcome to BLKOUTNXT - ${user_type === "black_queer_man" ? "Your Space to Thrive" : "Join Our Community"}`,
          category: user_type,
          html: `
            <h1>Welcome to BLKOUTNXT, ${first_name}!</h1>
            <p>Thank you for completing your profile. We're excited to have you as part of our community!</p>
            <p>Your profile type: ${user_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
            <p>You can now access all features available to your account type.</p>
            <a href="${Deno.env.get("APP_URL")}/dashboard">Visit Your Dashboard</a>
          `
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to send welcome email: ${error.message}`);
      }

      // Log the successful email send
      await supabase
        .from('email_logs')
        .insert([
          {
            user_id: payload.record.id,
            email_type: 'form_completion_welcome',
            sent_at: new Date().toISOString(),
            status: 'success'
          }
        ]);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    );
  } catch (error) {
    console.error("Error in handle-form-completion:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500 
      }
    );
  }
}); 