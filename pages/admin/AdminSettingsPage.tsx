import React, { useState, useEffect } from 'react';
import { Save, AlertCircle } from 'lucide-react';
import { usePlatformSettings } from '../../lib/usePlatformSettings';

const AdminSettingsPage: React.FC = () => {
    const { settings, loading, error, updateSettings } = usePlatformSettings();
    const [isSaving, setIsSaving] = useState(false);

    // Local state for edits
    const [formState, setFormState] = useState({
        platformName: '',
        supportEmail: '',
        maintenanceMode: false,
        publicRegistrations: true
    });

    // Sync settings to local state when loaded
    useEffect(() => {
        if (settings) {
            setFormState({
                platformName: settings.platform_name,
                supportEmail: settings.support_email,
                maintenanceMode: settings.maintenance_mode,
                publicRegistrations: settings.public_registrations
            });
        }
    }, [settings]);

    const handleSave = async () => {
        setIsSaving(true);
        const { error } = await updateSettings({
            platform_name: formState.platformName,
            support_email: formState.supportEmail,
            maintenance_mode: formState.maintenanceMode,
            public_registrations: formState.publicRegistrations
        });
        setIsSaving(false);
        if (!error) {
            alert('Settings saved successfully!');
        }
    };

    if (loading) return <div className="p-6 text-brand-gold">Loading settings...</div>;

    return (
        <div className="flex flex-col gap-6 max-w-4xl">
            <div>
                <h2 className="text-2xl font-bold text-white">Platform Settings</h2>
                <p className="text-brand-muted text-sm mt-1">Configure global settings for {settings?.platform_name || 'the platform'}.</p>
            </div>

            {error && error.code === '42P01' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-bold">Database Table Missing</p>
                        <p className="text-sm opacity-90">Please run the `supabase-settings.sql` script in your Supabase SQL Editor to enable fully functional dynamic settings.</p>
                    </div>
                </div>
            )}

            <div className="bg-brand-card border border-brand-border rounded-xl p-6 space-y-8">
                {/* General Settings */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-brand-border pb-2">General Configuration</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand-muted">Platform Name</label>
                            <input
                                type="text"
                                value={formState.platformName}
                                onChange={e => setFormState(s => ({ ...s, platformName: e.target.value }))}
                                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-brand-muted">Support Email</label>
                            <input
                                type="email"
                                value={formState.supportEmail}
                                onChange={e => setFormState(s => ({ ...s, supportEmail: e.target.value }))}
                                className="w-full bg-brand-black border border-brand-border rounded-lg px-4 py-2 text-white focus:border-primary outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Feature Toggles */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-white border-b border-brand-border pb-2">Feature Toggles</h3>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-brand-black/30 rounded-lg border border-brand-border">
                            <div>
                                <p className="text-white font-medium">Public Registrations</p>
                                <p className="text-xs text-brand-muted">Allow new users to create accounts.</p>
                            </div>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    checked={formState.publicRegistrations}
                                    onChange={e => setFormState(s => ({ ...s, publicRegistrations: e.target.checked }))}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5"
                                />
                                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-border cursor-pointer checked:bg-primary"></label>
                            </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-brand-black/30 rounded-lg border border-brand-border">
                            <div>
                                <p className="text-white font-medium">Maintenance Mode</p>
                                <p className="text-xs text-brand-muted">Disable public access to the site.</p>
                            </div>
                            <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                                <input
                                    type="checkbox"
                                    checked={formState.maintenanceMode}
                                    onChange={e => setFormState(s => ({ ...s, maintenanceMode: e.target.checked }))}
                                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 right-5"
                                />
                                <label className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-border cursor-pointer checked:bg-primary"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-brand-border flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-primary text-brand-black px-6 py-2.5 rounded-lg font-bold hover:bg-primaryHover transition-colors shadow-lg shadow-brand-gold/20 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminSettingsPage;
