"use client";

import { useState, useEffect } from "react";
import { Loader2, Users, CheckCircle2, XCircle, Trash2, Home, LogOut } from "lucide-react";

export default function AdminPage() {
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<any>(null);

    const checkLogin = async (pass: string) => {
        if (pass === "7789") {
            setIsLoggedIn(true);
            localStorage.setItem("admin-pass", pass);
            fetchStats(pass);
        }
    };

    const fetchStats = async (pass: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/stats?password=${pass}`);
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedPass = localStorage.getItem("admin-pass");
        if (savedPass === "7789") {
            setIsLoggedIn(true);
            fetchStats(savedPass);
        } else {
            setLoading(false);
        }
    }, []);

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-cream-50 flex items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-pink-100 text-center space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-serif text-pink-600">Admin Login</h1>
                        <p className="text-pink-800/60 font-medium uppercase tracking-widest text-xs">Owner Only</p>
                    </div>
                    <div className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && checkLogin(password)}
                            placeholder="Enter Password"
                            className="w-full px-6 py-4 rounded-2xl bg-pink-50 border border-pink-100 text-pink-900 placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 transition-all text-center text-xl tracking-[1em]"
                        />
                        <button
                            onClick={() => checkLogin(password)}
                            className="w-full py-4 bg-pink-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-pink-600 transition-all shadow-lg"
                        >
                            Log In
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (loading && !stats) {
        return (
            <div className="min-h-screen bg-cream-50 flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-pink-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream-50 p-6 md:p-12 font-sans">
            <div className="max-w-5xl mx-auto space-y-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-serif text-pink-600">Libby's Dashboard</h1>
                        <p className="text-pink-800/60 font-medium uppercase tracking-widest text-sm">Guest List & Management</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a href="/" className="px-6 py-3 bg-white text-pink-600 rounded-2xl font-bold shadow-sm hover:shadow-md transition-all flex items-center gap-2 border border-pink-50">
                            <Home className="w-4 h-4" /> View Site
                        </a>
                        <button
                            onClick={() => { localStorage.removeItem("admin-pass"); setIsLoggedIn(false); }}
                            className="px-6 py-3 bg-pink-50 text-pink-500 rounded-2xl font-bold hover:bg-pink-100 transition-all flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" /> Exit
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-50 space-y-2">
                        <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 mb-2">
                            <Users className="w-6 h-6" />
                        </div>
                        <p className="text-pink-800/60 font-bold uppercase tracking-widest text-xs">Total Guests</p>
                        <h2 className="text-4xl font-black text-pink-600">{stats?.totalGuests || 0}</h2>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-50 space-y-2">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-500 mb-2">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <p className="text-pink-800/60 font-bold uppercase tracking-widest text-xs">RSVP Yes</p>
                        <h2 className="text-4xl font-black text-green-600">{stats?.attending || 0}</h2>
                    </div>
                    <div className="bg-white p-8 rounded-[32px] shadow-sm border border-pink-50 space-y-2">
                        <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 mb-2">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <p className="text-pink-800/60 font-bold uppercase tracking-widest text-xs">RSVP No</p>
                        <h2 className="text-4xl font-black text-gray-500">{stats?.declined || 0}</h2>
                    </div>
                </div>

                {/* Guest List */}
                <div className="bg-white rounded-[40px] shadow-sm border border-pink-50 overflow-hidden">
                    <div className="p-8 border-b border-pink-50 bg-pink-50/20">
                        <h3 className="text-xl font-bold text-pink-900">Guest Responses</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-pink-800/60 font-bold uppercase tracking-widest text-xs bg-pink-50/10">
                                    <th className="px-8 py-4">Name</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Guests</th>
                                    <th className="px-8 py-4">Notes</th>
                                    <th className="px-8 py-4">Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-pink-50">
                                {stats?.guestList.map((guest: any, idx: number) => (
                                    <tr key={idx} className="hover:bg-pink-50/5 transition-colors">
                                        <td className="px-8 py-5 font-bold text-pink-900">{guest.name}</td>
                                        <td className="px-8 py-5">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${guest.status === 'attending'
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}>
                                                {guest.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 font-medium text-pink-800">{guest.status === 'attending' ? guest.guests : '-'}</td>
                                        <td className="px-8 py-5 text-pink-800/70 text-sm max-w-[250px] truncate">{guest.dietary || '-'}</td>
                                        <td className="px-8 py-5 text-pink-800/40 text-[10px] uppercase font-bold">
                                            {guest.timestamp ? new Date(guest.timestamp).toLocaleDateString() : '-'}
                                        </td>
                                    </tr>
                                ))}
                                {(!stats?.guestList || stats.guestList.length === 0) && (
                                    <tr>
                                        <td colSpan={5} className="px-8 py-20 text-center text-pink-300 font-medium">
                                            No responses yet...
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="text-center pb-10">
                    <p className="text-pink-300 text-xs font-bold uppercase tracking-[0.2em]">Libby is Turning 2 • Epica Events</p>
                </div>
            </div>
        </div>
    );
}
