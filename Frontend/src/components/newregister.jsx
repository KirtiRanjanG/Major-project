import { useState } from "react";

const GradientBlob = ({ className }) => (
  <div className={`absolute rounded-full blur-3xl opacity-30 pointer-events-none ${className}`} />
);

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

export default function RegisterPage() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!role) e.role = "Please choose your role.";
    if (!form.username.trim()) e.username = "Username is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 8) e.password = "Min 8 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length === 0) setSubmitted(true);
  };

  const inputClass = (field) =>
    `w-full bg-white/5 border ${errors[field] ? "border-rose-400" : "border-white/10"} rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/70 focus:bg-white/10 transition-all duration-200`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center font-['Sora',sans-serif]">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Playfair+Display:ital,wght@1,700&display=swap');`}</style>
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-3xl font-bold text-white">Welcome aboard,<br /><span className="text-amber-400">{form.username}</span>!</h2>
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
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        .float { animation: float 6s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.32s; }
        .delay-5 { animation-delay: 0.40s; }
        .delay-6 { animation-delay: 0.48s; }
        .shimmer-btn {
          background: linear-gradient(90deg, #f59e0b, #fbbf24, #f59e0b, #fbbf24);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      {/* ── LEFT: Form ── */}
      <div className="relative w-full lg:w-[52%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-12 overflow-hidden">
        <GradientBlob className="w-96 h-96 bg-amber-500 -top-32 -left-32" />
        <GradientBlob className="w-72 h-72 bg-violet-700 bottom-0 left-1/2" />

        <div className="relative z-10 max-w-md mx-auto w-full space-y-6">

          {/* Logo */}
          <div className="fade-up">
            <div className="flex items-center gap-2.5 mb-7">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0a0a0f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white/60 text-sm tracking-widest uppercase font-semibold">Academia</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-white leading-tight">
              Create your<br />
              <span className="font-['Playfair_Display',serif] italic text-amber-400">account.</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">Join thousands learning and teaching every day.</p>
          </div>

          {/* Role selector */}
          <div className="fade-up delay-1 space-y-2">
            <label className="text-xs uppercase tracking-widest text-white/40 font-semibold">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              {["student", "teacher"].map((r) => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setErrors(p => ({ ...p, role: undefined })); }}
                  className={`relative py-4 rounded-2xl border text-sm font-semibold capitalize transition-all duration-300
                    ${role === r
                      ? "border-amber-400 text-amber-400 bg-amber-400/10"
                      : "border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                    }`}
                >
                  <span className="block text-2xl mb-1">{r === "teacher" ? "🎓" : "📚"}</span>
                  {r}
                  {role === r && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              ))}
            </div>
            {errors.role && <p className="text-rose-400 text-xs">{errors.role}</p>}
          </div>

          {/* Input fields */}
          <div className="fade-up delay-2 space-y-3">
            {/* Username */}
            <div>
              <input
                className={inputClass("username")}
                placeholder="Username"
                value={form.username}
                onChange={e => { setForm(p => ({ ...p, username: e.target.value })); setErrors(p => ({ ...p, username: undefined })); }}
              />
              {errors.username && <p className="text-rose-400 text-xs mt-1">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <input
                className={inputClass("email")}
                placeholder="Email address"
                type="email"
                value={form.email}
                onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
              />
              {errors.email && <p className="text-rose-400 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  className={inputClass("password") + " pr-11"}
                  placeholder="Password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })); }}
                />
                <button onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <EyeIcon open={showPass} />
                </button>
              </div>
              {errors.password && <p className="text-rose-400 text-xs mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <input
                  className={inputClass("confirm") + " pr-11"}
                  placeholder="Confirm password"
                  type={showConfirm ? "text" : "password"}
                  value={form.confirm}
                  onChange={e => { setForm(p => ({ ...p, confirm: e.target.value })); setErrors(p => ({ ...p, confirm: undefined })); }}
                />
                <button onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors">
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
              {errors.confirm && <p className="text-rose-400 text-xs mt-1">{errors.confirm}</p>}
            </div>
          </div>

          {/* Submit */}
          <div className="fade-up delay-3 space-y-3">
            <button
              onClick={handleSubmit}
            //   className="shimmer-btn w-full py-3.5 rounded-xl text-black font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-95 transition-transform duration-150 shadow-lg shadow-amber-500/20"
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
              <span className="text-amber-400 cursor-pointer hover:underline">Sign in</span>
            </p>
          </div>

        </div>
      </div>

      {/* ── RIGHT: Illustration ── */}
      <div className="hidden lg:flex w-[48%] relative items-center justify-center bg-[#0d0d15] overflow-hidden">
        <GradientBlob className="w-125 h-125 bg-violet-800 -top-25 -right-37.5" />
        <GradientBlob className="w-96 h-96 bg-amber-600 -bottom-20 -left-20" />
        <GradientBlob className="w-64 h-64 bg-indigo-600 top-1/2 right-[10%]" />

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Floating SVG scene */}
        <div className="relative z-10 float">
          <svg viewBox="0 0 420 500" width="380" xmlns="http://www.w3.org/2000/svg">

            {/* Desk surface */}
            <rect x="40" y="370" width="340" height="18" rx="9" fill="#1e1b2e" />
            <rect x="80" y="388" width="12" height="80" rx="6" fill="#1e1b2e" />
            <rect x="328" y="388" width="12" height="80" rx="6" fill="#1e1b2e" />

            {/* Monitor */}
            <rect x="100" y="200" width="220" height="160" rx="16" fill="#1a1830" stroke="#2e2b50" strokeWidth="2" />
            <rect x="112" y="212" width="196" height="130" rx="10" fill="url(#screenGrad)" />
            {/* Screen UI lines */}
            <rect x="128" y="232" width="80" height="6" rx="3" fill="#f59e0b" opacity="0.9" />
            <rect x="128" y="248" width="140" height="4" rx="2" fill="#ffffff" opacity="0.15" />
            <rect x="128" y="260" width="110" height="4" rx="2" fill="#ffffff" opacity="0.10" />
            <rect x="128" y="272" width="130" height="4" rx="2" fill="#ffffff" opacity="0.10" />
            {/* Bar chart on screen */}
            <rect x="128" y="290" width="12" height="28" rx="3" fill="white" opacity="0.2" />
            <rect x="144" y="282" width="12" height="36" rx="3" fill="white" opacity="0.3" />
            <rect x="160" y="287" width="12" height="31" rx="3" fill="white" opacity="0.2" />
            <rect x="176" y="276" width="12" height="42" rx="3" fill="#f59e0b" opacity="0.85" />
            <rect x="192" y="284" width="12" height="34" rx="3" fill="white" opacity="0.25" />
            {/* CTA button on screen */}
            <rect x="128" y="303" width="60" height="18" rx="5" fill="#f59e0b" opacity="0.8" />
            {/* Monitor stand */}
            <rect x="193" y="360" width="34" height="12" rx="4" fill="#1e1b2e" />
            <rect x="170" y="368" width="80" height="8" rx="4" fill="#1e1b2e" />

            {/* Keyboard */}
            <rect x="120" y="393" width="180" height="30" rx="8" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />
            {[0,1,2,3,4,5,6,7,8].map(i => (
              <rect key={`k1-${i}`} x={130 + i * 18} y="400" width="13" height="8" rx="2" fill="#2e2b50" />
            ))}
            {[0,1,2,3,4,5,6,7].map(i => (
              <rect key={`k2-${i}`} x={139 + i * 18} y="412" width="13" height="6" rx="2" fill="#2e2b50" />
            ))}

            {/* Mouse */}
            <rect x="315" y="394" width="34" height="22" rx="11" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />
            <line x1="332" y1="394" x2="332" y2="416" stroke="#2e2b50" strokeWidth="1" />

            {/* Books stack */}
            <rect x="48" y="340" width="55" height="12" rx="3" fill="#7c3aed" />
            <rect x="52" y="328" width="48" height="12" rx="3" fill="#4f46e5" />
            <rect x="56" y="316" width="40" height="12" rx="3" fill="#2563eb" />

            {/* Coffee mug */}
            <rect x="330" y="344" width="32" height="28" rx="6" fill="#1e1b2e" stroke="#2e2b50" strokeWidth="1.5" />
            <path d="M362 352 Q374 352 374 362 Q374 372 362 372" stroke="#2e2b50" strokeWidth="1.5" fill="none" />
            <ellipse cx="346" cy="348" rx="12" ry="4" fill="#7c3aed" opacity="0.5" />
            <path d="M340 340 Q342 334 340 328" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
            <path d="M346 338 Q348 332 346 326" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />
            <path d="M352 340 Q354 334 352 328" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.3" />

            {/* Chair back */}
            <rect x="148" y="118" width="124" height="80" rx="16" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.5" />

            {/* Head */}
            <circle cx="210" cy="96" r="32" fill="#FBBF24" />
            {/* Hair */}
            <ellipse cx="210" cy="70" rx="32" ry="14" fill="#1a0a00" />
            <rect x="178" y="70" width="64" height="22" fill="#1a0a00" />
            <rect x="178" y="76" width="7" height="28" rx="3.5" fill="#1a0a00" />
            <rect x="235" y="76" width="7" height="28" rx="3.5" fill="#1a0a00" />
            {/* Eyes */}
            <ellipse cx="198" cy="97" rx="6" ry="7" fill="white" />
            <ellipse cx="222" cy="97" rx="6" ry="7" fill="white" />
            <circle cx="200" cy="98" r="3.5" fill="#1a0a00" />
            <circle cx="224" cy="98" r="3.5" fill="#1a0a00" />
            <circle cx="201" cy="96.5" r="1.2" fill="white" />
            <circle cx="225" cy="96.5" r="1.2" fill="white" />
            {/* Eyebrows */}
            <path d="M192 88 Q198 85 204 88" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M216 88 Q222 85 228 88" stroke="#1a0a00" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Smile */}
            <path d="M200 109 Q210 117 220 109" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Body / torso */}
            <rect x="172" y="128" width="76" height="72" rx="16" fill="#7c3aed" />
            {/* Arms */}
            <rect x="136" y="136" width="42" height="15" rx="7.5" fill="#FBBF24" transform="rotate(6 136 136)" />
            <rect x="242" y="136" width="42" height="15" rx="7.5" fill="#FBBF24" transform="rotate(-6 264 136)" />
            {/* Hands on keyboard */}
            <ellipse cx="155" cy="396" rx="14" ry="8" fill="#FBBF24" />
            <ellipse cx="265" cy="396" rx="14" ry="8" fill="#FBBF24" />

            {/* Decorative stars */}
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

        {/* Floating badge — top right */}
        <div className="absolute top-14 right-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 fade-up delay-4">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-lg">✦</div>
          <div>
            <p className="text-white text-xs font-semibold">10k+ Learners</p>
            <p className="text-white/40 text-[10px]">Active this week</p>
          </div>
        </div>

        {/* Floating badge — bottom left */}
        <div className="absolute bottom-16 left-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 fade-up delay-5">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">Top Courses</p>
          <div className="flex gap-2">
            {["🎨","🔬","💻","📐"].map((e, i) => (
              <div key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-base">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}