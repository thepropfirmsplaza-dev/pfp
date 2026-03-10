import fetch from 'node-fetch';
import 'dotenv/config';

async function run() {
  const url = process.env.VITE_SUPABASE_URL + '/rest/v1/prop_firms?select=id,name,logo_url';
  const key = process.env.VITE_SUPABASE_ANON_KEY;
  
  const response = await fetch(url, {
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key
    }
  });
  
  const data = await response.json();
  const filtered = data.filter(f => f.name.includes('DNA') || f.name.includes('Goat'));
  console.log(JSON.stringify(filtered, null, 2));
}

run().catch(console.error);
