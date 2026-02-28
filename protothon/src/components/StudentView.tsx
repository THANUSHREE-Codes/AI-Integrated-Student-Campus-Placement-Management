"use client";
import React, { useState } from 'react';
import { Upload, CheckCircle, BarChart3, Loader2, FileText } from 'lucide-react';

export default function StudentView() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/analyze', { method: 'POST', body: formData });
      const data = await response.json();
      setResult(data);
    } catch (e) { alert("Backend not connected!"); }
    setLoading(false);
  };

  return (
    <div className="card">
      {!result ? (
        <div style={{textAlign:'center',padding:'20px 0'}}>
          <h2 style={{fontSize:24,fontWeight:800,color:'var(--text)',marginBottom:8}}>Analyze Resumes, Academics & Projects</h2>
          <p style={{color:'var(--muted-text)',fontSize:14,marginBottom:24,lineHeight:1.6}}>Upload your PDF resume and let our AI analyze your profile, skills, and match you with suitable job opportunities in real-time.</p>
          
          <FileText style={{height:56,width:56,color:'var(--primary)',margin:'0 auto 20px'}} />
          
          <div style={{position:'relative',display:'inline-block',marginBottom:20}}>
            <input 
              type="file" 
              accept=".pdf" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              style={{display:'none',cursor:'pointer'}}
              id="pdf-upload"
            />
            <label 
              htmlFor="pdf-upload"
              style={{
                display:'inline-block',
                padding:'12px 24px',
                background:'var(--accent-50)',
                color:'var(--primary-600)',
                borderRadius:10,
                cursor:'pointer',
                fontWeight:600,
                border:'2px dashed var(--primary)',
                transition:'all 0.2s'
              }}
            >
              {file ? `Selected: ${file.name}` : 'Choose PDF File'}
            </label>
          </div>

          {file && (
            <div style={{marginTop:20}}>
              {!loading && (
                <button onClick={handleUpload} className="btn-primary" style={{padding:'10px 28px',fontSize:14,fontWeight:600}}>
                  Click Here to Analyse Your Resume
                </button>
              )}
              {loading && <div style={{display:'flex',justifyContent:'center',gap:8,color:'var(--primary-600)',fontSize:14,fontWeight:600}}><Loader2 style={{animation:'spin 1s linear infinite',height:20,width:20}}/> AI is analyzing...</div>}
            </div>
          )}
          
          {!file && (
            <p style={{color:'var(--muted-text)',fontSize:12,marginTop:12}}>👆 Upload a PDF to get started</p>
          )}
        </div>
      ) : (
        <div style={{display:'grid',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',background:'var(--accent-50)',padding:16,borderRadius:12}}>
            <span style={{fontSize:18,fontWeight:800}}>Match Score: {result.match_score}%</span>
            <CheckCircle style={{color:'#10b981'}} />
          </div>
          <div style={{background:'var(--text)',color:'#10b981',padding:12,borderRadius:8,fontFamily:'monospace',fontSize:12}}>
            {result.audit_log}
          </div>
          <button onClick={() => setResult(null)} className="btn-ghost">Try Again</button>
        </div>
      )}
    </div>
  );
}