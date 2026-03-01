-- PropFirms Plaza - CONFIRM ADMIN EMAIL
-- The account exists and password is correct!
-- The ONLY issue is the email is not confirmed.
-- Run this in Supabase SQL Editor:

UPDATE auth.users 
SET 
    email_confirmed_at = now(),
    confirmed_at = now(),
    updated_at = now()
WHERE email = 'admin@thecapitalmatch.com';
