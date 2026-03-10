const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data: dnaData } = await supabase.from('prop_firms').select('id, name, logo_url').ilike('name', '%DNA%');
  console.log('DNA:', dnaData);
  const { data: goatData } = await supabase.from('prop_firms').select('id, name, logo_url').ilike('name', '%Goat%');
  console.log('Goat:', goatData);
}
run();
