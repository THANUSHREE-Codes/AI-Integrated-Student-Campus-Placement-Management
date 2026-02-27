"use client";
import React, { useState } from 'react';
import { LayoutDashboard, UserCircle, Building2, ShieldCheck, LogOut } from 'lucide-react';

// Import the sub-pages (we will define these below)
import StudentView from './components/StudentView';
import RecruiterView from './components/RecruiterView';
import AdminView from './components/AdminView';

export default function MainDashboard() {
  const [activeRole, setActiveRole] = useState<'student' | 'recruiter' | 'admin'>('student');

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col p-6">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold text-blue-400">AI Placement ERP</h1>
          <p className="text-xs text-slate-400">Version 1.0 (Protothon)</p>
        </div>

        <nav className="space-y-2 flex-1">
          <button 
            onClick={() => setActiveRole('student')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeRole === 'student' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <UserCircle size={20} /> Student Portal
          </button>
          <button 
            onClick={() => setActiveRole('recruiter')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeRole === 'recruiter' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <Building2 size={20} /> Recruiter Portal
          </button>
          <button 
            onClick={() => setActiveRole('admin')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeRole === 'admin' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
          >
            <ShieldCheck size={20} /> TPO Admin
          </button>
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <button className="flex items-center gap-3 p-3 text-slate-400 hover:text-white transition">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold capitalize">{activeRole} Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full border border-blue-100">
              Session: 2025-26
            </span>
          </div>
        </header>

        {/* Role-Based Rendering */}
        <div className="animate-in fade-in duration-500">
          {activeRole === 'student' && <StudentView />}
          {activeRole === 'recruiter' && <RecruiterView />}
          {activeRole === 'admin' && <AdminView />}
        </div>
      </main>
    </div>
  );
}