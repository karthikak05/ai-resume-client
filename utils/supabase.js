import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const createRecord = async (tableName, data) => {
  const { data: insertedData, error } = await supabase
    .from(tableName)
    .insert([data]);

  if (error) {
    console.error('Error creating record:', error.message);
    return { error };
  }

  return { insertedData };
};

// Read function to fetch data from a table
export const readRecords = async (tableName) => {
  const { data, error } = await supabase
    .from(tableName)
    .select('*');

  if (error) {
    console.error('Error reading records:', error.message);
    return { error };
  }

  return { data };
};

// Update function to update an existing record
export const updateRecord = async (tableName, recordId, newData) => {
  const { data: updatedData, error } = await supabase
    .from(tableName)
    .update(newData)
    .eq('id', recordId);

  if (error) {
    console.error('Error updating record:', error.message);
    return { error };
  }

  return { updatedData };
};

// Delete function to remove a record by ID
export const deleteRecord = async (tableName, recordId) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq('id', recordId);

  if (error) {
    console.error('Error deleting record:', error.message);
    return { error };
  }

  return { data };
};

export default supabase;
