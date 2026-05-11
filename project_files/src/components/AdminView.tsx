import React, { useState } from 'react';
import { Settings, Users, PieChart } from 'lucide-react';

export default function AdminView() {
  const [companies, setCompanies] = useState([
    { name: 'Acme Corp', approved: false },
    { name: 'Globex Solutions', approved: false },
    { name: 'Initech', approved: true },
  ]);

  const toggleApprove = async (idx: number) => {
    const prev = companies;
    const next = prev.map((c, i) => i === idx ? { ...c, approved: !c.approved } : c);
    setCompanies(next);

    try {
      const res = await fetch('http://127.0.0.1:8000/approve-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: next[idx].name, approved: next[idx].approved }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      if (data?.status !== 'success') throw new Error(data?.message || 'Unknown error');
    } catch (e: any) {
      // rollback optimistic update
      setCompanies(prev);
      alert('Failed to update approval: ' + (e?.message || e));
    }
  };

  return (
    <div className="card-grid">
      <div className="card">
        <h3 style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,fontWeight:700}}><Settings size={18}/>Change Placement Policy Rules</h3>
        <div style={{display:'grid',gap:12}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10,border:'1px solid var(--border)',borderRadius:10}}>
            <span>Minimum CGPA Lock</span>
            <input type="number" defaultValue={7.5} style={{width:64,border:'1px solid var(--border)',borderRadius:8,padding:6,textAlign:'center'}} />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10,border:'1px solid var(--border)',borderRadius:10}}>
            <span>Max Active Backlogs</span>
            <input type="number" defaultValue={0} style={{width:64,border:'1px solid var(--border)',borderRadius:8,padding:6,textAlign:'center'}} />
          </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10,border:'1px solid var(--border)',borderRadius:10}}>
            <span>Allow Cross-Branch Hiring</span>
            <input type="checkbox" defaultChecked style={{height:18,width:18}} />
          </div>
        </div>
      </div>

      <div className="card" style={{gridColumn:'1 / -1'}}>
        <h3 style={{display:'flex',alignItems:'center',gap:8,marginBottom:20,fontWeight:700,fontSize:16}}><PieChart size={18}/> Placement Analytics Dashboard</h3>
        
        {/* KPI Cards */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))',gap:12,marginBottom:20}}>
          <div style={{background:'var(--accent-50)',padding:14,borderRadius:10,borderLeft:'4px solid var(--primary-600)'}}>
            <div className="muted" style={{fontSize:11,fontWeight:600,marginBottom:6}}>Total Placements</div>
            <div style={{fontSize:24,fontWeight:800,color:'var(--primary-600)'}}>287</div>
            <div className="muted" style={{fontSize:10,marginTop:4}}>↑ 12% this month</div>
          </div>
          <div style={{background:'var(--accent-50)',padding:14,borderRadius:10,borderLeft:'4px solid #10b981'}}>
            <div className="muted" style={{fontSize:11,fontWeight:600,marginBottom:6}}>Success Rate</div>
            <div style={{fontSize:24,fontWeight:800,color:'#10b981'}}>84.5%</div>
            <div className="muted" style={{fontSize:10,marginTop:4}}>↑ 3.2% insight</div>
          </div>
          <div style={{background:'var(--accent-50)',padding:14,borderRadius:10,borderLeft:'4px solid #f59e0b'}}>
            <div className="muted" style={{fontSize:11,fontWeight:600,marginBottom:6}}>Avg. Package</div>
            <div style={{fontSize:24,fontWeight:800,color:'#f59e0b'}}>₹8.5 LPA</div>
            <div className="muted" style={{fontSize:10,marginTop:4}}>↑ 0.8 LPA YoY</div>
          </div>
          <div style={{background:'var(--accent-50)',padding:14,borderRadius:10,borderLeft:'4px solid #8b5cf6'}}>
            <div className="muted" style={{fontSize:11,fontWeight:600,marginBottom:6}}>Active Companies</div>
            <div style={{fontSize:24,fontWeight:800,color:'#8b5cf6'}}>42</div>
            <div className="muted" style={{fontSize:10,marginTop:4}}>5 new this month</div>
          </div>
        </div>

        {/* Chart Section */}
        <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid var(--border)'}}>
          <h4 style={{fontWeight:700,fontSize:14,marginBottom:16}}>Placement Success Ratio per Department</h4>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:16}}>
            {[
              { dept: 'CSE', value: 92, color: 'var(--primary-600)' },
              { dept: 'ISE', value: 78, color: 'var(--primary)' },
              { dept: 'ECE', value: 65, color: '#7dd3fc' },
              { dept: 'MECH', value: 71, color: '#38bdf8' },
            ].map(item => (
              <div key={item.dept} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{height:140,width:'100%',background:'var(--muted)',borderRadius:8,position:'relative',display:'flex',alignItems:'flex-end',justifyContent:'center',marginBottom:8}}>
                  <div 
                    style={{
                      width:'60%',
                      height:`${item.value}%`,
                      background:item.color,
                      borderTopLeftRadius:6,
                      borderTopRightRadius:6,
                      transition:'all 0.2s',
                      position:'relative'
                    }}
                  >
                    <div style={{position:'absolute',top:-24,left:'50%',transform:'translateX(-50%)',fontWeight:700,fontSize:14}}>{item.value}%</div>
                  </div>
                </div>
                <span style={{fontWeight:600,fontSize:13}}>{item.dept}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company approvals */}
      <div className="card">
        <h3 style={{display:'flex',alignItems:'center',gap:8,marginBottom:12,fontWeight:700}}><Users size={18}/> Company Approvals</h3>
        <div style={{display:'grid',gap:10}}>
          {companies.map((c, i) => (
            <div key={c.name} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:10,border:'1px solid var(--border)',borderRadius:8}}>
              <div>
                <div style={{fontWeight:700}}>{c.name}</div>
                <div className="muted" style={{fontSize:12}}>{c.approved ? 'Approved' : 'Pending approval'}</div>
              </div>
              <div>
                <button
                  onClick={() => toggleApprove(i)}
                  className={c.approved ? 'btn-success' : 'btn-success outline'}
                  aria-pressed={c.approved}
                >
                  {c.approved ? 'Approved' : 'Approve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}