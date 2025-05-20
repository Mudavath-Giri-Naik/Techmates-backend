const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// Test DB connection by querying a lightweight table (e.g., 'Users')
(async () => {
  try {
    const { data, error } = await supabase
      .from('Users') // change to any table that always exists
      .select('id')
      .limit(1);

    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
    } else {
      console.log('✅ Supabase connected successfully');
    }
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
  }
})();

module.exports = supabase;
