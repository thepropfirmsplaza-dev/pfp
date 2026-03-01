import { supabase } from './lib/supabaseClient';

async function setupSettings() {
    console.log('Creating settings table...');
    const { error: createError } = await supabase.rpc('execute_sql', {
        sql_query: `
      CREATE TABLE IF NOT EXISTS platform_settings (
        id integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),
        platform_name text NOT NULL DEFAULT 'PropFirms Plaza',
        support_email text NOT NULL DEFAULT 'support@propfirmsplaza.com',
        maintenance_mode boolean NOT NULL DEFAULT false,
        public_registrations boolean NOT NULL DEFAULT true,
        updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
      );
    `
    });

    if (createError) {
        console.log('Execute SQL failed... Error:', createError);
    } else {
        console.log('Table created or already exists.');
    }

    console.log('Inserting default values...');
    const { data, error } = await supabase
        .from('platform_settings')
        .upsert({
            id: 1,
            platform_name: 'PropFirms Plaza',
            support_email: 'support@propfirmsplaza.com',
            maintenance_mode: false,
            public_registrations: true
        }, { onConflict: 'id' });

    console.log('Upsert result:', error || 'Success');
}

setupSettings();
