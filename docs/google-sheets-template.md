# Google Sheets Setup Guide

## 1. Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "BLKOUTNXT Community Members"
4. Rename the first sheet to "CommunityMembers"

## 2. Set Up Headers

Add these headers in the first row:
- Timestamp
- Name
- Email
- Role
- Organisation
- Status

## 3. Set Up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable the Google Sheets API
4. Create a service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Name it "blkoutnxt-sheets"
   - Grant it the "Editor" role
   - Create and download the JSON key file

## 4. Share the Sheet

1. Open your Google Sheet
2. Click "Share" in the top right
3. Add the service account email (from the JSON key file) with "Editor" access
4. Copy the spreadsheet ID from the URL (it's the long string between /d/ and /edit)

## 5. Set Up Environment Variables

Add these to your Supabase project:

```bash
GOOGLE_SHEET_ID=your_spreadsheet_id
GOOGLE_CREDENTIALS={"type": "service_account", ...} # The entire contents of your JSON key file
```

## 6. Deploy the Edge Function

```bash
supabase functions deploy handle-signup
```

## Sheet Structure

The sheet will automatically append new rows with this structure:
- Column A: Timestamp (ISO format)
- Column B: Name
- Column C: Email
- Column D: Role (black_queer_man, organizer, ally, or organization)
- Column E: Organisation (if provided)
- Column F: Status

## Benefits of Using Google Sheets

1. **Free Tier Limits**:
   - 5 million cells per sheet
   - No record limit
   - 2GB storage per sheet
   - 100 sheets per workbook

2. **Easy Access**:
   - Share with team members
   - Export to CSV/Excel
   - Built-in filtering and sorting
   - Can create pivot tables and charts

3. **Integration Options**:
   - Google Apps Script for automation
   - Google Forms integration
   - Data Studio for visualizations
   - Google Data API for programmatic access

## Security Considerations

1. The service account has minimal required permissions
2. Only the Edge Function can write to the sheet
3. You can control access to the sheet separately
4. All data is encrypted in transit and at rest

## Troubleshooting

If you encounter issues:

1. Check the service account permissions
2. Verify the spreadsheet ID
3. Ensure the sheet name matches exactly
4. Check the Edge Function logs in Supabase
5. Verify all environment variables are set correctly 