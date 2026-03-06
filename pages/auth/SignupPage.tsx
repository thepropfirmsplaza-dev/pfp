
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import Button from '../../components/Button'; // Assuming you have a Button component
import { useModal } from '../../context/ModalContext';

const SignupPage = () => {
    const navigate = useNavigate();
    const { showModal } = useModal();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState<'trader' | 'firm_owner' | 'admin'>('trader'); // Added role state
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null); // Renamed error to errorMsg

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null); // Changed setError to setErrorMsg

        if (!role) {
            showModal({ type: 'warning', title: 'Role Required', message: 'Please select a role to continue.' });
            setLoading(false);
            return;
        }

        try {
            // 1. Sign up the user
            const { data, error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName, // meta data for trigger
                        role: role, // Added role to metadata
                    }
                }
            });

            if (signUpError) throw signUpError;

            if (data.session) {
                navigate('/dashboard');
            } else {
                // Fallback for email confirmation flow
                showModal({
                    type: 'success',
                    title: 'Account Created',
                    message: 'Please check your email for confirmation.',
                    onConfirm: () => navigate('/login')
                });
            }

        } catch (err: any) {
            setErrorMsg(err.message || 'Failed to sign up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="flex justify-center mb-6">
                    <Link to="/" className="relative flex items-center justify-center h-20 group">
                        <img
                            src="/logo.png"
                            alt="PropFirms Plaza"
                            className="h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 transform group-hover:scale-105"
                        />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl font-bold text-white tracking-tight">
                    Join PropFirms Plaza
                </h2>
                <p className="mt-2 text-center text-sm text-brand-muted">
                    Start your journey to becoming a funded trader
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
                <div className="bg-brand-surface/80 backdrop-blur-md py-8 px-4 shadow-2xl border border-brand-border rounded-xl sm:px-10">
                    <form className="space-y-6" onSubmit={handleSignup}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-brand-border rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm bg-brand-charcoal text-white transition-all duration-200"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-brand-border rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm bg-brand-charcoal text-white transition-all duration-200"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-4 py-3 border border-brand-border rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 sm:text-sm bg-brand-charcoal text-white transition-all duration-200"
                                    placeholder="Choose a strong password"
                                />
                            </div>
                        </div>

                        {errorMsg && (
                            <div className="text-red-400 text-sm bg-red-900/20 border border-red-900/50 p-3 rounded-lg flex items-center">
                                <span className="material-symbols-outlined mr-2 text-lg">error</span>
                                {errorMsg}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-button-glow text-sm font-bold text-brand-black bg-gradient-to-r from-brand-gold to-[#ffd700] hover:from-[#e5a00d] hover:to-[#eec800] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:-translate-y-0.5"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brand-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : 'Create Account'}
                            </button>
                        </div>
                    </form>



                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-brand-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-brand-surface text-brand-muted">
                                    Already have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Link
                                to="/login"
                                className="w-full flex justify-center py-3 px-4 border border-brand-border rounded-lg shadow-sm text-sm font-medium text-primary bg-brand-charcoal hover:bg-brand-border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-200"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="mt-8 text-center relative z-10">
                <p className="text-sm text-brand-muted">
                    <Link to="/" className="hover:text-primary transition-colors">Back to Home</Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;
