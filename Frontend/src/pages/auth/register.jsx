import { useState, useRef } from "react";

import React from "react";
import { Link, useNavigate } from "react-router-dom";


// import { register } from "../../api/auth";


const GradientBlob = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`} />
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

const CameraIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TEACHER_ROLES = ["Professor", "Associate Professor", "Assistant Professor", "Lecturer", "Lab Instructor", "HOD", "Dean"];

export default function RegisterPage() {
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", username: "", email: "",
    university: "", college: "", department: "",
    rollNumber: "", teacherRole: "",
    password: "", confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const fileRef = useRef();

  const set = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    setErrors(p => ({ ...p, [key]: undefined }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };
  // validate handler
  const validate = () => {
    const e = {};
    if (!role) e.role = "Please choose your role.";
    if (!form.firstName.trim()) e.firstName = "Required.";
    if (!form.lastName.trim()) e.lastName = "Required.";
    if (!form.username.trim()) e.username = "Required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.university.trim()) e.university = "Required.";
    if (!form.college.trim()) e.college = "Required.";
    if (!form.department.trim()) e.department = "Required.";
    if (role === "student" && !form.rollNumber.trim()) e.rollNumber = "Roll number is required.";
    if (role === "teacher" && !form.teacherRole) e.teacherRole = "Please select your role.";
    if (form.password.length < 8) e.password = "Min 8 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match.";
    return e;
  };

  // submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors("");
    setSuccess("");
    setLoading(true);

    try {
      await register(form);
      setSuccess("Registration successful. You can sign in now.");
      setTimeout(() => navigate("/"), 1200);
    } catch (requestError) {
      const payload = requestError?.response?.data;
      if (typeof payload === "string") {
        setErrors(payload);
      } else if (payload && typeof payload === "object") {
        const firstError = Object.values(payload)[0];
        setErrors(Array.isArray(firstError) ? firstError[0] : "Registration failed.");
      } else {
        setErrors("Registration failed. Please check all fields.");
      }
    } finally {
      setLoading(false);
    }
  };




  const ic = (field, extra = "") =>
    `w-full bg-white/5 border ${errors[field] ? "border-rose-400" : "border-white/10"} rounded-xl px-3 py-2.5 text-white placeholder-white/25 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-white/10 transition-all duration-200 ${extra}`;

  const Label = ({ text }) => (
    <p className="text-[10px] uppercase tracking-widest text-white/35 font-semibold mb-1">{text}</p>
  );

  const Err = ({ field }) => errors[field] ? <p className="text-rose-400 text-[10px] mt-0.5">{errors[field]}</p> : null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Sora',sans-serif]">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:ital,wght@1,700&display=swap');`}</style>
        <div className="text-center space-y-4">
          {avatar
            ? <img src={avatar} className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-amber-400/50" />
            : <div className="text-6xl">🎉</div>
          }
          <h2 className="text-3xl font-bold text-white">Welcome, <span className="text-amber-400">{form.firstName}</span>!</h2>
          <p className="text-white/50">Registered as <span className="capitalize text-white/70 font-semibold">{role}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex font-['Sora',sans-serif] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:ital,wght@1,700&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes ringPulse { 0%,100%{box-shadow:0 0 0 0 rgba(251,191,36,0.4)} 50%{box-shadow:0 0 0 8px rgba(251,191,36,0)} }
        .float { animation: float 6s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.55s ease both; }
        .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}
        .d4{animation-delay:.24s}.d5{animation-delay:.30s}.d6{animation-delay:.36s}
        .shimmer-btn {
          background: linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b,#fbbf24);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .avatar-ring { animation: ringPulse 2.5s ease-in-out infinite; }
        .form-scroll::-webkit-scrollbar { width: 4px; }
        .form-scroll::-webkit-scrollbar-track { background: transparent; }
        .form-scroll::-webkit-scrollbar-thumb { background: rgba(251,191,36,0.2); border-radius: 99px; }
        .form-scroll::-webkit-scrollbar-thumb:hover { background: rgba(251,191,36,0.4); }
      `}</style>

      {/* ── LEFT: Form Panel ── */}
      <div className="relative w-full lg:w-[52%] flex flex-col overflow-hidden">
        <GradientBlob className="w-96 h-96 bg-amber-500 -top-32 -left-32" />
        <GradientBlob className="w-72 h-72 bg-violet-700 bottom-0 left-1/2" />

        {/* Scrollable inner */}
        <div className="form-scroll relative z-10 overflow-y-auto h-screen px-8 sm:px-12 xl:px-16 py-8">
          <div className="max-w-md mx-auto w-full">

            {/* Logo */}
            <div className="fade-up flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0a0a0f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-white/60 text-sm tracking-widest uppercase font-semibold">Academia</span>
            </div>

            {/* Heading */}
            <div className="fade-up d1 mb-6">
              <h1 className="text-3xl font-bold text-white leading-tight">
                Create your<br />
                <span className="font-['Playfair_Display',serif] italic text-amber-400">account.</span>
              </h1>
              <p className="text-white/40 text-sm mt-1.5">Join thousands learning and teaching every day.</p>
            </div>

            {/* ── Profile Picture ── */}
            <div className="fade-up d1 flex flex-col items-center mb-6">
              <div className="relative">
                <div
                  onClick={() => fileRef.current.click()}
                  className={`w-24 h-24 rounded-full cursor-pointer overflow-hidden border-2 flex items-center justify-center transition-all duration-300 ${avatar ? "border-amber-400" : "border-white/15 hover:border-amber-400/50"} bg-white/5 avatar-ring`}
                >
                  {avatar
                    ? <img src={avatar} className="w-full h-full object-cover" alt="avatar" />
                    : (
                      <div className="flex flex-col items-center gap-1 text-white/30">
                        <CameraIcon />
                        <span className="text-[9px] uppercase tracking-widest">Photo</span>
                      </div>
                    )
                  }
                </div>
                {/* Edit badge */}
                <button
                  onClick={() => fileRef.current.click()}
                  className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center shadow-lg hover:bg-amber-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatar} />
              </div>
              <p className="text-white/30 text-[10px] mt-2 uppercase tracking-widest">Profile Photo</p>
            </div>

            {/* ── Role Selector ── */}
            <div className="fade-up d2 mb-5">
              <Label text="I am a" />
              <div className="grid grid-cols-2 gap-3">
                {["student", "teacher"].map((r) => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setErrors(p => ({ ...p, role: undefined })); }}
                    className={`relative py-3.5 rounded-2xl border text-sm font-semibold capitalize transition-all duration-300
                      ${role === r
                        ? "border-amber-400 text-amber-400 bg-amber-400/10"
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                      }`}
                  >
                    <span className="block text-xl mb-0.5">{r === "teacher" ? "🎓" : "📚"}</span>
                    {r}
                    {role === r && <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />}
                  </button>
                ))}
              </div>
              <Err field="role" />
            </div>

            {/* ── Personal Info ── */}
            <div className="fade-up d2 mb-4">
              <Label text="Personal Information" />
              <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                <div>
                  <input className={ic("firstName")} placeholder="First Name" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
                  <Err field="firstName" />
                </div>
                <div>
                  <input className={ic("lastName")} placeholder="Last Name" value={form.lastName} onChange={e => set("lastName", e.target.value)} />
                  <Err field="lastName" />
                </div>
              </div>
              <div className="mb-2.5">
                <input className={ic("username")} placeholder="Username" value={form.username} onChange={e => set("username", e.target.value)} />
                <Err field="username" />
              </div>
              <div>
                <input className={ic("email")} placeholder="Email Address" type="email" value={form.email} onChange={e => set("email", e.target.value)} />
                <Err field="email" />
              </div>
            </div>

            {/* ── Academic Info ── */}
            <div className="fade-up d3 mb-4">
              <Label text="Academic Information" />
              <div className="space-y-2.5">
                <div>
                  <input className={ic("university")} placeholder="University Name" value={form.university} onChange={e => set("university", e.target.value)} />
                  <Err field="university" />
                </div>
                <div>
                  <input className={ic("college")} placeholder="College Name" value={form.college} onChange={e => set("college", e.target.value)} />
                  <Err field="college" />
                </div>
                <div>
                  <input className={ic("department")} placeholder="Department Name" value={form.department} onChange={e => set("department", e.target.value)} />
                  <Err field="department" />
                </div>
              </div>
            </div>

            {/* ── Role-specific Field ── */}
            {role === "student" && (
              <div className="fade-up mb-4">
                <Label text="Student Details" />
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400/70 text-xs font-bold">#</span>
                  <input
                    className={ic("rollNumber", "pl-7")}
                    placeholder="Roll Number"
                    value={form.rollNumber}
                    onChange={e => set("rollNumber", e.target.value)}
                  />
                </div>
                <Err field="rollNumber" />
              </div>
            )}

            {role === "teacher" && (
              <div className="fade-up mb-4">
                <Label text="Teacher Details" />
                <div className="relative">
                  <select
                    value={form.teacherRole}
                    onChange={e => set("teacherRole", e.target.value)}
                    className={`${ic("teacherRole")} appearance-none cursor-pointer`}
                    style={{ backgroundImage: "none" }}
                  >
                    <option value="" disabled style={{ background: "#0f0f1a" }}>Select Teacher Role</option>
                    {TEACHER_ROLES.map(r => (
                      <option key={r} value={r} style={{ background: "#0f0f1a" }}>{r}</option>
                    ))}
                  </select>
                  <svg className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <Err field="teacherRole" />
              </div>
            )}

            {/* ── Password ── */}
            <div className="fade-up d4 mb-5">
              <Label text="Security" />
              <div className="space-y-2.5">
                <div>
                  <div className="relative">
                    <input
                      className={ic("password", "pr-10")}
                      placeholder="Password"
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={e => set("password", e.target.value)}
                    />
                    <button onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                      <EyeIcon open={showPass} />
                    </button>
                  </div>
                  <Err field="password" />
                </div>
                <div>
                  <div className="relative">
                    <input
                      className={ic("confirm", "pr-10")}
                      placeholder="Confirm Password"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirm}
                      onChange={e => set("confirm", e.target.value)}
                    />
                    <button onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                  <Err field="confirm" />
                </div>
              </div>
            </div>

            {/* ── Submit ── */}
            <div className="fade-up d5 space-y-3 pb-10">
              <button
                onClick={handleSubmit}
                // 
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold text-sm tracking-wide 
                  hover:from-amber-500 hover:to-amber-600 
                  hover:scale-[1.02] active:scale-95 
                  transition-all duration-200 
                  shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
              >
                Create Account →
              </button>
              <p className="text-center text-white/30 text-xs">
                Already have an account?{" "}
                {/* <span className="text-amber-400 cursor-pointer hover:underline">Sign in</span> */}
                <Link className="text-amber-400 cursor-pointer hover:underline" to="/login">Sign in</Link>
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ── RIGHT: Illustration ── */}
      <div className="hidden lg:flex w-[48%] relative items-center justify-center bg-[#0d0d15] overflow-hidden">
        <GradientBlob className="w-125 h-125 bg-violet-800 -top-25 -right-37.5" />
        <GradientBlob className="w-96 h-96 bg-amber-600 -bottom-20 -left-20" />
        <GradientBlob className="w-64 h-64 bg-indigo-600 top-1/2 right-[10%]" />

        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 float">
          <svg viewBox="0 0 420 500" width="380" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="370" width="340" height="18" rx="9" fill="#1e1b2e" />
            <rect x="80" y="388" width="12" height="80" rx="6" fill="#1e1b2e" />
            <rect x="328" y="388" width="12" height="80" rx="6" fill="#1e1b2e" />
            <rect x="100" y="200" width="220" height="160" rx="16" fill="#1a1830" stroke="#2e2b50" strokeWidth="2" />
            <rect x="112" y="212" width="196" height="130" rx="10" fill="url(#screenGrad)" />
            <rect x="128" y="232" width="80" height="6" rx="3" fill="#f59e0b" opacity="0.9" />
            <rect x="128" y="248" width="140" height="4" rx="2" fill="#ffffff" opacity="0.15" />
            <rect x="128" y="260" width="110" height="4" rx="2" fill="#ffffff" opacity="0.10" />
            <rect x="128" y="272" width="130" height="4" rx="2" fill="#ffffff" opacity="0.10" />
            <rect x="128" y="290" width="12" height="28" rx="3" fill="white" opacity="0.2" />
            <rect x="144" y="282" width="12" height="36" rx="3" fill="white" opacity="0.3" />
            <rect x="160" y="287" width="12" height="31" rx="3" fill="white" opacity="0.2" />
            <rect x="176" y="276" width="12" height="42" rx="3" fill="#f59e0b" opacity="0.85" />
            <rect x="192" y="284" width="12" height="34" rx="3" fill="white" opacity="0.25" />
            <rect x="128" y="303" width="60" height="18" rx="5" fill="#f59e0b" opacity="0.8" />
            <rect x="193" y="360" width="34" height="12" rx="4" fill="#1e1b2e" />
            <rect x="170" y="368" width="80" height="8" rx="4" fill="#1e1b2e" />
            <rect x="120" y="393" width="180" height="30" rx="8" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => <rect key={`k1-${i}`} x={130 + i * 18} y="400" width="13" height="8" rx="2" fill="#2e2b50" />)}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <rect key={`k2-${i}`} x={139 + i * 18} y="412" width="13" height="6" rx="2" fill="#2e2b50" />)}
            <rect x="315" y="394" width="34" height="22" rx="11" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />
            <line x1="332" y1="394" x2="332" y2="416" stroke="#2e2b50" strokeWidth="1" />
            <rect x="48" y="340" width="55" height="12" rx="3" fill="#7c3aed" />
            <rect x="52" y="328" width="48" height="12" rx="3" fill="#4f46e5" />
            <rect x="56" y="316" width="40" height="12" rx="3" fill="#2563eb" />
            <rect x="330" y="344" width="32" height="28" rx="6" fill="#1e1b2e" stroke="#2e2b50" strokeWidth="1.5" />
            <path d="M362 352 Q374 352 374 362 Q374 372 362 372" stroke="#2e2b50" strokeWidth="1.5" fill="none" />
            <ellipse cx="346" cy="348" rx="12" ry="4" fill="#7c3aed" opacity="0.5" />
            <path d="M340 340 Q342 334 340 328" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
            <path d="M346 338 Q348 332 346 326" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
            <path d="M352 340 Q354 334 352 328" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
            <rect x="148" y="118" width="124" height="80" rx="16" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />
            <circle cx="210" cy="96" r="32" fill="#FBBF24" />
            <ellipse cx="210" cy="70" rx="32" ry="14" fill="#1a0a00" />
            <rect x="178" y="70" width="64" height="22" fill="#1a0a00" />
            <rect x="178" y="76" width="7" height="28" rx="3.5" fill="#1a0a00" />
            <rect x="235" y="76" width="7" height="28" rx="3.5" fill="#1a0a00" />
            <ellipse cx="198" cy="97" rx="6" ry="7" fill="white" />
            <ellipse cx="222" cy="97" rx="6" ry="7" fill="white" />
            <circle cx="200" cy="98" r="3.5" fill="#1a0a00" />
            <circle cx="224" cy="98" r="3.5" fill="#1a0a00" />
            <circle cx="201" cy="96.5" r="1.2" fill="white" />
            <circle cx="225" cy="96.5" r="1.2" fill="white" />
            <path d="M192 88 Q198 85 204 88" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M216 88 Q222 85 228 88" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M200 109 Q210 117 220 109" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none" />
            <rect x="172" y="128" width="76" height="72" rx="16" fill="#7c3aed" />
            <rect x="136" y="136" width="42" height="15" rx="7.5" fill="#FBBF24" transform="rotate(6 136 136)" />
            <rect x="242" y="136" width="42" height="15" rx="7.5" fill="#FBBF24" transform="rotate(-6 264 136)" />
            <ellipse cx="155" cy="396" rx="14" ry="8" fill="#FBBF24" />
            <ellipse cx="265" cy="396" rx="14" ry="8" fill="#FBBF24" />
            <circle cx="60" cy="150" r="3" fill="#f59e0b" opacity="0.7" />
            <circle cx="362" cy="178" r="4" fill="#8b5cf6" opacity="0.6" />
            <circle cx="80" cy="258" r="2.5" fill="#34d399" opacity="0.5" />
            <circle cx="370" cy="298" r="3" fill="#f59e0b" opacity="0.5" />
            <circle cx="350" cy="128" r="2" fill="#60a5fa" opacity="0.6" />
            <circle cx="42" cy="300" r="2" fill="#f472b6" opacity="0.5" />
            <defs>
              <linearGradient id="screenGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Badges */}
        <div className="absolute top-14 right-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 fade-up d4">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-lg">✦</div>
          <div>
            <p className="text-white text-xs font-semibold">10k+ Learners</p>
            <p className="text-white/40 text-[10px]">Active this week</p>
          </div>
        </div>
        <div className="absolute bottom-16 left-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 fade-up d5">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">Top Courses</p>
          <div className="flex gap-2">
            {["🎨", "🔬", "💻", "📐"].map((e, i) => (
              <div key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-base">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}