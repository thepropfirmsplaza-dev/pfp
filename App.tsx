import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import LandingPage from './pages/LandingPage';
import BrowseFirmsPage from './pages/BrowseFirmsPage';
import FirmDetailPage from './pages/FirmDetailPage';
import ComparePage from './pages/ComparePage';
import OffersPage from './pages/OffersPage';
import UserDashboard from './pages/UserDashboard';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionDetailPage from './pages/CompetitionDetailPage';
import TermsOfService from './pages/legal/TermsOfService';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import RiskDisclosure from './pages/legal/RiskDisclosure';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminFirmsPage from './pages/admin/AdminFirmsPage';
import AdminReviewsPage from './pages/admin/AdminReviewsPage';
import AdminPayoutsPage from './pages/admin/AdminPayoutsPage';
import AdminBadgesPage from './pages/admin/AdminBadgesPage';
import AdminOffersPage from './pages/admin/AdminOffersPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminRewardsPage from './pages/admin/AdminRewardsPage';
import AdminCompetitionsPage from './pages/admin/AdminCompetitionsPage';
import AdminMarketingPage from './pages/admin/AdminMarketingPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { ComparisonProvider } from './context/ComparisonContext';
import { ModalProvider } from './context/ModalContext';
import GlobalModal from './components/GlobalModal';
import ComparisonFloatingBar from './components/ComparisonFloatingBar';
import PayoutNotification from './components/PayoutNotification';
import { FirmFinderQuiz as Quiz } from './components/FirmFinderQuiz';
import { VisualComparisonHub } from './components/VisualComparisonHub';
import MaintenanceMode from './components/MaintenanceMode';
import { usePlatformSettings } from './lib/usePlatformSettings';

// ScrollToTop Component - Scrolls to top on route change
const ScrollToTop: React.FC = () => {
    const { pathname } = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; role?: 'admin' | 'user' }> = ({ children, role }) => {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-brand-gold">Loading PropFirms Plaza...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role === 'admin' && !isAdmin) {
        // Redirect non-admins to dashboard or home
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

// Main Layout Component (Requires Router Context)
const MainLayout = () => {
    const location = useLocation();
    const isAdminPage = location.pathname.startsWith('/admin');
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    // Global Settings tracking
    const { settings, loading } = usePlatformSettings();

    // Show maintenance screen if globally enabled, UNLESS user is on an admin/auth route trying to log in or manage the site.
    if (settings?.maintenance_mode && !isAdminPage && !isAuthPage && !loading) {
        return <MaintenanceMode />;
    }

    return (
        <div className="min-h-screen bg-dark flex flex-col font-sans text-white selection:bg-primary/30">
            <ScrollToTop />
            {(!isAdminPage && !isAuthPage) ? (
                <Layout activeView="home" onViewChange={() => { }}>
                    <main className="flex-grow">
                        <Routes>
                            {/* Legacy PropFirms Plaza Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/quiz" element={<Quiz onComplete={() => window.location.hash = '#/firms'} />} />
                            <Route path="/hub" element={<div className="pt-24 min-h-screen"><VisualComparisonHub /></div>} />

                            {/* Reference App Routes */}
                            <Route path="/firms" element={<BrowseFirmsPage />} />
                            <Route path="/firm/:id" element={<FirmDetailPage />} />
                            <Route path="/compare" element={<ComparePage />} />
                            <Route path="/competitions" element={<CompetitionsPage />} />
                            <Route path="/competition/:id" element={<CompetitionDetailPage />} />
                            <Route path="/offers" element={<OffersPage />} />

                            {/* Legal & Static Pages */}
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/terms" element={<TermsOfService />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/risk" element={<RiskDisclosure />} />
                            <Route path="/contact" element={<ContactUs />} />

                            {/* Protected User Dashboard */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <UserDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </main>
                </Layout>
            ) : (
                <main className="flex-grow">
                    <Routes>
                        {/* Auth Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />

                        {/* Admin Routes - Protected */}
                        <Route path="/admin" element={
                            <ProtectedRoute role="admin">
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<AdminDashboard />} />
                            <Route path="firms" element={<AdminFirmsPage />} />
                            <Route path="reviews" element={<AdminReviewsPage />} />
                            <Route path="payouts" element={<AdminPayoutsPage />} />
                            <Route path="badges" element={<AdminBadgesPage />} />
                            <Route path="offers" element={<AdminOffersPage />} />
                            <Route path="users" element={<AdminUsersPage />} />
                            <Route path="rewards" element={<AdminRewardsPage />} />
                            <Route path="marketing" element={<AdminMarketingPage />} />
                            <Route path="competitions" element={<AdminCompetitionsPage />} />
                            <Route path="settings" element={<AdminSettingsPage />} />
                        </Route>
                    </Routes>
                </main>
            )}

            {/* Global Comparison Floating Bar */}
            {!isAdminPage && <ComparisonFloatingBar />}

            {/* Social Proof Payout Notifications */}
            {!isAdminPage && !isAuthPage && <PayoutNotification />}
        </div>
    );
};

function App() {
    return (
        <HashRouter>
            <AuthProvider>
                <ModalProvider>
                    <ComparisonProvider>
                        <MainLayout />
                        <GlobalModal />
                    </ComparisonProvider>
                </ModalProvider>
            </AuthProvider>
        </HashRouter>
    );
}

export default App;
