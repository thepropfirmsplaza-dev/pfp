-- PropFirms Plaza Admin Force Login 
-- Run this in your Supabase SQL Editor

-- Completely drop the admin user if it exists so we can start totally clean
DELETE FROM auth.users WHERE email = 'admin@thecapitalmatch.com';

-- Recreate the user with the guaranteed password and automatically confirm their email
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'admin@thecapitalmatch.com',
    extensions.crypt('Moiz@tcm786$$$2026', extensions.gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name":"Admin"}',
    now(),
    now()
);
