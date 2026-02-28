import React, { useState } from 'react';
import { Search, Filter, Mail } from 'lucide-react';

export default function RecruiterView() {
  const companyName = "Nexus.ai"; // could be passed in as prop later
  const [applicants, setApplicants] = useState([
    { name: "John D'souza", email: "shiva@example.com", score: 94, skills: ["Python", "FastAPI"], status: "Strong Match", emailSent: false },
    { name: "Riya Rao", email: "riya@example.com", score: 88, skills: ["React", "Node.js"], status: "Matched", emailSent: false },
  ]);

  const handleSendEmail = async (idx: number) => {
    const student = applicants[idx];
    const prev = applicants;
    const next = prev.map((a, i) => i === idx ? { ...a, emailSent: true } : a);
    setApplicants(next);

    try {
      const res = await fetch('http://127.0.0.1:8000/send-selection-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: student.name,
          student_email: student.email,
          company_name: 'TechCorp',
          job_title: 'Senior Backend Developer',
        }),
      });

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      if (data?.status !== 'success') throw new Error(data?.message || 'Unknown error');
    } catch (e: any) {
      // rollback
      setApplicants(prev);
      alert('Failed to send email: ' + (e?.message || e));
    }
  };

  return (
    <div style={{display:'grid',gap:20}}>
      <div style={{fontSize:18,fontWeight:700,color:'var(--text)'}}>Company: {companyName}</div>
      <div className="card">
        <h3 style={{fontSize:16,fontWeight:700,marginBottom:12}}>Active Job: Senior Backend Developer</h3>
        <div style={{display:'flex',gap:12,fontSize:13}}>
          <div className="muted-bg" style={{padding:10,borderRadius:10}}>Min CGPA: 7.5</div>
          <div className="muted-bg" style={{padding:10,borderRadius:10}}>Required:Match &gt; 80%</div>
          <div className="muted-bg" style={{padding:10,borderRadius:10}}>Applicants: 142</div>
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>AI Match Score</th>
              <th>Key Skills</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((student, i) => (
              <tr key={i} style={{transition:'background .12s'}}>
                <td style={{fontWeight:600}}>{student.name}</td>
                <td><span style={{color:'var(--primary-600)',fontWeight:700}}>{student.score}%</span></td>
                <td style={{display:'flex',gap:8}}>
                  {student.skills.map(s => <span key={s} className="pill">{s}</span>)}
                </td>
                <td>
                  <button
                    onClick={() => handleSendEmail(i)}
                    className={student.emailSent ? 'btn-success' : 'btn-primary'}
                    style={{display:'flex',alignItems:'center',gap:6,fontSize:12,padding:'6px 10px'}}
                  >
                    <Mail size={14} /> {student.emailSent ? 'Sent' : 'Send Email'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}