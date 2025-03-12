
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define the headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Define interfaces for our requests
interface SendEmailRequest {
  email: string;
  firstName: string;
  emailType: "welcome" | "survey" | "reminder";
}

interface SendFoxContact {
  email: string;
  first_name?: string;
  last_name?: string;
  lists?: number[];
}

// Serve the HTTP request
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SENDFOX_API_KEY = Deno.env.get("SENDFOX_API_KEY");

    if (!SENDFOX_API_KEY) {
      console.error("SendFox API key is not set");
      return new Response(
        JSON.stringify({ error: "SendFox API key is not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    const { email, firstName, emailType }: SendEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log(`Processing ${emailType} email for ${email}`);

    // First make sure the contact exists in SendFox
    const contactResult = await addOrUpdateContact(SENDFOX_API_KEY, { 
      email, 
      first_name: firstName 
    });

    if (!contactResult.success) {
      throw new Error(`Failed to add/update contact: ${contactResult.error}`);
    }

    // Then send the appropriate email based on the type
    let emailResult;
    switch (emailType) {
      case "welcome":
        emailResult = await sendWelcomeEmail(SENDFOX_API_KEY, email);
        break;
      case "survey":
        emailResult = await sendSurveyEmail(SENDFOX_API_KEY, email);
        break;
      case "reminder":
        emailResult = await sendReminderEmail(SENDFOX_API_KEY, email);
        break;
      default:
        throw new Error(`Invalid email type: ${emailType}`);
    }

    if (!emailResult.success) {
      throw new Error(`Failed to send ${emailType} email: ${emailResult.error}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully sent ${emailType} email to ${email}` 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error in send-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Helper function to add or update a contact in SendFox
async function addOrUpdateContact(apiKey: string, contact: SendFoxContact) {
  try {
    console.log(`Adding/updating contact: ${contact.email}`);
    
    const response = await fetch("https://api.sendfox.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();
    
    if (!response.ok) {
      // SendFox may return a 422 if the contact already exists, which is fine
      if (response.status === 422 && data.message?.includes("already exists")) {
        console.log(`Contact ${contact.email} already exists`);
        return { success: true };
      }
      
      console.error("SendFox API error:", data);
      return { 
        success: false, 
        error: data.message || "Unknown error adding contact" 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error adding/updating contact:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error adding contact" 
    };
  }
}

// Helper function to send a welcome email
async function sendWelcomeEmail(apiKey: string, email: string) {
  try {
    console.log(`Sending welcome email to: ${email}`);
    
    // This would use the appropriate SendFox API endpoints
    // In SendFox, you would typically trigger a pre-created email sequence
    // or use their API to send a custom email
    
    // For demo purposes, we're just logging success
    console.log(`Welcome email would be sent to ${email}`);
    
    // This should be replaced with the actual API call
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending welcome email" 
    };
  }
}

// Helper function to send a survey email
async function sendSurveyEmail(apiKey: string, email: string) {
  try {
    console.log(`Sending survey email to: ${email}`);
    
    // This would trigger the survey email sequence in SendFox
    // For demo purposes, we're just logging success
    console.log(`Survey email would be sent to ${email}`);
    
    // This should be replaced with the actual API call
    return { success: true };
  } catch (error) {
    console.error("Error sending survey email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending survey email" 
    };
  }
}

// Helper function to send a reminder email
async function sendReminderEmail(apiKey: string, email: string) {
  try {
    console.log(`Sending reminder email to: ${email}`);
    
    // This would trigger the reminder email sequence in SendFox
    // For demo purposes, we're just logging success
    console.log(`Reminder email would be sent to ${email}`);
    
    // This should be replaced with the actual API call
    return { success: true };
  } catch (error) {
    console.error("Error sending reminder email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending reminder email" 
    };
  }
}
