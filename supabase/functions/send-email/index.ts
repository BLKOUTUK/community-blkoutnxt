import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Define the headers for CORS
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:8080",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Max-Age": "86400",
};

// Define interfaces for our requests
interface SendEmailRequest {
  email: string;
  firstName: string;
  emailType: "welcome" | "survey" | "reminder";
  userType?: "black_queer_man" | "organizer" | "ally" | "organization";
}

// Serve the HTTP request
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { 
      headers: corsHeaders,
      status: 204
    });
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

    const { email, firstName, emailType, userType }: SendEmailRequest = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    console.log(`Processing ${emailType} email for ${email}${userType ? ` (${userType})` : ''}`);

    // Add contact to SendFox's audience
    const contactResult = await addOrUpdateContact(SENDFOX_API_KEY, { 
      email, 
      firstName,
      userType
    });

    if (!contactResult.success) {
      throw new Error(`Failed to add/update contact: ${contactResult.error}`);
    }

    // Send the appropriate email based on the type
    let emailResult;
    switch (emailType) {
      case "welcome":
        emailResult = await sendWelcomeEmail(SENDFOX_API_KEY, email, firstName, userType);
        break;
      case "survey":
        emailResult = await sendSurveyEmail(SENDFOX_API_KEY, email, firstName, userType);
        break;
      case "reminder":
        emailResult = await sendReminderEmail(SENDFOX_API_KEY, email, firstName);
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
async function addOrUpdateContact(apiKey: string, contact: { 
  email: string; 
  firstName?: string;
  userType?: string;
}) {
  try {
    console.log(`Adding/updating contact in SendFox: ${contact.email}`);
    
    // Prepare the contact data
    const contactData: Record<string, string> = {
      email: contact.email,
      first_name: contact.firstName || ""
    };
    
    // Add user type as a custom field if provided
    if (contact.userType) {
      contactData.user_type = contact.userType;
    }
    
    const response = await fetch("https://api.sendfox.com/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(contactData),
    });

    const data = await response.json();
    
    if (!response.ok) {
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
async function sendWelcomeEmail(apiKey: string, email: string, firstName: string, userType?: string) {
  try {
    console.log(`Sending welcome email to: ${email} (User type: ${userType || 'not specified'})`);
    
    // Define welcome email content based on user type
    let welcomeContent = '';
    let subject = '';
    
    switch (userType) {
      case "black_queer_man":
        subject = "Welcome to BLKOUTNXT - Your Space to Thrive";
        welcomeContent = `
          <h1>Welcome to BLKOUTNXT, ${firstName}!</h1>
          <p>We're thrilled to have you join our community of Black Queer Men. This is your space to connect, grow, and thrive.</p>
          <p>As a Black Queer Man, you have access to:</p>
          <ul>
            <li>Exclusive membership benefits</li>
            <li>Safe spaces for authentic conversations</li>
            <li>Community events and gatherings</li>
            <li>Professional development opportunities</li>
          </ul>
          <p>To get started, please complete your profile:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
          <p>We look forward to having you as part of our community!</p>
        `;
        break;
        
      case "ally":
        subject = "Welcome to BLKOUTNXT - Join Us in Building Community";
        welcomeContent = `
          <h1>Welcome to BLKOUTNXT, ${firstName}!</h1>
          <p>Thank you for joining us as an Ally/Accomplice. Your support is invaluable in building a stronger, more inclusive community.</p>
          <p>As an Ally, you can:</p>
          <ul>
            <li>Learn about our community's needs and aspirations</li>
            <li>Participate in allyship training and workshops</li>
            <li>Support community initiatives</li>
            <li>Connect with other allies and community members</li>
          </ul>
          <p>To get started, please complete your profile:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
          <p>Together, we can create positive change!</p>
        `;
        break;
        
      case "organizer":
        subject = "Welcome to BLKOUTNXT - Let's Create Impact Together";
        welcomeContent = `
          <h1>Welcome to BLKOUTNXT, ${firstName}!</h1>
          <p>We're excited to have you join us as an Organizer. Your experience and leadership will help shape our community's future.</p>
          <p>As an Organizer, you have access to:</p>
          <ul>
            <li>Organizer-specific resources and tools</li>
            <li>Networking opportunities with other organizers</li>
            <li>Event planning support</li>
            <li>Community engagement initiatives</li>
          </ul>
          <p>To get started, please complete your profile:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
          <p>Let's work together to create meaningful impact!</p>
        `;
        break;
        
      case "organization":
        subject = "Welcome to BLKOUTNXT - Partnering for Community Impact";
        welcomeContent = `
          <h1>Welcome to BLKOUTNXT, ${firstName}!</h1>
          <p>Thank you for joining us as an Organization. We're excited to collaborate and create lasting impact together.</p>
          <p>As an Organization, you can:</p>
          <ul>
            <li>Access partnership opportunities</li>
            <li>Participate in community initiatives</li>
            <li>Share resources and expertise</li>
            <li>Connect with other organizations and community members</li>
          </ul>
          <p>To get started, please complete your profile:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
          <p>Let's build something amazing together!</p>
        `;
        break;
        
      default:
        subject = "Welcome to BLKOUTNXT!";
        welcomeContent = `
          <h1>Welcome to BLKOUTNXT, ${firstName}!</h1>
          <p>Thank you for joining our community. We're excited to have you on board!</p>
          <p>To get started, please complete your profile:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
        `;
    }
    
    const response = await fetch("https://api.sendfox.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        subject: subject,
        category: userType || "general",
        html: welcomeContent
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("SendFox API error:", data);
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

// Helper function to send a survey email with personalization based on user type
async function sendSurveyEmail(apiKey: string, email: string, firstName: string, userType?: string) {
  try {
    console.log(`Sending survey email to: ${email} (User type: ${userType || 'not specified'})`);
    
    // Base personalization for all user types
    const personalization: Record<string, any> = {
      first_name: firstName,
      survey_link: `${Deno.env.get("APP_URL")}/surveys/community-survey`,
      open_question_included: true
    };
    
    // Customize content based on user type
    if (userType === "black_queer_man") {
      personalization.membership_question = true;
      personalization.membership_link = `${Deno.env.get("APP_URL")}/membership`;
      personalization.meeting_option = false;
    } 
    else if (userType === "organizer" || userType === "organization") {
      personalization.membership_question = false;
      personalization.meeting_option = true;
      personalization.meeting_link = `${Deno.env.get("APP_URL")}/schedule-meeting`;
    }
    else {
      // Default for "ally" or unspecified user types
      personalization.membership_question = false;
      personalization.meeting_option = false;
    }
    
    const response = await fetch("https://api.sendfox.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        subject: "Help Shape BLKOUTNXT - Complete Our Survey",
        category: "feedback",
        html: `
          <h1>Hi ${firstName}!</h1>
          <p>We'd love to hear your thoughts about BLKOUTNXT and how we can better serve our community.</p>
          <p>Please take a moment to complete our survey:</p>
          <a href="${personalization.survey_link}">Take the Survey</a>
          ${personalization.membership_question ? `
            <p>As a Black Queer Man, you're eligible for our membership program:</p>
            <a href="${personalization.membership_link}">Learn More About Membership</a>
          ` : ''}
          ${personalization.meeting_option ? `
            <p>Would you like to schedule a meeting with our team?</p>
            <a href="${personalization.meeting_link}">Schedule a Meeting</a>
          ` : ''}
        `
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("SendFox API error:", data);
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
    
    const response = await fetch("https://api.sendfox.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: email,
        subject: "Complete Your BLKOUTNXT Profile",
        category: "reminder",
        html: `
          <h1>Hi ${firstName}!</h1>
          <p>We noticed you haven't completed your profile yet. Take a moment to tell us more about yourself:</p>
          <a href="${Deno.env.get("APP_URL")}/complete-profile?email=${encodeURIComponent(email)}">Complete Your Profile</a>
        `
      }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error("SendFox API error:", data);
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
