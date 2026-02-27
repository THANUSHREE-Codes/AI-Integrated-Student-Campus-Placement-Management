import { Search, Filter, ExternalLink } from 'lucide-react';

export default function RecruiterView() {
  const applicants = [
    { name: "John Doe", score: 94, skills: ["Python", "FastAPI"], status: "Strong Match" },
    { name: "Sarah Smith", score: 88, skills: ["React", "Node.js"], status: "Matched" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Active Job: Senior Backend Developer</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded">Min CGPA: 7.5</div>
          <div className="p-3 bg-slate-50 rounded">Required: BERT-Vector Match &gt; 80%</div>
          <div className="p-3 bg-slate-50 rounded">Applicants: 142</div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-semibold text-sm text-slate-600">Student Name</th>
              <th className="p-4 font-semibold text-sm text-slate-600">AI Match Score</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Key Skills</th>
              <th className="p-4 font-semibold text-sm text-slate-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {applicants.map((student, i) => (
              <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition">
                <td className="p-4 font-medium">{student.name}</td>
                <td className="p-4">
                  <span className="text-blue-600 font-bold">{student.score}%</span>
                </td>
                <td className="p-4 flex gap-2">
                  {student.skills.map(s => <span key={s} className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs">{s}</span>)}
                </td>
                <td className="p-4"><ExternalLink size={16} className="text-slate-400 cursor-pointer" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}