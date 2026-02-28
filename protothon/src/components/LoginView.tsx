import React, { useState } from 'react';

type Role = 'student' | 'recruiter' | 'admin';

interface LoginViewProps {
  onLogin: (role: Role) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please fill all fields');
      return;
    }
    // for demo, any credentials succeed; role drives routing
    onLogin(role);
  };

  return (
    <div className="login-container">
      <div className="login-sidebar">
        <h1 style={{fontFamily:'Roboto Slab, serif'}}>Welcome to</h1>
        <p style={{fontFamily:'Roboto Slab, serif'}}>AI Placement ERP</p>
      </div>
      <div className="login-content">
        <div className="login-card">
          <h2 style={{marginBottom:20,fontSize:22,fontWeight:800,color:'var(--text)'}}>Login</h2>
          <p style={{marginBottom:28,color:'var(--muted-text)',lineHeight:1.5}}>Select your role and sign in to continue.</p>
          <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <div className="role-toggle">
          <button type="button" className={role==='student'?'active':''} onClick={()=>setRole('student')}>Student</button>
          <button type="button" className={role==='recruiter'?'active':''} onClick={()=>setRole('recruiter')}>Recruiter</button>
          <button type="button" className={role==='admin'?'active':''} onClick={()=>setRole('admin')}>TPO Admin</button>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div style={{color:'red',marginBottom:12,fontSize:13}}>{error}</div>}
        <button type="submit" className="btn-primary" style={{padding:'10px 30px',fontSize:14,transition:'background 0.2s'}}>
          Log In
        </button>
      </form>
        </div>
      </div>
    </div>
  );
}
