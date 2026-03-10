import { supabase } from './supabaseClient';

/**
 * Generates a high-quality favicon URL from a firm's website domain.
 * Uses Google's favicon service at 128px for crisp rendering.
 */
function getFaviconUrl(website: string): string {
    if (!website) return '';
    try {
        const domain = new URL(website).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
        // If URL parsing fails, try using the raw value
        return `https://www.google.com/s2/favicons?domain=${website}&sz=128`;
    }
}

/**
 * Maps a raw Supabase "firms" row to the shape consumed by front-end components.
 * Keeps BOTH snake_case originals AND adds camelCase aliases so old templates
 * continue to work while new code can use either.
 * 
 * Logo source: Google Favicon API (derived from firm.website)
 */
export function mapFirm(raw: any): any {
    if (!raw) return null;

    // PRIMARY logo: Google Favicon from the firm's website URL
    const faviconLogo = getFaviconUrl(raw.website);

    // Map challenges too
    const challenges = (raw.challenges || []).map((c: any) => ({
        ...c,
        challengeType: c.challenge_type,
        accountSize: c.account_size,
        profitTarget: c.profit_target,
        dailyDrawdown: c.daily_drawdown,
        maxDrawdown: c.max_drawdown,
        minTradingDays: c.min_trading_days,
    }));

    return {
        // Keep ALL original Supabase fields intact
        ...raw,
        challenges,

        // ─── CamelCase aliases for template compatibility ───
        logo: raw.logo_url || faviconLogo,
        logoUrl: raw.logo_url,
        trustScore: Number(raw.rating) || 0,        // numeric trust score (0-5)
        healthScore: Math.round((Number(raw.rating) || 4.5) * 20),
        profitSplit: raw.profit_split || '80%',
        maxFunding: Number(raw.max_funding) || 200000,
        maxAccountSize: Number(raw.max_funding) || 200000,
        minAccountSize: 0,
        evaluationType: raw.challenges?.[0]?.challenge_type || '2-Step',
        payoutTime: raw.avg_payout_time || '24h',
        avgPayoutTime: raw.avg_payout_time || '24h',
        payoutPercentage: Number(raw.payout_percentage) || 95,
        foundedYear: raw.founded_year || '',
        hqLocation: raw.hq_location || '',
        discountCode: raw.discount_code || '',
        affiliateLink: raw.affiliate_link || '',
        newsTrading: raw.news_trading || false,
        weekendHolding: raw.weekend_holding || false,
        scalingPlan: raw.scaling_plan !== false,
        scalingPlanDetails: raw.scaling_plan_details || '',
        features: raw.tags || [],
        instruments: [],
        price: 0,
        dailyDrawdown: raw.drawdown || '10%',
        maxDrawdown: raw.drawdown || '10%',
    };
}

export const FirmService = {
    async getActiveFirms() {
        const { data, error } = await supabase
            .from('firms')
            .select('*, challenges(*)')
            .eq('status', 'active')
            .order('rating', { ascending: false });

        if (error) {
            console.error('Error fetching firms:', error);
            return [];
        }
        return (data || []).map(mapFirm);
    },

    async getFirmDetails(id: string) {
        const { data, error } = await supabase
            .from('firms')
            .select('*, challenges(*)')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching firm details:', error);
            return null;
        }
        return mapFirm(data);
    },

    async trackClick(firmId: string, location: string) {
        try {
            await supabase.from('clicks').insert({ firm_id: firmId, source: location });
        } catch (e) {
            console.error('Failed to track click', e);
        }
    }
};
