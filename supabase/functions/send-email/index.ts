
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

// Serve the HTTP request
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SHOW_API_KEY = Deno.env.get("SHOW_API_KEY");

    if (!SHOW_API_KEY) {
      console.error("Show API key is not set");
      return new Response(
        JSON.stringify({ error: "Show API key is not configured" }),
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

    // Add contact to Show's audience
    const contactResult = await addOrUpdateContact(SHOW_API_KEY, { 
      email, 
      firstName
    });

    if (!contactResult.success) {
      throw new Error(`Failed to add/update contact: ${contactResult.error}`);
    }

    // Send the appropriate email based on the type
    let emailResult;
    switch (emailType) {
      case "welcome":
        emailResult = await sendWelcomeEmail(SHOW_API_KEY, email, firstName);
        break;
      case "survey":
        emailResult = await sendSurveyEmail(SHOW_API_KEY, email, firstName);
        break;
      case "reminder":
        emailResult = await sendReminderEmail(SHOW_API_KEY, email, firstName);
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

// Helper function to add or update a contact in Show
async function addOrUpdateContact(apiKey: string, contact: { email: string; firstName?: string }) {
  try {
    console.log(`Adding/updating contact in Show: ${contact.email}`);
    
    const response = await fetch("https://api.showapp.io/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        email: contact.email,
        first_name: contact.firstName || ""
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Show API error:", data);
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
async function sendWelcomeEmail(apiKey: string, email: string, firstName: string) {
  try {
    console.log(`Sending welcome email to: ${email}`);
    
    const response = await fetch("https://api.showapp.io/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        template_id: "welcome-template", // Replace with your actual template ID in Show
        personalization: {
          first_name: firstName
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Show API error:", data);
      return { 
        success: false, 
        error: data.message || "Unknown error sending welcome email" 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending welcome email" 
    };
  }
}

// Helper function to send a survey email
async function sendSurveyEmail(apiKey: string, email: string, firstName: string) {
  try {
    console.log(`Sending survey email to: ${email}`);
    
    const response = await fetch("https://api.showapp.io/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        template_id: "survey-template", // Replace with your actual template ID in Show
        personalization: {
          first_name: firstName
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Show API error:", data);
      return { 
        success: false, 
        error: data.message || "Unknown error sending survey email" 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error sending survey email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending survey email" 
    };
  }
}

// Helper function to send a reminder email
async function sendReminderEmail(apiKey: string, email: string, firstName: string) {
  try {
    console.log(`Sending reminder email to: ${email}`);
    
    const response = await fetch("https://api.showapp.io/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        template_id: "reminder-template", // Replace with your actual template ID in Show
        personalization: {
          first_name: firstName
        }
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("Show API error:", data);
      return { 
        success: false, 
        error: data.message || "Unknown error sending reminder email" 
      };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error sending reminder email:", error);
    return { 
      success: false, 
      error: error.message || "Unknown error sending reminder email" 
    };
  }
}
