const { google } = require('googleapis');
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Google Sheets API
const sheets = google.sheets('v4');
const auth = new google.auth.GoogleAuth({
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

async function syncToGoogleSheets() {
  try {
    // 1. Get contacts from Supabase
    const { data: contacts, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    // 2. Prepare data for Google Sheets
    const headers = [
      ['Name', 'Email', 'Role', 'Organisation', 'Status', 'Created At', 'Updated At']
    ];

    const rows = contacts.map(contact => [
      contact.name,
      contact.email,
      contact.role,
      contact.organisation || '',
      contact.status,
      new Date(contact.created_at).toLocaleString(),
      contact.updated_at ? new Date(contact.updated_at).toLocaleString() : ''
    ]);

    const values = [...headers, ...rows];

    // 3. Update Google Sheet
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Sheet1!A1:G' + values.length;

    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId: sheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Successfully synced data to Google Sheets');
  } catch (error) {
    console.error('Error syncing to Google Sheets:', error);
    process.exit(1);
  }
}

// Run the sync
syncToGoogleSheets(); 