"use client";
import React, { useState, useEffect } from 'react';
import { LayoutDashboard, UserCircle, Building2, ShieldCheck, LogOut } from 'lucide-react';

// Import the sub-pages (we will define these below)
import StudentView from './components/StudentView';
import RecruiterView from './components/RecruiterView';
import AdminView from './components/AdminView';
// @ts-ignore
import LoginView from './components/LoginView';

export default function MainDashboard() {
  const [activeRole, setActiveRole] = useState<'student' | 'recruiter' | 'admin'>('student');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      setIsLoggedIn(true);
      const saved = localStorage.getItem('role') as 'student'|'recruiter'|'admin' | null;
      if (saved) setActiveRole(saved);
    }
  }, []);

  const handleLogin = (role: 'student'|'recruiter'|'admin') => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', role);
    setActiveRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="app-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div style={{marginBottom:24}}>
          <h1 style={{fontSize:20,fontWeight:800,color:'var(--accent-50)'}}>AI Placement ERP</h1>
          <p className="muted" style={{fontSize:12}}>Version 1.0 (Protothon)</p>
        </div>

        <nav style={{display:'flex',flexDirection:'column',gap:8,flex:1}}>
          {activeRole === 'student' && (
            <button className="nav-btn active">
              <UserCircle size={18} /> Student Portal
            </button>
          )}
          {activeRole === 'recruiter' && (
            <button className="nav-btn active">
              <Building2 size={18} /> Recruiter Portal
            </button>
          )}
          {activeRole === 'admin' && (
            <button className="nav-btn active">
              <ShieldCheck size={18} /> TPO Admin
            </button>
          )}
        </nav>

        <div style={{paddingTop:20,borderTop:'1px solid rgba(255,255,255,0.06)'}}>
          <button onClick={handleLogout} className="nav-btn">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main">
        <header className="card" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <h2 style={{fontSize:20,fontWeight:700,textTransform:'capitalize'}}>{activeRole} Dashboard</h2>
          <div>
            <span className="badge">Session: 2025-26</span>
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