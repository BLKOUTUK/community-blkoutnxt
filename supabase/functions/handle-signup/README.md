# Handle Signup Edge Function

This Edge Function handles the initial signup process for BLKOUTNXT. It:
1. Creates or updates a contact in Supabase
2. Creates or updates a contact in SendFox
3. Logs the email operation in Supabase

## Setup

1. Deploy the function:
```bash
supabase functions deploy handle-signup
```

2. Set the required environment variables in the Supabase dashboard:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
   - `SENDFOX_API_KEY`: Your SendFox API key

## Usage

Send a POST request to the function with the following JSON body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "black_queer_man",
  "organisation": "Example Corp"
}
```

The function will:
1. Create or update a contact in your Supabase `contacts` table
2. Create or update a contact in SendFox with appropriate list assignment and automation
3. Log the email operation in your Supabase `email_logs` table

### User Types
The `userType` field should be one of:
- `black_queer_man`
- `ally`
- `organization`
- `organiser`

Each user type will be:
- Added to the appropriate SendFox list
- Trigger the corresponding welcome automation series

## Response

Success response:
```json
{
  "success": true,
  "message": "Contact created successfully" // or "Contact updated successfully"
}
```

Error response:
```json
{
  "error": "Error message here",
  "details": "Stack trace (if available)"
}
```

## CORS

The function is configured to accept requests from any origin (`*`). You can modify the CORS settings in the function code if needed. 