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
    <div className="bg-white p-8 rounded-2xl border shadow-sm">
      {!result ? (
        <div className="text-center">
          <FileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
          <input type="file" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="mb-4 block mx-auto text-sm" />
          {file && !loading && <button onClick={handleUpload} className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">Analyze Resume</button>}
          {loading && <div className="flex justify-center gap-2 text-blue-600"><Loader2 className="animate-spin"/> AI is thinking...</div>}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between items-center bg-blue-50 p-6 rounded-xl">
            <span className="text-xl font-bold">Match Score: {result.match_score}%</span>
            <CheckCircle className="text-green-500" />
          </div>
          <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs">
            {result.audit_log}
          </div>
          <button onClick={() => setResult(null)} className="w-full py-2 bg-slate-100 rounded-lg">Try Again</button>
        </div>
      )}
    </div>
  );
}