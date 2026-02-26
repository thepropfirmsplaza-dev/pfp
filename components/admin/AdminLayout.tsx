import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Building2,
    Tag,
    MessageSquare,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    CreditCard,
    Shield,
    Trophy,
    Send,
    ChevronRight,
    Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navSections = [
    {
        section: 'Overview',
        items: [
            { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        ]
    },
    {
        section: 'Management',
        items: [
            { icon: Building2, label: 'Prop Firms', path: '/admin/firms' },
            { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
            { icon: Tag, label: 'Offers & Promos', path: '/admin/offers' },
            { icon: CreditCard, label: 'Payouts', path: '/admin/payouts' },
            { icon: Shield, label: 'Trust Badges', path: '/admin/badges' },
            { icon: Trophy, label: 'Competitions', path: '/admin/competitions' },
        ]
    },
    {
        section: 'Growth',
        items: [
            { icon: Send, label: 'Marketing', path: '/admin/marketing' },
            { icon: Users, label: 'Users', path: '/admin/users' },
        ]
    },
    {
        section: 'System',
        items: [
            { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ]
    }
];

const AdminLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="bg-[#030014] text-white overflow-hidden h-screen flex font-sans">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} lg:w-64 bg-[#0F0B1E] border-r border-[#2D2745] flex flex-col h-full flex-shrink-0 transition-all duration-300`}>
                {/* Logo */}
                <div className="p-5 border-b border-[#2D2745] flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-black text-sm">CM</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <h1 className="text-white text-sm font-bold leading-none tracking-tight">Capital Match</h1>
                        <span className="text-primary/60 text-[10px] font-semibold mt-0.5 uppercase tracking-widest">Admin Console</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-0.5">
                    {navSections.map((section) => (
                        <div key={section.section} className="mb-2">
                            <div className="px-3 pt-3 pb-1.5 text-[10px] font-bold text-white/25 uppercase tracking-widest">
                                {section.section}
                            </div>
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/admin'}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${isActive
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'text-white/50 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            <item.icon size={16} className={isActive ? 'text-primary' : 'text-white/40 group-hover:text-white/80'} />
                                            <span>{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>

                {/* User Footer */}
                <div className="p-3 border-t border-[#2D2745]">
                    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5 group">
                        <div className="h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-[11px] uppercase">
                                {user?.email?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <div className="flex flex-col overflow-hidden flex-1">
                            <span className="text-white text-xs font-bold truncate">{user?.email?.split('@')[0] || 'Admin'}</span>
                            <span className="text-white/30 text-[10px] truncate">Super Admin</span>
                        </div>
                        <button
                            onClick={handleSignOut}
                            title="Sign Out"
                            className="text-white/30 hover:text-red-400 transition-colors ml-auto"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#030014] relative">
                {/* Top Header */}
                <header className="h-14 border-b border-[#2D2745] flex items-center justify-between px-6 bg-[#030014]/95 backdrop-blur-md sticky top-0 z-10 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden text-white/50 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                        >
                            {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                        <div className="relative hidden sm:flex items-center">
                            <Search size={14} className="absolute left-3 text-white/30" />
                            <input
                                className="bg-[#161229] border border-[#2D2745] text-white text-sm rounded-lg pl-9 pr-4 py-2 w-64 focus:outline-none focus:border-primary/50 placeholder:text-white/20 transition-all"
                                placeholder="Search firms, users..."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="relative p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                            <Bell size={16} />
                            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-primary rounded-full"></span>
                        </button>
                        <div className="h-4 w-px bg-white/10"></div>
                        <Link
                            to="/"
                            className="text-xs font-bold text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg transition-all"
                        >
                            ← View Site
                        </Link>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
