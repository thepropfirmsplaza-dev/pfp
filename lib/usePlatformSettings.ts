import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export interface PlatformSettings {
    id: number;
    platform_name: string;
    support_email: string;
    maintenance_mode: boolean;
    public_registrations: boolean;
}

const DEFAULT_SETTINGS: PlatformSettings = {
    id: 1,
    platform_name: 'Capital Match',
    support_email: 'support@thecapitalmatch.com',
    maintenance_mode: true, // TEST MOCK
    public_registrations: true,
};

export const usePlatformSettings = () => {
    const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('platform_settings')
                .select('*')
                .eq('id', 1)
                .single();

            if (error) {
                setError(error as any);
                // If table doesn't exist yet, we silently fallback to defaults in UI, but keep error state
                if (error.code !== '42P01') {
                    console.error('Settings fetch error:', error);
                }
                return;
            }
            if (data) {
                setSettings(data as PlatformSettings);
                setError(null);
            }
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();

        // Subscribe to realtime changes so admin toggles update immediately for everyone
        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'platform_settings',
                },
                (payload) => {
                    if (payload.new && (payload.new as any).id === 1) {
                        setSettings(payload.new as PlatformSettings);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const updateSettings = async (updates: Partial<PlatformSettings>) => {
        try {
            // Optimistic update
            setSettings(prev => ({ ...prev, ...updates }));

            const { error } = await supabase
                .from('platform_settings')
                .update(updates)
                .eq('id', 1);

            if (error && error.code === '42P01') {
                alert('Database table "platform_settings" not found! Please run the supabase-settings.sql script in your Supabase SQL Editor.');
            } else if (error) {
                throw error;
            }
            return { error: null };
        } catch (err: any) {
            console.error('Failed to update settings', err);
            // Revert if failed
            fetchSettings();
            return { error: err };
        }
    };

    return { settings, loading, error, updateSettings };
};
