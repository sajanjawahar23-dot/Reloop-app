import { useState, useEffect, useRef } from "react";

const DEMO_CREDENTIALS = { id: "VME2026", password: "demo123" };

const LEADERBOARD = [
  { rank:1, name:"Aringar School of Commerce",    kg:85, points:850, district:"Chennai",    change:0  },
  { rank:2, name:"Vidya Mandir Estancia",          kg:78, points:780, district:"Chennai",    change:1  },
  { rank:3, name:"Shree Niketan",                  kg:72, points:720, district:"Coimbatore", change:-1 },
  { rank:4, name:"DAV School",                     kg:65, points:650, district:"Madurai",    change:2  },
  { rank:5, name:"SBOA School",                    kg:58, points:580, district:"Salem",      change:0  },
  { rank:6, name:"Sri Venkateswara Vidyalaya",     kg:52, points:520, district:"Trichy",     change:-1 },
  { rank:7, name:"PSG Public School",              kg:47, points:470, district:"Coimbatore", change:3  },
  { rank:8, name:"GRT Mahalakshmi Vidyalaya",      kg:41, points:410, district:"Chennai",    change:0  },
];

const PRODUCTS = [
  { id:1, name:"ReLoop Eco Hoodie",        price:1499, desc:"Made using 100% recycled plastic bottles",  impact:"12 bottles saved", category:"Hoodies",  emoji:"🧥", bottles:12, co2:"2.4kg", material:"rPET fleece",  rating:4.8 },
  { id:2, name:"ReLoop Eco T-Shirt",       price:799,  desc:"Comfortable, breathable, and sustainable",  impact:"8 bottles saved",  category:"T-Shirts", emoji:"👕", bottles:8,  co2:"1.6kg", material:"rPET jersey",  rating:4.9 },
  { id:3, name:"ReLoop Tote Bag",          price:399,  desc:"Reusable eco-friendly carry bag",           impact:"5 bottles saved",  category:"Bags",     emoji:"👜", bottles:5,  co2:"1.0kg", material:"rPET canvas",  rating:4.7 },
  { id:4, name:"ReLoop Sustainable Shoes", price:2499, desc:"Designed entirely from recycled materials", impact:"20 bottles saved", category:"Shoes",    emoji:"👟", bottles:20, co2:"4.0kg", material:"rPET mesh",    rating:4.6 },
];

const UNIFORM_PRODUCTS = [
  { id:10, name:"ReLoop School Shirt",       price:599,  desc:"Breathable recycled-cotton blend shirt",  bottles:6,  emoji:"👔", category:"Uniforms" },
  { id:11, name:"ReLoop School Trousers",    price:799,  desc:"Durable rPET blend school trousers",      bottles:10, emoji:"👖", category:"Uniforms" },
  { id:12, name:"ReLoop School Skirt",       price:699,  desc:"Comfortable recycled-fabric skirt",       bottles:8,  emoji:"🩱", category:"Uniforms" },
  { id:13, name:"ReLoop Sports Uniform Set", price:1299, desc:"Full sports kit from recycled materials", bottles:15, emoji:"⚽", category:"Uniforms" },
];

const REWARDS = [
  { id:1, name:"Eco Certificate",        points:100, icon:"📜", desc:"Digital sustainability certificate" },
  { id:2, name:"Badge Pack",             points:200, icon:"🏅", desc:"Exclusive ReLoop digital badge set"  },
  { id:3, name:"ReLoop Tote Bag",        points:400, icon:"👜", desc:"Physical tote bag delivered to school" },
  { id:4, name:"Sports Jersey Discount", points:600, icon:"⚽", desc:"15% off on sports jerseys"           },
  { id:5, name:"Uniform Discount",       points:750, icon:"🎓", desc:"20% off on sustainable uniforms"     },
];

const CERTIFICATES = [
  { title:"Tamil Nadu Rank #2",      subtitle:"Regional Excellence",   icon:"🥈", color:"from-gray-300 to-gray-500"    },
  { title:"1000+ Bottles Recycled",  subtitle:"Recycling Milestone",   icon:"♻️", color:"from-green-400 to-emerald-600" },
  { title:"Sustainability Champion", subtitle:"Academic Year 2025–26", icon:"🏆", color:"from-yellow-400 to-amber-500"  },
  { title:"Top Contributor 2026",    subtitle:"ReLoop Network Award",  icon:"⭐", color:"from-blue-400 to-indigo-600"   },
];

const ROADMAP = [
  { phase:"Phase 1", title:"QR Pilot",               desc:"Pilot access via QR codes across 5 schools in Chennai", status:"done",    icon:"✅", color:"from-green-500 to-emerald-600", date:"Jan 2026" },
  { phase:"Phase 2", title:"School Expansion",        desc:"Onboard 50 schools across Tamil Nadu districts",        status:"active",  icon:"🚀", color:"from-blue-500 to-indigo-600",   date:"Jun 2026" },
  { phase:"Phase 3", title:"Tamil Nadu Expansion",    desc:"Full state rollout — 500+ schools, ReStore launch",     status:"planned", icon:"🌏", color:"from-purple-500 to-pink-600",   date:"Dec 2026" },
  { phase:"Phase 4", title:"India-wide Launch",       desc:"National network across 10 states, 2,000+ schools",     status:"planned", icon:"🇮🇳", color:"from-orange-500 to-red-500",    date:"2027"     },
  { phase:"Phase 5", title:"Play Store & App Store",  desc:"Public launch on Android & iOS with full feature set",  status:"planned", icon:"📱", color:"from-teal-500 to-cyan-600",    date:"2027 Q3"  },
];

const TRACE_STEPS = [
  { icon:"🏫", label:"Collected at School",    detail:"Vidya Mandir Estancia, Chennai",      date:"15 May 2026", status:"done"   },
  { icon:"⚖️",  label:"Sorted & Weighed",       detail:"12 PET bottles · 0.24 kg verified",  date:"16 May 2026", status:"done"   },
  { icon:"🚛", label:"Transported to Hub",      detail:"ReLoop Collection Hub, Ambattur",     date:"18 May 2026", status:"done"   },
  { icon:"🏭", label:"Processed at Factory",    detail:"ReLoop Recycling Hub, Coimbatore",   date:"20 May 2026", status:"done"   },
  { icon:"🧵", label:"Spun into rPET Fiber",    detail:"Recycled PET yarn — 150 denier",      date:"25 May 2026", status:"done"   },
  { icon:"✂️",  label:"Fabric Cut & Stitched",   detail:"ReLoop Apparel Unit, Tirupur",        date:"28 May 2026", status:"done"   },
  { icon:"🔍", label:"Quality Checked",         detail:"ISO 9001 quality verification",       date:"1 Jun 2026",  status:"done"   },
  { icon:"👕", label:"Final Product Ready",     detail:"ReLoop Eco T-Shirt — batch #RL2601", date:"3 Jun 2026",  status:"done"   },
  { icon:"🚚", label:"Ready for Delivery",      detail:"Ships in 3–5 business days",          date:"5 Jun 2026",  status:"active" },
];

// ── ICON SYSTEM ──────────────────────────────────────────────────────────────
const IP = {
  home:"M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  trophy:"M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9L12 2Z",
  store:"M20 4H4v2l16 .01V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z",
  cert:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",
  user:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
  back:"M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  search:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  up:"M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z",
  down:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z",
  check:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  cart:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45A1 1 0 005 16h12v-2H7.42l.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.45 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
  download:"M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z",
  camera:"M12 15.2a3.2 3.2 0 100-6.4 3.2 3.2 0 000 6.4zM9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9z",
  logout:"M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
};
const Ic = ({ n, s=20, c="" }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={c}><path d={IP[n]||""}/></svg>;

// ── SHARED ────────────────────────────────────────────────────────────────────
const Toast = ({ message, type, onClose }) => {
  useEffect(()=>{const t=setTimeout(onClose,3000);return()=>clearTimeout(t);},[]);
  return <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl text-white text-sm font-bold flex items-center gap-2 max-w-xs ${type==="success"?"bg-green-500":"bg-red-500"}`}>{type==="success"?"✅":"⚠️"} {message}</div>;
};

const Bar = ({ data, labels }) => {
  const mx = Math.max(...data);
  return (
    <div className="flex items-end gap-2 h-28 w-full">
      {data.map((v,i)=>(
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] text-gray-500 font-bold">{v}</span>
          <div className="w-full rounded-t-lg bg-gradient-to-t from-green-500 to-emerald-400" style={{height:`${(v/mx)*80}px`}}/>
          <span className="text-[9px] text-gray-400">{labels[i]}</span>
        </div>
      ))}
    </div>
  );
};

const PH = ({ onBack, title, sub, color="from-green-600 to-emerald-500" }) => (
  <div className={`bg-gradient-to-br ${color} px-5 pt-10 pb-8 flex items-center gap-3`}>
    {onBack && <button onClick={onBack} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Ic n="back" s={20}/></button>}
    <div><h1 className="text-white font-black text-xl">{title}</h1>{sub&&<p className="text-white/70 text-xs">{sub}</p>}</div>
  </div>
);

const Fld = ({ label, value, onChange, type="text", placeholder="" }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
    <input type={type} className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 text-gray-800 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all" value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/>
  </div>
);

const LBtn = ({ onClick, disabled, loading, label, load, cls="" }) => (
  <button onClick={onClick} disabled={disabled||loading} className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50 ${cls}`}>
    {loading&&<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"/>}
    {loading?load:label}
  </button>
);
// ── BOTTOM NAV ────────────────────────────────────────────────────────────────
const Nav = ({ page, go }) => {
  const tabs=[{id:"dashboard",n:"home",l:"Home"},{id:"releague",n:"trophy",l:"ReLeague"},{id:"restore",n:"store",l:"ReStore"},{id:"certificates",n:"cert",l:"Awards"},{id:"profile",n:"user",l:"Profile"}];
  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-100 flex shadow-lg z-40">
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>go(t.id)} className={`flex-1 flex flex-col items-center py-2 gap-0.5 transition-colors ${page===t.id?"text-green-500":"text-gray-400"}`}>
          <Ic n={t.n} s={22}/><span className="text-[10px] font-semibold">{t.l}</span>
          {page===t.id&&<div className="w-1 h-1 rounded-full bg-green-500"/>}
        </button>
      ))}
    </nav>
  );
};
// ── SPLASH ────────────────────────────────────────────────────────────────────
const Splash = ({ onStart }) => {
  const [c1,sc1]=useState(0);const[c2,sc2]=useState(0);const[c3,sc3]=useState(0);
  useEffect(()=>{
    const a=(set,tgt,dur)=>{let s=null;const step=ts=>{if(!s)s=ts;const p=Math.min((ts-s)/dur,1);set(+(p*tgt).toFixed(1));if(p<1)requestAnimationFrame(step);};requestAnimationFrame(step);};
    setTimeout(()=>{a(sc1,240,1200);a(sc2,18,1200);a(sc3,3.2,1400);},300);
  },[]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 flex flex-col items-center justify-center px-6 text-white">
      <div className="text-center mb-12">
        <div className="w-28 h-28 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"><span className="text-5xl">♻️</span></div>
        <h1 className="text-6xl font-black tracking-tight mb-2">ReLoop</h1>
        <p className="text-green-100 text-xl font-medium">Turning Waste Into Worth</p>
        <div className="w-12 h-1 bg-white/40 rounded-full mx-auto mt-4"/>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-12">
        {[{val:`${Math.floor(c1)}+`,label:"Schools"},{val:`${Math.floor(c2)}T`,label:"Plastic Saved"},{val:`${c3.toFixed(1)}M`,label:"RePoints"}].map((s,i)=>(
          <div key={i} className="bg-white/20 backdrop-blur rounded-2xl p-4 text-center"><div className="text-2xl font-black">{s.val}</div><div className="text-[11px] text-green-100 mt-1">{s.label}</div></div>
        ))}
      </div>
      <button onClick={onStart} className="w-full max-w-xs bg-white text-green-600 font-bold text-lg py-4 rounded-2xl shadow-xl active:scale-95 transition-transform">Get Started →</button>
      <p className="text-green-200 text-xs mt-6">India's First Inter-School Recycling Network</p>
    </div>
  );
};
// ── LOGIN ─────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [id,setId]=useState("");const[pw,setPw]=useState("");const[err,setErr]=useState("");const[loading,setLoading]=useState(false);
  const handle=()=>{setLoading(true);setErr("");setTimeout(()=>{if(id===DEMO_CREDENTIALS.id&&pw===DEMO_CREDENTIALS.password)onLogin();else{setErr("Invalid credentials. Try VME2026 / demo123");setLoading(false);}},900);};
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-gradient-to-br from-green-600 to-emerald-500 h-52 flex items-end pb-8 px-6">
        <div><div className="flex items-center gap-2 mb-1"><span className="text-3xl">♻️</span><span className="text-white font-black text-3xl">ReLoop</span></div><p className="text-green-100 text-sm">Sign in to your school account</p></div>
      </div>
      <div className="flex-1 px-5 pt-6 pb-8">
        <div className="bg-white rounded-3xl p-6 shadow-xl -mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-5">Welcome Back</h2>
          {err&&<div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 text-sm mb-4">⚠️ {err}</div>}
          <div className="space-y-4">
            <Fld label="Institution ID" value={id} onChange={v=>{setId(v);setErr("");}} placeholder="e.g. VME2026"/>
            <Fld label="Password" type="password" value={pw} onChange={v=>{setPw(v);setErr("");}} placeholder="••••••••"/>
            <LBtn onClick={handle} loading={loading} label="Sign In" load="Signing in..." cls="bg-gradient-to-r from-green-500 to-emerald-500 text-white"/>
          </div>
          <div className="mt-5 bg-green-50 rounded-xl p-4"><p className="text-xs font-semibold text-green-700 mb-1">🎯 Demo Credentials</p><p className="text-xs text-green-600">ID: <strong>VME2026</strong> · Password: <strong>demo123</strong></p></div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-8">Access via QR code · Pilot Mode · Coming soon on Play Store & App Store</p>
      </div>
    </div>
  );
};

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
const Dashboard = ({ st, go }) => (
  <div className="pb-20">
    <div className="bg-gradient-to-br from-green-600 to-emerald-500 px-5 pt-10 pb-16 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10"/>
      <div className="relative">
        <div className="flex items-center justify-between mb-1"><span className="text-green-100 text-sm font-medium">Welcome back 👋</span><span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">TN #{st.rank}</span></div>
        <h1 className="text-white font-black text-2xl">{st.school}</h1><p className="text-green-100 text-sm">{st.state}</p>
      </div>
    </div>
    <div className="px-5 -mt-8 space-y-4">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="grid grid-cols-2 gap-3">
          {[{icon:"🧴",val:`${st.plastic}kg`,label:"Plastic Collected",bg:"bg-green-50"},{icon:"⭐",val:st.repoints,label:"RePoints",bg:"bg-amber-50"},{icon:"♻️",val:st.bottles.toLocaleString(),label:"Bottles Recycled",bg:"bg-blue-50"},{icon:"🌿",val:`${st.co2}kg`,label:"CO₂ Saved",bg:"bg-emerald-50"}].map((s,i)=>(
            <div key={i} className={`${s.bg} rounded-xl p-3`}><div className="text-xl mb-1">{s.icon}</div><div className="font-black text-gray-800 text-lg">{s.val}</div><div className="text-[11px] text-gray-500">{s.label}</div></div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
        <div className="flex items-center justify-between mb-4"><h3 className="font-bold text-gray-800">Collection Trend</h3><span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">Jan–Jun 2026</span></div>
        <Bar data={st.monthly} labels={["Jan","Feb","Mar","Apr","May","Jun"]}/>
        <div className="mt-2 text-xs text-gray-400 text-center">Monthly plastic collected (kg)</div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[{page:"releague",emoji:"🏆",title:"View ReLeague",sub:"Rankings",color:"from-amber-400 to-orange-500"},{page:"collection",emoji:"➕",title:"Add Collection",sub:"Log plastic",color:"from-green-500 to-emerald-600"},{page:"restore",emoji:"🛍️",title:"Open ReStore",sub:"Eco products",color:"from-blue-500 to-indigo-600"},{page:"certificates",emoji:"🎓",title:"Certificates",sub:`${st.certs} earned`,color:"from-purple-500 to-pink-600"}].map((b,i)=>(
          <button key={i} onClick={()=>go(b.page)} className={`bg-gradient-to-br ${b.color} text-white rounded-2xl p-4 text-left active:scale-95 transition-transform`}><div className="text-2xl mb-2">{b.emoji}</div><div className="font-bold text-sm">{b.title}</div><div className="text-xs opacity-80">{b.sub}</div></button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={()=>go("calculator")} className="bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl p-4 text-left active:scale-95 transition-transform"><div className="text-2xl mb-2">🧮</div><div className="font-bold text-sm">Impact Calc</div><div className="text-xs opacity-80">Estimate savings</div></button>
        <button onClick={()=>go("vision")} className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl p-4 text-left active:scale-95 transition-transform"><div className="text-2xl mb-2">🗺️</div><div className="font-bold text-sm">Future Vision</div><div className="text-xs opacity-80">Our roadmap</div></button>
      </div>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-4 flex items-center justify-between">
        <div><div className="text-gray-400 text-xs mb-1">Your RePoints Balance</div><div className="text-white font-black text-2xl">{st.repoints} <span className="text-green-400 text-sm font-semibold">pts</span></div></div>
        <button onClick={()=>go("rewards")} className="bg-green-500 text-white text-sm font-bold px-4 py-2.5 rounded-xl active:scale-95 transition-transform">Redeem →</button>
      </div>
    </div>
  </div>
);

// ── RELEAGUE ──────────────────────────────────────────────────────────────────
const ReLeague = ({ school }) => {
  const [search,setSearch]=useState("");const[dist,setDist]=useState("All");
  const districts=["All","Chennai","Coimbatore","Madurai","Salem","Trichy"];
  const filtered=LEADERBOARD.filter(s=>s.name.toLowerCase().includes(search.toLowerCase())&&(dist==="All"||s.district===dist));
  const medal=r=>r===1?"🥇":r===2?"🥈":r===3?"🥉":null;
  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-amber-500 to-orange-500 px-5 pt-10 pb-8"><h1 className="text-white font-black text-2xl mb-1">ReLeague</h1><p className="text-amber-100 text-sm">Tamil Nadu School Rankings</p></div>
      <div className="px-5 pt-4 space-y-3">
        <div className="relative"><div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Ic n="search" s={18}/></div><input className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400" placeholder="Search school..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
        <div className="flex gap-2 overflow-x-auto pb-1">{districts.map(d=><button key={d} onClick={()=>setDist(d)} className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${dist===d?"bg-amber-500 text-white":"bg-gray-100 text-gray-600"}`}>{d}</button>)}</div>
      </div>
      <div className="px-5 pt-3 space-y-3 pb-4">
        {filtered.map(s=>(
          <div key={s.rank} className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${s.name===school?"border-green-400 bg-green-50":"border-transparent"}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 text-lg font-black text-gray-700 flex-shrink-0">{medal(s.rank)||`#${s.rank}`}</div>
              <div className="flex-1 min-w-0"><div className="flex items-center gap-1"><span className="font-bold text-gray-800 text-sm truncate">{s.name}</span>{s.name===school&&<span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">You</span>}</div><span className="text-xs text-gray-400">{s.district}</span></div>
              <div className="text-right flex-shrink-0"><div className="font-black text-green-600 text-sm">{s.points} pts</div><div className="text-xs text-gray-400">{s.kg} kg</div></div>
              <div className="ml-1 flex-shrink-0 w-8 text-center">{s.change>0?<span className="text-green-500 text-xs flex items-center justify-center"><Ic n="up" s={14}/>{s.change}</span>:s.change<0?<span className="text-red-400 text-xs flex items-center justify-center"><Ic n="down" s={14}/>{Math.abs(s.change)}</span>:<span className="text-gray-300 text-xs">—</span>}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── COLLECTION ────────────────────────────────────────────────
const Collection = ({ onBack, onSubmit }) => {
  const [wt,setWt]=useState("");const[col,setCol]=useState("");const[done,setDone]=useState(false);const[loading,setLoading]=useState(false);const[photo,setPhoto]=useState(null);const ref=useRef();
  const pts=wt?Math.round(parseFloat(wt)*10):0;
  const submit=()=>{if(!wt||!col)return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);onSubmit(parseFloat(wt));},1200);};
  if(done)return(
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center pb-20">
      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 text-5xl">✅</div>
      <h2 className="text-2xl font-black text-gray-800 mb-2">Collection Added!</h2>
      <p className="text-gray-500 mb-6">You earned <span className="text-green-600 font-black text-xl">{pts} RePoints</span></p>
      <div className="bg-white rounded-2xl p-5 w-full max-w-xs shadow-xl mb-8 space-y-3 text-left">
        <div className="flex justify-between text-sm"><span className="text-gray-500">Weight</span><span className="font-bold text-gray-800">{wt} kg</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Collector</span><span className="font-bold text-gray-800">{col}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">RePoints Earned</span><span className="font-bold text-green-600">+{pts}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-500">Bottles (est.)</span><span className="font-bold text-blue-600">{Math.round(parseFloat(wt)*20)}</span></div>
      </div>
      <button onClick={onBack} className="w-full max-w-xs bg-green-500 text-white font-bold py-4 rounded-2xl">Back to Dashboard</button>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PH onBack={onBack} title="Add Collection" sub="1 kg = 10 RePoints"/>
      <div className="px-5 pt-6 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Weight Collected (kg)</label><input type="number" min="0" className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 text-gray-800 font-medium focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-xl" value={wt} onChange={e=>setWt(e.target.value)} placeholder="0.0"/></div>
          {wt&&parseFloat(wt)>0&&<div className="bg-green-50 rounded-xl p-3 flex items-center justify-between"><span className="text-green-700 text-sm font-semibold">RePoints to earn</span><span className="text-green-600 font-black text-xl">+{pts}</span></div>}
          <Fld label="Collector Name" value={col} onChange={setCol} placeholder="Enter your name"/>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Upload Photo</label>
            <input type="file" accept="image/*" ref={ref} onChange={e=>{if(e.target.files[0])setPhoto(URL.createObjectURL(e.target.files[0]));}} className="hidden"/>
            <button onClick={()=>ref.current.click()} className={`w-full mt-1 border-2 border-dashed rounded-xl py-8 flex flex-col items-center gap-2 transition-colors ${photo?"border-green-400 bg-green-50":"border-gray-200 bg-gray-50"}`}>
              {photo?<img src={photo} alt="" className="w-24 h-24 object-cover rounded-lg"/>:<><Ic n="camera" s={28} c="text-gray-400"/><span className="text-sm text-gray-400">Tap to upload photo</span></>}
            </button>
          </div>
        </div>
        <LBtn onClick={submit} disabled={!wt||!col} loading={loading} label="Submit Collection" load="Submitting..." cls="bg-gradient-to-r from-green-500 to-emerald-500 text-white"/>
      </div>
    </div>
  );
};
// ── RESTORE ───────────────────────────────────────────────────────────────────
const ReStore = ({ cart, setCart, go, setProduct }) => {
  const [cat,setCat]=useState("All");
  const cats=["All","T-Shirts","Hoodies","Bags","Shoes","Uniforms"];
  const all=[...PRODUCTS,...UNIFORM_PRODUCTS];
  const filtered=cat==="All"?all:all.filter(p=>p.category===cat);
  const total=cart.reduce((a,c)=>a+c.qty,0);
  const add=p=>{setCart(prev=>{const ex=prev.find(c=>c.id===p.id);if(ex)return prev.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c);return[...prev,{...p,qty:1}];});};
  return (
    <div className="pb-20">
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 px-5 pt-10 pb-8">
        <div className="flex items-center justify-between"><div><h1 className="text-white font-black text-2xl mb-1">ReStore</h1><p className="text-blue-100 text-sm">Sustainable Products</p></div>
          <button onClick={()=>go("cart")} className="relative w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center text-white"><Ic n="cart" s={22}/>{total>0&&<span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-black flex items-center justify-center">{total}</span>}</button>
        </div>
      </div>
      <div className="mx-5 mt-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
        <div className="flex items-start gap-3"><span className="text-4xl">🎒</span><div><div className="text-xs font-semibold text-green-100 uppercase tracking-wide mb-1">⭐ Featured</div><h3 className="font-black text-lg">Sustainable School Uniforms</h3><p className="text-green-100 text-xs mt-1 mb-3">Made from recycled bottles · Custom branding</p><button onClick={()=>go("uniform")} className="bg-white text-green-600 font-bold text-sm px-4 py-2 rounded-xl active:scale-95 transition-transform">Explore Uniforms →</button></div></div>
      </div>
      <div className="px-5 pt-4 flex gap-2 overflow-x-auto pb-2">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-colors ${cat===c?"bg-blue-600 text-white":"bg-gray-100 text-gray-600"}`}>{c}</button>)}</div>
      <div className="px-5 pt-3 space-y-3 pb-4">
        {filtered.map(p=>{const ic=cart.find(c=>c.id===p.id);return(
          <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-36 flex items-center justify-center text-7xl cursor-pointer" onClick={()=>{setProduct(p);go("product");}}>{p.emoji}</div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-2"><div className="flex-1"><h3 className="font-bold text-gray-800">{p.name}</h3><p className="text-xs text-gray-500 mt-0.5">{p.desc}</p><div className="flex gap-1 mt-2 flex-wrap"><span className="text-[11px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">♻️ {p.bottles} bottles</span>{p.rating&&<span className="text-[11px] bg-amber-50 text-amber-700 font-semibold px-2 py-0.5 rounded-full">⭐ {p.rating}</span>}</div></div><div className="font-black text-gray-800 text-lg flex-shrink-0">₹{p.price}</div></div>
              <div className="flex gap-2 mt-3"><button onClick={()=>{setProduct(p);go("product");}} className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-gray-100 text-gray-700">Details</button><button onClick={()=>add(p)} className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${ic?"bg-green-500 text-white":"bg-gray-900 text-white"}`}>{ic?`✓ (${ic.qty})`:"Add to Cart"}</button></div>
            </div>
          </div>
        );})}
        <button onClick={()=>go("retrace")} className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform"><span className="text-3xl">🔍</span><div className="text-left"><div className="font-bold">ReTrace Product Journey</div><div className="text-xs text-green-100">See how products are made</div></div><Ic n="back" s={18} c="rotate-180 ml-auto"/></button>
        <button onClick={()=>go("rewards")} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl p-4 flex items-center gap-3 active:scale-95 transition-transform"><span className="text-3xl">⭐</span><div className="text-left"><div className="font-bold">Redeem RePoints</div><div className="text-xs text-amber-100">Exchange points for rewards</div></div><Ic n="back" s={18} c="rotate-180 ml-auto"/></button>
      </div>
    </div>
  );
};
// ── PRODUCT DETAIL ────────────────────────────────────────────────────────────
const ProductDetail = ({ product, onBack, cart, setCart, showToast }) => {
  const ic=cart.find(c=>c.id===product.id);const[qty,setQty]=useState(1);
  const add=()=>{setCart(prev=>{const ex=prev.find(c=>c.id===product.id);if(ex)return prev.map(c=>c.id===product.id?{...c,qty:c.qty+qty}:c);return[...prev,{...product,qty}];});showToast(`${product.name} added to cart!`,"success");};
  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-64 flex items-center justify-center text-9xl relative">
        <button onClick={onBack} className="absolute top-10 left-4 w-9 h-9 bg-white/80 backdrop-blur rounded-xl flex items-center justify-center shadow-sm"><Ic n="back" s={20} c="text-gray-700"/></button>
        {product.emoji}{product.rating&&<div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-xl flex items-center gap-1"><span className="text-amber-500 text-xs">⭐</span><span className="text-xs font-black text-gray-800">{product.rating}</span></div>}
      </div>
      <div className="px-5 pt-5 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-start justify-between gap-2 mb-2"><h1 className="font-black text-xl text-gray-800 flex-1">{product.name}</h1><span className="font-black text-2xl text-gray-800 flex-shrink-0">₹{product.price}</span></div>
          <p className="text-gray-500 text-sm mb-3">{product.desc}</p>
          <div className="flex gap-2 flex-wrap"><span className="text-xs bg-green-50 text-green-700 font-semibold px-3 py-1.5 rounded-full">♻️ {product.bottles} bottles</span><span className="text-xs bg-blue-50 text-blue-700 font-semibold px-3 py-1.5 rounded-full">🌿 Eco-certified</span><span className="text-xs bg-purple-50 text-purple-700 font-semibold px-3 py-1.5 rounded-full">🏭 ReLoop Made</span></div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-bold text-gray-800 mb-3">Sustainability Impact</h3><div className="space-y-2">{["Made from 100% recycled PET bottles","Reduces plastic landfill waste","Carbon-neutral manufacturing","Supports ReLoop school network","Certified sustainable production"].map((f,i)=><div key={i} className="flex items-center gap-2 text-sm text-gray-600"><div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0"><Ic n="check" s={12} c="text-green-600"/></div>{f}</div>)}</div></div>
        <div className="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-600">Qty</span>
          <div className="flex items-center gap-3 bg-gray-100 rounded-xl px-3 py-1"><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-7 h-7 flex items-center justify-center text-gray-600 font-black text-lg">−</button><span className="font-black text-gray-800 w-5 text-center">{qty}</span><button onClick={()=>setQty(q=>q+1)} className="w-7 h-7 flex items-center justify-center text-gray-600 font-black text-lg">+</button></div>
          <div className="flex-1 text-right font-black text-gray-800 text-lg">₹{(product.price*qty).toLocaleString()}</div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white border-t border-gray-100 shadow-xl">
        <button onClick={add} className={`w-full py-4 rounded-2xl font-bold text-lg active:scale-95 transition-all ${ic?"bg-green-500 text-white":"bg-gray-900 text-white"}`}>{ic?`✓ In Cart (${ic.qty}) — Add More`:`Add to Cart · ₹${(product.price*qty).toLocaleString()}`}</button>
      </div>
    </div>
  );
};
// ── CART ──────────────────────────────────────────────────────────────────────
const Cart = ({ cart, setCart, onBack, showToast }) => {
  const total=cart.reduce((a,c)=>a+c.price*c.qty,0);
  const bottles=cart.reduce((a,c)=>a+(c.bottles||0)*c.qty,0);
  const savings=Math.round(total*0.08);
  const remove=id=>setCart(prev=>prev.filter(c=>c.id!==id));
  const chg=(id,d)=>setCart(prev=>prev.map(c=>c.id===id?{...c,qty:Math.max(1,c.qty+d)}:c));
  const checkout=()=>{setCart([]);showToast("Order placed! 🎉 Eco-order confirmed.","success");onBack();};
  if(cart.length===0)return <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center pb-20"><div className="text-7xl mb-4">🛒</div><h2 className="text-xl font-bold text-gray-800 mb-2">Your cart is empty</h2><p className="text-gray-400 text-sm mb-6">Add some eco-friendly products!</p><button onClick={onBack} className="bg-blue-600 text-white font-bold px-8 py-3 rounded-2xl">Browse ReStore</button></div>;
  return (
    <div className="min-h-screen bg-gray-50 pb-48">
      <PH onBack={onBack} title="Your Cart" sub={`${cart.reduce((a,c)=>a+c.qty,0)} items`} color="from-blue-600 to-indigo-600"/>
      <div className="px-5 pt-5 space-y-3">
        {cart.map(item=>(
          <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-3"><span className="text-4xl">{item.emoji}</span><div className="flex-1 min-w-0"><div className="font-bold text-gray-800 text-sm truncate">{item.name}</div><div className="text-green-600 font-black text-sm">₹{item.price}</div><div className="text-[11px] text-gray-400 mt-0.5">♻️ {item.bottles} bottles each</div></div><button onClick={()=>remove(item.id)} className="w-8 h-8 rounded-xl bg-red-50 text-red-400 flex items-center justify-center text-lg font-bold flex-shrink-0">×</button></div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50"><div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1"><button onClick={()=>chg(item.id,-1)} className="w-7 h-7 flex items-center justify-center text-gray-600 font-black">−</button><span className="font-black text-gray-800 w-5 text-center text-sm">{item.qty}</span><button onClick={()=>chg(item.id,+1)} className="w-7 h-7 flex items-center justify-center text-gray-600 font-black">+</button></div><span className="font-black text-gray-800">₹{(item.price*item.qty).toLocaleString()}</span></div>
          </div>
        ))}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-4"><h4 className="font-bold text-green-800 text-sm mb-2">🌿 Your Order's Impact</h4><div className="flex gap-3"><div className="flex-1 bg-white rounded-xl p-2 text-center"><div className="font-black text-green-600">{bottles}</div><div className="text-[10px] text-gray-500">Bottles</div></div><div className="flex-1 bg-white rounded-xl p-2 text-center"><div className="font-black text-blue-600">{(bottles*0.02).toFixed(2)}kg</div><div className="text-[10px] text-gray-500">Plastic</div></div><div className="flex-1 bg-white rounded-xl p-2 text-center"><div className="font-black text-emerald-600">{(bottles*0.2).toFixed(1)}kg</div><div className="text-[10px] text-gray-500">CO₂</div></div></div></div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white p-5 border-t border-gray-100 shadow-xl space-y-2">
        <div className="flex justify-between text-sm text-gray-500"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm text-green-600 font-semibold"><span>🌿 Eco Discount</span><span>−₹{savings}</span></div>
        <div className="flex justify-between text-lg font-black text-gray-800 pt-1 border-t border-gray-100"><span>Total</span><span>₹{(total-savings).toLocaleString()}</span></div>
        <button onClick={checkout} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform">Place Order →</button>
      </div>
    </div>
  );
};
// ── UNIFORM PAGE ──────────────────────────────────────────────────────────────
const UniformPage = ({ onBack, showToast, setCart, go, setProduct }) => {
  const [tab,setTab]=useState("overview");
  const [form,setForm]=useState({school:"",contact:"",phone:"",email:"",students:"",date:""});
  const [done,setDone]=useState(false);const[loading,setLoading]=useState(false);
  const sf=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=()=>{if(!form.school||!form.contact||!form.phone||!form.email)return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1100);};
  const addU=p=>{setCart(prev=>{const ex=prev.find(c=>c.id===p.id);if(ex)return prev.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c);return[...prev,{...p,qty:1}];});showToast(`${p.name} added!`,"success");};
  if(done)return(
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 text-center pb-20">
      <div className="text-7xl mb-5">🎉</div><h2 className="text-2xl font-black text-gray-800 mb-2">Consultation Booked!</h2>
      <p className="text-gray-500 mb-6">A ReLoop Sustainability Consultant will reach out within 24 hours.</p>
      <div className="bg-white rounded-2xl p-6 w-full max-w-xs shadow-xl mb-8 text-left space-y-3">
        <div><div className="text-xs text-gray-400 mb-0.5">Reference ID</div><div className="font-black text-green-600 text-xl">RL-2026-{Math.floor(Math.random()*900)+100}</div></div>
        <div className="h-px bg-gray-100"/>
        {[["School",form.school],["Contact",form.contact],["Email",form.email]].map(([k,v],i)=><div key={i} className="flex justify-between text-sm"><span className="text-gray-400">{k}</span><span className="font-semibold text-gray-800">{v}</span></div>)}
      </div>
      <button onClick={onBack} className="w-full max-w-xs bg-green-500 text-white font-bold py-4 rounded-2xl">Back to ReStore</button>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-green-600 to-emerald-600 px-5 pt-10 pb-6">
        <div className="flex items-center gap-3 mb-5"><button onClick={onBack} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Ic n="back" s={20}/></button><div><h1 className="text-white font-black text-xl">School Uniforms</h1><p className="text-green-100 text-xs">Sustainable · Branded · Recycled</p></div></div>
        <div className="flex bg-white/20 rounded-xl p-1 gap-1">{[["overview","Overview"],["products","Products"],["consult","Consult"]].map(([id,lbl])=><button key={id} onClick={()=>setTab(id)} className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${tab===id?"bg-white text-green-700 shadow":"text-white/80"}`}>{lbl}</button>)}</div>
      </div>
      {tab==="overview"&&<div className="px-5 pt-5 space-y-4 pb-6">
        <div className="grid grid-cols-3 gap-3">{[{val:"500+",label:"Schools",icon:"🏫"},{val:"45K+",label:"Uniforms",icon:"👔"},{val:"540K",label:"Bottles",icon:"♻️"}].map((s,i)=><div key={i} className="bg-white rounded-2xl p-3 text-center shadow-sm"><div className="text-xl mb-1">{s.icon}</div><div className="font-black text-green-600 text-lg">{s.val}</div><div className="text-[10px] text-gray-500">{s.label}</div></div>)}</div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-black text-gray-800 mb-4">🌱 Why ReLoop Uniforms?</h3>{[{icon:"♻️",title:"100% Recycled Materials",desc:"Every uniform uses rPET fabric from post-consumer plastic bottles"},{icon:"🏫",title:"Custom School Branding",desc:"Logos, colours, and styles tailored to each school's identity"},{icon:"💪",title:"Durable & Comfortable",desc:"ISO-certified fabric — lasts 2x longer than conventional uniforms"},{icon:"🌍",title:"Carbon Neutral Process",desc:"Manufacturing offset by ReLoop's school planting programme"}].map((b,i)=><div key={i} className="flex gap-3 mb-3 last:mb-0"><div className="w-9 h-9 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">{b.icon}</div><div><div className="font-bold text-gray-800 text-sm">{b.title}</div><div className="text-xs text-gray-500 mt-0.5">{b.desc}</div></div></div>)}</div>
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5"><h3 className="font-bold text-blue-800 mb-3">🍶 Bottles Per Uniform Item</h3><div className="space-y-2">{[["School Shirt","6 bottles"],["School Trousers","10 bottles"],["School Skirt","8 bottles"],["Sports Set","15 bottles"],["Full Set","24 bottles"]].map(([item,val],i)=><div key={i} className="flex justify-between items-center"><span className="text-sm text-blue-700">{item}</span><span className="text-sm font-black text-blue-600 bg-blue-100 px-3 py-0.5 rounded-full">{val}</span></div>)}</div></div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-5 text-white"><h3 className="font-bold mb-3">🌍 Environmental Impact</h3><div className="grid grid-cols-2 gap-3">{[["CO₂ Saved","4.2 kg/set"],["Water Saved","85L/garment"],["Plastic Diverted","24 bottles/set"],["Landfill Avoided","0.48 kg"]].map(([k,v],i)=><div key={i} className="bg-white/20 rounded-xl p-3"><div className="font-black text-lg">{v}</div><div className="text-green-100 text-xs mt-0.5">{k}</div></div>)}</div></div>
        <button onClick={()=>setTab("consult")} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-2xl active:scale-95 transition-transform">Book a Professional →</button>
      </div>}
      {tab==="products"&&<div className="px-5 pt-5 space-y-3 pb-6">
        {UNIFORM_PRODUCTS.map(p=><div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"><div className="bg-gradient-to-br from-green-50 to-emerald-100 h-28 flex items-center justify-center text-6xl cursor-pointer" onClick={()=>{setProduct(p);go("product");}}>{p.emoji}</div><div className="p-4"><div className="flex items-start justify-between gap-2 mb-2"><div><h3 className="font-bold text-gray-800">{p.name}</h3><p className="text-xs text-gray-500 mt-0.5">{p.desc}</p></div><span className="font-black text-gray-800 text-lg flex-shrink-0">₹{p.price}</span></div><span className="inline-block text-[11px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full mb-3">♻️ {p.bottles} bottles</span><button onClick={()=>addU(p)} className="w-full py-2 rounded-xl font-bold text-sm bg-green-600 text-white active:scale-95 transition-all">Add to Cart</button></div></div>)}
        <button onClick={()=>setTab("consult")} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-4 rounded-2xl">Book Bulk Consultation →</button>
      </div>}
      {tab==="consult"&&<div className="px-5 pt-5 space-y-4 pb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4"><div className="text-sm font-bold text-amber-800 mb-1">📞 Free Consultation</div><div className="text-xs text-amber-700">Our expert will visit your school and provide a custom proposal within 48 hours.</div></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800">Consultation Request</h3>
          <Fld label="School Name" value={form.school} onChange={v=>sf("school",v)} placeholder="Enter school name"/>
          <Fld label="Contact Person" value={form.contact} onChange={v=>sf("contact",v)} placeholder="Principal / Admin name"/>
          <Fld label="Phone Number" type="tel" value={form.phone} onChange={v=>sf("phone",v)} placeholder="+91 XXXXXXXXXX"/>
          <Fld label="Email Address" type="email" value={form.email} onChange={v=>sf("email",v)} placeholder="school@example.com"/>
          <Fld label="Student Strength" type="number" value={form.students} onChange={v=>sf("students",v)} placeholder="e.g. 800"/>
          <Fld label="Preferred Meeting Date" type="date" value={form.date} onChange={v=>sf("date",v)}/>
          <LBtn onClick={submit} disabled={!form.school||!form.contact||!form.phone||!form.email} loading={loading} label="Submit Request" load="Submitting..." cls="bg-gradient-to-r from-green-500 to-emerald-500 text-white"/>
        </div>
      </div>}
    </div>
  );
};
// ── REWARDS ───────────────────────────────────────────────────────────────────
const Rewards = ({ points, onRedeem, history, onBack }) => {
  const [confirm,setConfirm]=useState(null);
  const redeem=r=>{if(points<r.points)return;onRedeem(r);setConfirm(null);};
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {confirm&&<div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center px-5 pb-8"><div className="bg-white rounded-3xl p-6 w-full max-w-sm text-center"><div className="text-5xl mb-3">{confirm.icon}</div><h3 className="font-black text-xl text-gray-800 mb-1">{confirm.name}</h3><p className="text-gray-500 text-sm mb-4">{confirm.points} RePoints will be deducted</p><div className="flex gap-3"><button onClick={()=>setConfirm(null)} className="flex-1 border border-gray-200 text-gray-600 font-bold py-3 rounded-xl">Cancel</button><button onClick={()=>redeem(confirm)} className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl">Redeem</button></div></div></div>}
      <PH onBack={onBack} title="Redeem RePoints" sub={`Balance: ${points} pts`} color="from-amber-500 to-orange-500"/>
      <div className="px-5 pt-5 space-y-3">
        {REWARDS.map(r=>{const ok=points>=r.points;return(
          <div key={r.id} className={`bg-white rounded-2xl p-4 shadow-sm border-2 ${ok?"border-transparent":"border-gray-100 opacity-60"}`}>
            <div className="flex items-center gap-3"><div className="text-4xl w-12 text-center">{r.icon}</div><div className="flex-1"><div className="font-bold text-gray-800">{r.name}</div><div className="text-xs text-gray-500">{r.desc}</div><div className="font-black text-amber-600 text-sm mt-1">{r.points} pts</div></div><button onClick={()=>ok?setConfirm(r):null} className={`px-4 py-2 rounded-xl font-bold text-sm ${ok?"bg-amber-500 text-white active:scale-95 transition-transform":"bg-gray-100 text-gray-400"}`}>{ok?"Redeem":"Need more"}</button></div>
          </div>
        );})}
      </div>
      {history.length>0&&<div className="px-5 pt-6 pb-4"><h3 className="font-bold text-gray-800 mb-3">Redemption History</h3><div className="space-y-2">{history.map((h,i)=><div key={i} className="bg-white rounded-xl p-3 shadow-sm flex items-center gap-3"><span className="text-2xl">{h.icon}</span><div className="flex-1"><div className="font-semibold text-gray-800 text-sm">{h.name}</div><div className="text-xs text-gray-400">{h.date}</div></div><div className="text-right"><div className="text-red-500 font-bold text-sm">-{h.points}</div><div className="text-xs text-green-600">Redeemed</div></div></div>)}</div></div>}
    </div>
  );
};
// ── RETRACE ───────────────────────────────────────────────────────────────────
const ReTrace = ({ onBack }) => {
  const [sel,setSel]=useState(null);
  const products=[{name:"ReLoop Eco T-Shirt",emoji:"👕",school:"Vidya Mandir Estancia",state:"Tamil Nadu",collected:"15 May 2026",co2:"2.4 kg",bottles:12,batch:"RL2601"},{name:"ReLoop Eco Hoodie",emoji:"🧥",school:"Aringar School of Commerce",state:"Tamil Nadu",collected:"10 May 2026",co2:"4.8 kg",bottles:18,batch:"RL2598"}];
  if(sel!==null){const p=products[sel];return(
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-teal-600 to-green-600 px-5 pt-10 pb-8 flex items-center gap-3"><button onClick={()=>setSel(null)} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Ic n="back" s={20}/></button><div><h1 className="text-white font-black text-xl">Product Journey</h1><p className="text-teal-100 text-xs">ReTrace · Batch #{p.batch}</p></div></div>
      <div className="px-5 pt-5 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm text-center"><div className="text-6xl mb-3">{p.emoji}</div><h2 className="font-black text-xl text-gray-800 mb-4">{p.name}</h2><div className="grid grid-cols-2 gap-3">{[["Recycled Bottles",p.bottles],["School",p.school.split(" ")[0]+" ..."],["State",p.state],["CO₂ Saved",p.co2],["Collection Date",p.collected],["Batch",`#${p.batch}`]].map(([k,v],i)=><div key={i} className="bg-gray-50 rounded-xl p-3 text-left"><div className="text-xs text-gray-400 mb-0.5">{k}</div><div className="font-bold text-gray-800 text-sm">{v}</div></div>)}</div></div>
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 text-white flex items-center gap-3"><span className="text-3xl">🏫</span><div><div className="font-bold text-sm">Contributed by</div><div className="font-black text-lg">{p.school}</div><div className="text-green-100 text-xs">{p.state} · {p.collected}</div></div></div>
        <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-bold text-gray-800 mb-5">Full Production Timeline</h3>
          <div className="relative"><div className="absolute left-5 top-5 bottom-5 w-0.5 bg-green-100"/>
            {TRACE_STEPS.map((s,i)=>(
              <div key={i} className="flex gap-4 relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0 z-10 border-2 ${s.status==="done"?"bg-green-500 border-green-500":s.status==="active"?"bg-amber-400 border-amber-400 animate-pulse":"bg-gray-100 border-gray-200"}`}>{s.status==="done"?<Ic n="check" s={16} c="text-white"/>:<span>{s.icon}</span>}</div>
                <div className={`flex-1 pb-6 ${i===TRACE_STEPS.length-1?"pb-2":""}`}>
                  <div className="flex items-center justify-between"><span className={`font-bold text-sm ${s.status==="done"?"text-gray-800":s.status==="active"?"text-amber-700":"text-gray-400"}`}>{s.label}</span>{s.status==="active"&&<span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-2 py-0.5 rounded-full">In Progress</span>}{s.status==="done"&&<span className="text-[10px] bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">Done ✓</span>}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.detail}</div><div className="text-[10px] text-gray-400 mt-0.5">{s.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white text-center"><div className="text-3xl mb-2">🌍</div><h3 className="font-black text-lg mb-1">Thank You For Supporting</h3><p className="text-green-100 text-sm">Sustainable Fashion · ReLoop Network</p></div>
      </div>
    </div>
  );}
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PH onBack={onBack} title="ReTrace" sub="Product Journey Tracker" color="from-teal-600 to-green-600"/>
      <div className="px-5 pt-5 space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4"><div className="text-sm font-bold text-amber-800 mb-1">🔍 Select a Product</div><div className="text-xs text-amber-700">Trace any ReLoop product from school collection to your hands.</div></div>
        {products.map((p,i)=><button key={i} onClick={()=>setSel(i)} className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:scale-95 transition-transform"><div className="flex items-center gap-3"><span className="text-4xl">{p.emoji}</span><div className="flex-1"><div className="font-bold text-gray-800">{p.name}</div><div className="text-xs text-gray-500 mt-0.5">{p.school}</div><div className="flex gap-2 mt-1"><span className="text-[11px] bg-green-50 text-green-700 font-semibold px-2 py-0.5 rounded-full">♻️ {p.bottles} bottles</span><span className="text-[11px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-full">🌿 {p.co2} CO₂</span></div></div><Ic n="back" s={18} c="rotate-180 text-gray-400"/></div></button>)}
      </div>
    </div>
  );
};
  // ── CALCULATOR ────────────────────────────────────────────────────────────────
const Calculator = ({ onBack }) => {
  const [students,setStudents]=useState("");const[result,setResult]=useState(null);
  const calc=()=>{const n=parseInt(students);if(!n||n<=0)return;setResult({uniforms:n,bottles:n*24,plastic:+(n*24*0.02).toFixed(1),co2:+(n*4.2).toFixed(1),water:Math.round(n*85),repoints:n*24*2,landfill:+(n*0.48).toFixed(1)});};
  const fmt=n=>n.toLocaleString();
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <PH onBack={onBack} title="Impact Calculator" sub="Estimate your school's impact" color="from-teal-600 to-cyan-600"/>
      <div className="px-5 pt-5 space-y-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-gray-800">Uniform Impact Estimator</h3>
          <div><label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Number of Students</label><input type="number" min="1" className="w-full border border-gray-200 rounded-xl px-4 py-3 mt-1 text-gray-800 font-medium focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-100 text-xl" value={students} onChange={e=>{setStudents(e.target.value);setResult(null);}} placeholder="e.g. 500"/></div>
          <button onClick={calc} disabled={!students||parseInt(students)<=0} className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-bold py-4 rounded-2xl active:scale-95 transition-all disabled:opacity-50">Calculate Impact →</button>
        </div>
        {result&&<>
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl p-5 text-white"><h3 className="font-bold mb-4">🌍 Impact for {fmt(result.uniforms)} Students</h3><div className="grid grid-cols-2 gap-3">{[{icon:"👔",label:"Uniforms",val:fmt(result.uniforms)},{icon:"🍶",label:"Bottles Recycled",val:fmt(result.bottles)},{icon:"🧴",label:"Plastic Diverted",val:`${result.plastic} kg`},{icon:"🌿",label:"CO₂ Saved",val:`${result.co2} kg`},{icon:"💧",label:"Water Saved",val:`${fmt(result.water)}L`},{icon:"🗑️",label:"Landfill Avoided",val:`${result.landfill} kg`}].map((s,i)=><div key={i} className="bg-white/20 rounded-xl p-3"><div className="text-2xl mb-1">{s.icon}</div><div className="font-black text-xl">{s.val}</div><div className="text-white/70 text-[11px]">{s.label}</div></div>)}</div></div>
          <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-bold text-gray-800 mb-3">🏆 Equivalent Achievements</h3>{[{icon:"🌳",text:`Equivalent to planting ${Math.round(result.co2/21)} trees`},{icon:"🚗",text:`Offsetting ${Math.round(result.co2/0.21)} km of car travel`},{icon:"⭐",text:`Would earn ${fmt(result.repoints)} RePoints for your school`},{icon:"🥇",text:`Could boost ReLeague rank by ${Math.round(result.uniforms/100)} positions`}].map((e,i)=><div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"><span className="text-2xl">{e.icon}</span><span className="text-sm text-gray-700">{e.text}</span></div>)}</div>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4"><div className="text-sm font-bold text-amber-800 mb-1">💡 Ready to make it real?</div><div className="text-xs text-amber-700">Book a free consultation to start your school's sustainable uniform journey.</div></div>
        </>}
        <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-bold text-gray-800 mb-3">📊 How We Calculate</h3><div className="space-y-2 text-xs text-gray-600">{["1 school uniform set = 24 recycled PET bottles","Each bottle weighs approx. 20 grams","CO₂ savings based on rPET vs virgin polyester","Water savings vs conventional fabric production","Calculations aligned with ISO 14064 standards"].map((t,i)=><div key={i} className="flex items-start gap-1.5"><span className="text-green-500 mt-0.5">•</span>{t}</div>)}</div></div>
      </div>
    </div>
  );
};
};
// ─── CERTIFICATES ──────────────────────────────────────────────────────────
const Certificates = () => (
  <div className="pb-20">
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 px-5 pt-10 pb-8">
      <h1 className="text-white font-black text-2xl mb-1">Certificates</h1>
      <p className="text-purple-100 text-sm">Your achievements & awards</p>
    </div>

    <div className="px-5 pt-5 space-y-4">
      {CERTIFICATES.map((c, i) => (
        <div key={i} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-white`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold text-white/70 uppercase tracking-wide mb-1">ReLoop Certificate</div>
              <div className="font-black text-2xl mb-1">{c.title}</div>
              <div className="text-white/80 text-sm">{c.subtitle}</div>
              <div className="text-xs text-white/60 mt-1">Vidya Mandir Estancia · Tamil Nadu</div>
            </div>
            <span className="text-5xl">{c.icon}</span>
          </div>
          <button className="mt-4 bg-white/20 backdrop-blur border border-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl flex items-center gap-2 active:scale-95 transition-transform">
            <Icon name="download" size={16} /> Download
          </button>
        </div>
      ))}
    </div>
  </div>
   );
};

// ── VISION ────────────────────────────────────────────────────────────────────
const Vision = ({ onBack }) => {
  const [exp,setExp]=useState(1);
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 px-5 pt-10 pb-8">
        <div className="flex items-center gap-3 mb-4"><button onClick={onBack} className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-white flex-shrink-0"><Ic n="back" s={20}/></button><div><h1 className="text-white font-black text-xl">Future Vision</h1><p className="text-purple-200 text-xs">Our roadmap to nationwide impact</p></div></div>
        <div className="bg-white/20 rounded-2xl p-4"><div className="text-white font-bold mb-1">ReLoop 2026–2028 Roadmap</div><div className="text-purple-100 text-xs">From Tamil Nadu pilot to India-wide movement</div></div>
      </div>
      <div className="mx-5 mt-4 bg-white rounded-2xl p-4 shadow-sm"><div className="flex justify-between text-xs text-gray-500 mb-2"><span className="font-semibold">Overall Progress</span><span className="font-bold text-indigo-600">Phase 2 of 5</span></div><div className="h-3 bg-gray-100 rounded-full overflow-hidden"><div className="h-full w-[32%] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"/></div><div className="flex justify-between text-[10px] text-gray-400 mt-1"><span>Start</span><span>2026</span><span>2027</span><span>2028</span></div></div>
      <div className="px-5 pt-4 space-y-3 pb-6">
        {ROADMAP.map((r,i)=>(
          <div key={i} className={`rounded-2xl overflow-hidden shadow-sm border-2 transition-all ${r.status==="done"?"border-green-300":r.status==="active"?"border-indigo-400":"border-transparent"}`}>
            <button onClick={()=>setExp(exp===i?null:i)} className="w-full text-left">
              <div className={`bg-gradient-to-r ${r.color} p-4 flex items-center gap-3`}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-white/20">{r.icon}</div>
                <div className="flex-1 min-w-0"><div className="text-white/80 text-[11px] font-bold uppercase tracking-wide">{r.phase}</div><div className="text-white font-black text-base truncate">{r.title}</div></div>
                <div className="flex-shrink-0 text-right"><div className="text-white/80 text-[10px] font-semibold">{r.date}</div><div className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${r.status==="done"?"bg-white/30 text-white":r.status==="active"?"bg-white text-indigo-700":"bg-white/20 text-white/70"}`}>{r.status==="done"?"✓ Complete":r.status==="active"?"🟢 Active":"Planned"}</div></div>
              </div>
            </button>
            {exp===i&&<div className="bg-white p-4 space-y-2"><p className="text-sm text-gray-600">{r.desc}</p>{i===1&&<div className="bg-indigo-50 rounded-xl p-3"><div className="text-xs font-bold text-indigo-700">🚀 Currently in Progress</div><div className="text-xs text-indigo-600 mt-0.5">Onboarding schools in Coimbatore, Madurai & Salem</div></div>}{i===4&&<div className="grid grid-cols-2 gap-2">{[["Platform","Android + iOS"],["Features","Full ReLoop"],["Target DAU","50K+ users"],["Launch","2027 Q3"]].map(([k,v],j)=><div key={j} className="bg-gray-50 rounded-xl p-2 text-xs"><div className="text-gray-400">{k}</div><div className="font-bold text-gray-700">{v}</div></div>)}</div>}</div>}
          </div>
        ))}
        <div className="bg-white rounded-2xl p-5 shadow-sm"><h3 className="font-bold text-gray-800 mb-4">🎯 2028 Impact Targets</h3><div className="grid grid-cols-2 gap-3">{[{val:"2,000+",label:"Schools",icon:"🏫"},{val:"500T",label:"Plastic",icon:"♻️"},{val:"10M+",label:"Bottles",icon:"🍶"},{val:"₹2Cr+",label:"Revenue",icon:"💰"}].map((t,i)=><div key={i} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 text-center"><div className="text-xl mb-1">{t.icon}</div><div className="font-black text-indigo-700 text-lg">{t.val}</div><div className="text-[11px] text-gray-500">{t.label}</div></div>)}</div></div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-5 text-white"><div className="font-black text-xl mb-1">🦈 Investor Ready</div><div className="text-gray-300 text-sm mb-4">ReLoop is seeking Series A funding to accelerate national rollout.</div><div className="grid grid-cols-2 gap-2 text-xs">{[["TAM","₹8,400 Cr"],["SAM","₹1,200 Cr"],["Current ARR","₹24 L"],["Growth","3x YoY"]].map(([k,v],i)=><div key={i} className="bg-white/10 rounded-xl p-2"><div className="text-gray-400">{k}</div><div className="font-black text-white text-base">{v}</div></div>)}</div></div>
      </div>
    </div>
  );
  // ── PROFILE ───────────────────────────────────────────────────────────────────
const Profile = ({ st, onLogout, go }) => (
  <div className="pb-20">
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 px-5 pt-10 pb-16"><div className="flex items-center gap-4"><div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center text-3xl">🏫</div><div><h1 className="text-white font-black text-xl">{st.school}</h1><p className="text-gray-400 text-sm">{st.state}</p><span className="inline-block mt-1 text-xs bg-green-500/20 text-green-400 font-semibold px-2 py-0.5 rounded-full">Active Member</span></div></div></div>
    <div className="px-5 -mt-6 space-y-4">
      <div className="bg-white rounded-2xl shadow-xl p-4 grid grid-cols-2 gap-3">{[{label:"Total RePoints",val:st.repoints,icon:"⭐"},{label:"Collections",val:st.collections,icon:"♻️"},{label:"Certificates",val:st.certs,icon:"🎓"},{label:"TN Rank",val:`#${st.rank}`,icon:"🏆"}].map((s,i)=><div key={i} className="bg-gray-50 rounded-xl p-3 text-center"><div className="text-2xl mb-1">{s.icon}</div><div className="font-black text-gray-800 text-lg">{s.val}</div><div className="text-[11px] text-gray-500">{s.label}</div></div>)}</div>
      <div className="bg-white rounded-2xl shadow-sm p-5 space-y-3"><h3 className="font-bold text-gray-800">Account Details</h3>{[["Institution ID","VME2026"],["Member Since",st.since],["State",st.state],["Network","ReLoop Pilot"]].map(([k,v],i)=><div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"><span className="text-sm text-gray-500">{k}</span><span className="text-sm font-semibold text-gray-800">{v}</span></div>)}</div>
      <div className="bg-white rounded-2xl shadow-sm p-5"><h3 className="font-bold text-gray-800 mb-3">Quick Links</h3>{[{icon:"🗺️",label:"Future Vision & Roadmap",page:"vision"},{icon:"🧮",label:"Impact Calculator",page:"calculator"},{icon:"🔍",label:"ReTrace Product Journey",page:"retrace"},{icon:"⭐",label:"Redeem RePoints",page:"rewards"}].map((l,i)=><button key={i} onClick={()=>go(l.page)} className="w-full flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 text-left rounded-lg px-1 active:bg-gray-50 transition-colors"><span className="text-xl">{l.icon}</span><span className="text-sm text-gray-700 font-medium flex-1">{l.label}</span><Ic n="back" s={16} c="rotate-180 text-gray-300"/></button>)}</div>
      <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 text-red-500 border-2 border-red-100 bg-red-50 font-bold py-4 rounded-2xl active:scale-95 transition-transform"><Ic n="logout" s={18}/> Sign Out</button>
    </div>
  </div>
);
};
// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen,setScreen]=useState("splash");
  const [page,setPage]=useState("dashboard");
  const [sub,setSub]=useState(null);
  const [product,setProduct]=useState(null);
  const [toast,setToast]=useState(null);

  const [st,setSt]=useState(()=>{
    try{const s=localStorage.getItem("rl_v3");if(s)return JSON.parse(s);}catch{}
    return{school:"Vidya Mandir Estancia",state:"Tamil Nadu",rank:2,plastic:78,repoints:780,bottles:1560,co2:120,collections:12,since:"January 2026",certs:4,monthly:[8,10,12,14,16,18],cart:[],history:[]};
  });
  useEffect(()=>{localStorage.setItem("rl_v3",JSON.stringify(st));},[st]);

  const showToast=(msg,type="success")=>{setToast({msg,type});setTimeout(()=>setToast(null),3500);};
  const handleCol=kg=>{const pts=Math.round(kg*10);setSt(s=>({...s,plastic:+(s.plastic+kg).toFixed(1),repoints:s.repoints+pts,bottles:s.bottles+Math.round(kg*20),co2:+(s.co2+kg*2.5).toFixed(1),collections:s.collections+1,monthly:[...s.monthly.slice(0,-1),s.monthly[s.monthly.length-1]+kg]}));showToast(`+${pts} RePoints earned!`);};
  const handleRedeem=r=>{setSt(s=>({...s,repoints:s.repoints-r.points,history:[{...r,date:new Date().toLocaleDateString("en-IN")},...s.history]}));showToast(`${r.name} redeemed!`);};
  const setCart=fn=>setSt(s=>({...s,cart:typeof fn==="function"?fn(s.cart):fn}));

  const SUBS=["collection","uniform","rewards","retrace","cart","product","calculator","vision"];
  const go=p=>{if(SUBS.includes(p))setSub(p);else{setPage(p);setSub(null);}};
  const nav=p=>{setPage(p);setSub(null);};

  if(screen==="splash")return <Splash onStart={()=>setScreen("login")}/>;
  if(screen==="login") return <Login  onLogin={()=>setScreen("app")}/>;

  const renderSub=()=>{
    if(sub==="collection")return <Collection onBack={()=>setSub(null)} onSubmit={handleCol}/>;
    if(sub==="uniform")   return <UniformPage onBack={()=>setSub(null)} showToast={showToast} setCart={setCart} go={go} setProduct={setProduct}/>;
    if(sub==="rewards")   return <Rewards points={st.repoints} onRedeem={handleRedeem} history={st.history} onBack={()=>setSub(null)}/>;
    if(sub==="retrace")   return <ReTrace onBack={()=>setSub(null)}/>;
    if(sub==="cart")      return <Cart cart={st.cart} setCart={setCart} onBack={()=>setSub(null)} showToast={showToast}/>;
    if(sub==="calculator")return <Calculator onBack={()=>setSub(null)}/>;
    if(sub==="vision")    return <Vision onBack={()=>setSub(null)}/>;
    if(sub==="product"&&product)return <ProductDetail product={product} onBack={()=>setSub(null)} cart={st.cart} setCart={setCart} showToast={showToast}/>;
    return null;
  };
  const renderPage=()=>{
    if(page==="dashboard")   return <Dashboard st={st} go={go}/>;
    if(page==="releague")    return <ReLeague school={st.school}/>;
    if(page==="restore")     return <ReStore cart={st.cart} setCart={setCart} go={go} setProduct={setProduct}/>;
    if(page==="certificates")return <Certificates/>;
    if(page==="profile")     return <Profile st={st} onLogout={()=>{setScreen("login");setPage("dashboard");setSub(null);}} go={go}/>;
    return null;
  };
  const s=renderSub();
  return(
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 relative">
      {toast&&<Toast message={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}
      {s||renderPage()}
      {!s&&<Nav page={page} go={nav}/>}
    </div>
  );
      }






  
 
