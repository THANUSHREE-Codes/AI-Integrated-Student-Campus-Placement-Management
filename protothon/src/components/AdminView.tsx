import { Settings, Users, PieChart } from 'lucide-react';

export default function AdminView() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold flex items-center gap-2 mb-6"><Settings size={18}/> Placement Policy Rules</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <span>Minimum CGPA Lock</span>
            <input type="number" defaultValue={7.5} className="w-16 border rounded p-1 text-center" />
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <span>Max Active Backlogs</span>
            <input type="number" defaultValue={0} className="w-16 border rounded p-1 text-center" />
          </div>
          <div className="flex justify-between items-center p-3 border rounded-lg">
            <span>Allow Cross-Branch Hiring</span>
            <input type="checkbox" defaultChecked className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold flex items-center gap-2 mb-6"><PieChart size={18}/> Drive Analytics</h3>
        <div className="h-40 bg-slate-50 rounded flex items-end gap-2 p-4">
          <div className="bg-blue-400 w-full h-[80%] rounded-t"></div>
          <div className="bg-blue-600 w-full h-[40%] rounded-t"></div>
          <div className="bg-blue-300 w-full h-[95%] rounded-t"></div>
          <div className="bg-blue-500 w-full h-[60%] rounded-t"></div>
        </div>
        <p className="mt-4 text-xs text-slate-500 text-center">Placement Success Ratio per Department</p>
      </div>
    </div>
  );
}