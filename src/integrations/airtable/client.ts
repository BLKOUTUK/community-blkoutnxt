import Airtable from 'airtable';

// Use environment variables for Airtable configuration
const airtableApiKey = import.meta.env.VITE_AIRTABLE_API_KEY;
const airtableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!airtableApiKey || !airtableBaseId) {
  console.error('Missing Airtable environment variables. Check your .env file.');
}

// Configure Airtable
Airtable.configure({
  apiKey: airtableApiKey,
});

export const airtableBase = Airtable.base(airtableBaseId || '');

// Helper functions for common operations
export const getRecords = async (tableName: string, options?: any) => {
  try {
    const records = await airtableBase(tableName).select(options).all();
    return records.map(record => ({
      id: record.id,
      ...record.fields,
    }));
  } catch (error) {
    console.error(`Error fetching records from ${tableName}:`, error);
    throw error;
  }
};

export const getRecord = async (tableName: string, recordId: string) => {
  try {
    const record = await airtableBase(tableName).find(recordId);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error fetching record from ${tableName}:`, error);
    throw error;
  }
};

export const createRecord = async (tableName: string, fields: any) => {
  try {
    const record = await airtableBase(tableName).create(fields);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error creating record in ${tableName}:`, error);
    throw error;
  }
};

export const updateRecord = async (tableName: string, recordId: string, fields: any) => {
  try {
    const record = await airtableBase(tableName).update(recordId, fields);
    return {
      id: record.id,
      ...record.fields,
    };
  } catch (error) {
    console.error(`Error updating record in ${tableName}:`, error);
    throw error;
  }
};

export const deleteRecord = async (tableName: string, recordId: string) => {
  try {
    await airtableBase(tableName).destroy(recordId);
    return { success: true, id: recordId };
  } catch (error) {
    console.error(`Error deleting record from ${tableName}:`, error);
    throw error;
  }
};