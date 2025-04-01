# Handle Airtable Form Completion Edge Function

This Edge Function handles form completion triggers from Airtable, creating contacts in SendFox and sending personalized welcome emails.

## Setup

1. Deploy the function:
```bash
supabase functions deploy handle-airtable-form-completion
```

2. Set the required environment variables in the Supabase dashboard:
   - `SENDFOX_API_KEY`: Your SendFox API key
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `APP_URL`: Your application URL (e.g., https://app.blkoutnxt.com)

3. Create the email_logs table in Supabase:
```sql
create table email_logs (
  id uuid default uuid_generate_v4() primary key,
  airtable_record_id text,
  email_type text not null,
  sent_at timestamp with time zone not null,
  status text not null,
  user_type text not null,
  created_at timestamp with time zone default now()
);
```

4. Set up Airtable Automation:
   - Go to your Airtable base
   - Click "Automations" in the top right
   - Click "Create automation"
   - Set up the trigger:
     - When: "Record is updated"
     - Conditions: 
       - "FormCompleted" is "true"
   - Add action:
     - Action: "Send webhook"
     - URL: `https://[YOUR_PROJECT_REF].supabase.co/functions/v1/handle-airtable-form-completion`
     - Method: POST
     - Headers:
       - `Authorization: Bearer [YOUR_SUPABASE_ANON_KEY]`
       - `Content-Type: application/json`
     - Body: Select "Record data"

## Testing

1. In Airtable:
   - Create a new record
   - Set FormCompleted to true
   - Save the record

2. Check the results:
   - Verify the contact was created in SendFox
   - Check that the welcome email was sent
   - Look for the log entry in Supabase's email_logs table

## Troubleshooting

If the automation isn't working:
1. Check the Airtable automation history
2. Look at the Edge Function logs in Supabase
3. Verify all environment variables are set
4. Ensure the SendFox API key has the necessary permissions 