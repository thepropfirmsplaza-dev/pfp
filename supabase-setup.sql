-- ============================================================
-- CAPITAL MATCH — Supabase Database Setup
-- Run this ENTIRE script in your Supabase SQL Editor:
--   Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================

-- ─── 1. CREATE FIRMS TABLE ───
CREATE TABLE IF NOT EXISTS firms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),

  -- Identity
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  website TEXT DEFAULT '',
  affiliate_link TEXT DEFAULT '',
  logo_url TEXT DEFAULT '',
  favicon TEXT DEFAULT '',
  status TEXT DEFAULT 'active',  -- active | draft | inactive
  rating NUMERIC(2,1) DEFAULT 4.5,

  -- Specifics
  founded_year TEXT DEFAULT '',
  hq_location TEXT DEFAULT '',
  profit_split TEXT DEFAULT '',
  platforms TEXT[] DEFAULT '{}',

  -- Trading Specs
  max_funding INTEGER DEFAULT 200000,
  drawdown TEXT DEFAULT '10%',
  leverage TEXT DEFAULT '1:100',
  tags TEXT[] DEFAULT '{}',
  news_trading BOOLEAN DEFAULT false,
  weekend_holding BOOLEAN DEFAULT false,
  scaling_plan BOOLEAN DEFAULT true,
  scaling_plan_details TEXT DEFAULT '',
  discount_code TEXT DEFAULT '',

  -- Payout Performance
  avg_payout_time TEXT DEFAULT '24h',
  payout_percentage INTEGER DEFAULT 95,
  last_30_days_payouts TEXT DEFAULT '$0',
  payout_growth TEXT DEFAULT '+0%'
);

-- ─── 2. CREATE CHALLENGES TABLE ───
CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  firm_id UUID REFERENCES firms(id) ON DELETE CASCADE,

  name TEXT NOT NULL DEFAULT '2-Step Evaluation',
  challenge_type TEXT DEFAULT '2-Step',     -- 1-Step | 2-Step | 3-Step | Instant
  account_size TEXT DEFAULT '$10,000',
  price TEXT DEFAULT '$99',
  profit_target TEXT DEFAULT '8%',
  daily_drawdown TEXT DEFAULT '5%',
  max_drawdown TEXT DEFAULT '10%',
  min_trading_days TEXT DEFAULT '5'
);

-- ─── 3. ENABLE RLS (Row Level Security) ───
ALTER TABLE firms ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;

-- Public read access for all firms and challenges (needed for the public site)
CREATE POLICY "Public can read firms" ON firms FOR SELECT USING (true);
CREATE POLICY "Public can read challenges" ON challenges FOR SELECT USING (true);

-- Authenticated users can manage firms (admin check is done in app code)
CREATE POLICY "Authenticated can insert firms" ON firms FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update firms" ON firms FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete firms" ON firms FOR DELETE TO authenticated USING (true);

CREATE POLICY "Authenticated can insert challenges" ON challenges FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update challenges" ON challenges FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can delete challenges" ON challenges FOR DELETE TO authenticated USING (true);

-- ─── 4. SEED 6 EXISTING FIRMS ───
INSERT INTO firms (name, description, website, logo_url, status, rating, founded_year, hq_location, profit_split, platforms, max_funding, drawdown, leverage, tags, news_trading, weekend_holding, scaling_plan, scaling_plan_details, avg_payout_time, payout_percentage, last_30_days_payouts, payout_growth)
VALUES
  (
    'FTMO',
    'Industry leader with the highest payout reliability score and longest track record.',
    'https://ftmo.com',
    'https://ftmo.com/wp-content/uploads/2022/02/cropped-favicon-192x192.png',
    'active', 4.9, '2015', 'Prague, Czech Republic',
    '80% - 90%', ARRAY['MT5', 'DXtrade', 'cTrader'],
    200000, '10%', '1:100',
    ARRAY['FOREX', 'INDICES', 'CRYPTO', 'TOP_RATED'],
    false, false, true, 'Yes (every 4 months)',
    '24h', 98, '$8.5M+', '+15%'
  ),
  (
    'Funding Pips',
    'Extremely popular for tight spreads and some of the lowest entry barriers in the industry.',
    'https://fundingpips.com',
    'https://fundingpips.com/wp-content/uploads/2023/06/favicon.png',
    'active', 4.7, '2022', 'Dubai, UAE',
    '80% - 90%', ARRAY['MT5', 'MatchTrader'],
    300000, '10%', '1:100',
    ARRAY['FOREX', 'CRYPTO', 'LOW_COST'],
    true, false, true, 'Yes (every 3 months)',
    '48h', 95, '$4.2M+', '+12%'
  ),
  (
    'E8 Markets',
    'A modern prop firm known for its custom built tracking dashboard and 1-step challenges.',
    'https://e8markets.com',
    'https://e8markets.com/favicon.ico',
    'active', 4.5, '2021', 'Dallas, USA',
    '80%', ARRAY['MT4', 'MT5'],
    400000, '8%', '1:100',
    ARRAY['FOREX', 'CRYPTO', '1_STEP'],
    true, true, true, 'Yes (every 3 months)',
    '48h', 92, '$3.1M+', '+8%'
  ),
  (
    'The 5%ers',
    'Unique instant funding models allowing traders to earn from day one without evaluations.',
    'https://the5ers.com',
    'https://the5ers.com/wp-content/uploads/2022/07/favicon-32x32-1.png',
    'active', 4.6, '2016', 'Raanana, Israel',
    '80% - 100%', ARRAY['MT5'],
    250000, '6%', '1:30',
    ARRAY['FOREX', 'INSTANT', 'BEGINNER'],
    false, false, true, 'Yes (every 3 months)',
    'Weekly', 96, '$5.0M+', '+10%'
  ),
  (
    'FundedNext',
    'The only firm that pays you a 15% profit share during the challenge phases.',
    'https://fundednext.com',
    'https://fundednext.com/wp-content/uploads/2023/03/favicon.png',
    'active', 4.4, '2022', 'Dhaka, Bangladesh',
    '80% - 95%', ARRAY['MT4', 'MT5', 'cTrader'],
    200000, '10%', '1:100',
    ARRAY['FOREX', 'LOWEST_ENTRY', 'EXPRESS'],
    true, true, true, 'Yes (every 4 months)',
    '72h', 90, '$6.8M+', '+20%'
  ),
  (
    'Alpha Capital',
    'Excellent community and intuitive ruleset making it a fast-growing favorite amongst traders.',
    'https://alphacapitalgroup.uk',
    'https://alphacapitalgroup.uk/wp-content/uploads/2023/05/cropped-favicon-32x32.png',
    'active', 4.8, '2021', 'London, UK',
    '80% - 90%', ARRAY['cTrader', 'MT5'],
    200000, '10%', '1:100',
    ARRAY['FOREX', 'INDICES', 'FAST_PAYOUTS'],
    true, false, true, 'Yes (every 3 months)',
    '24h', 97, '$3.5M+', '+14%'
  );

-- ─── 5. SEED CHALLENGES (one sample per firm) ───
-- FTMO Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, '2-Step Evaluation', '2-Step', '$10,000', '$155', '10%', '5%', '10%', '4' FROM firms WHERE name = 'FTMO'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$25,000', '$250', '10%', '5%', '10%', '4' FROM firms WHERE name = 'FTMO'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$50,000', '$345', '10%', '5%', '10%', '4' FROM firms WHERE name = 'FTMO'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$100,000', '$540', '10%', '5%', '10%', '4' FROM firms WHERE name = 'FTMO'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$200,000', '$1,080', '10%', '5%', '10%', '4' FROM firms WHERE name = 'FTMO';

-- Funding Pips Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, '2-Step Evaluation', '2-Step', '$5,000', '$59', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Funding Pips'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$10,000', '$99', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Funding Pips'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$50,000', '$299', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Funding Pips';

-- E8 Markets Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, '1-Step Evaluation', '1-Step', '$25,000', '$98', '8%', '4%', '8%', '5' FROM firms WHERE name = 'E8 Markets'
UNION ALL
SELECT id, '1-Step Evaluation', '1-Step', '$50,000', '$198', '8%', '4%', '8%', '5' FROM firms WHERE name = 'E8 Markets'
UNION ALL
SELECT id, '1-Step Evaluation', '1-Step', '$100,000', '$398', '8%', '4%', '8%', '5' FROM firms WHERE name = 'E8 Markets';

-- The 5%ers Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, 'Instant Funding', 'Instant', '$5,000', '$39', 'N/A', '3%', '6%', '0' FROM firms WHERE name = 'The 5%ers'
UNION ALL
SELECT id, 'Instant Funding', 'Instant', '$20,000', '$175', 'N/A', '3%', '6%', '0' FROM firms WHERE name = 'The 5%ers'
UNION ALL
SELECT id, 'Instant Funding', 'Instant', '$100,000', '$850', 'N/A', '3%', '6%', '0' FROM firms WHERE name = 'The 5%ers';

-- FundedNext Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, '2-Step Express', '2-Step', '$6,000', '$32', '10%', '5%', '10%', '5' FROM firms WHERE name = 'FundedNext'
UNION ALL
SELECT id, '2-Step Express', '2-Step', '$15,000', '$69', '10%', '5%', '10%', '5' FROM firms WHERE name = 'FundedNext'
UNION ALL
SELECT id, '2-Step Express', '2-Step', '$100,000', '$399', '10%', '5%', '10%', '5' FROM firms WHERE name = 'FundedNext';

-- Alpha Capital Challenges
INSERT INTO challenges (firm_id, name, challenge_type, account_size, price, profit_target, daily_drawdown, max_drawdown, min_trading_days)
SELECT id, '2-Step Evaluation', '2-Step', '$10,000', '$49', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Alpha Capital'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$50,000', '$249', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Alpha Capital'
UNION ALL
SELECT id, '2-Step Evaluation', '2-Step', '$200,000', '$949', '8%', '5%', '10%', '3' FROM firms WHERE name = 'Alpha Capital';

-- ─── DONE ───
-- You should now see 6 firms in the admin panel at /admin/firms
-- Each firm has 3-5 challenge types seeded.
