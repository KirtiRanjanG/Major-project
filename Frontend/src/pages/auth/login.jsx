import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";


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

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);


// validate function to check if email is valid and password is not empty
  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
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
          <div className="text-6xl">👋</div>
          <h2 className="text-3xl font-bold text-white">Welcome back!</h2>
          <p className="text-white/50">Logged in as <span className="text-amber-400">{form.email}</span></p>
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
        @keyframes orbitSlow { 0%{transform:rotate(0deg) translateX(80px) rotate(0deg)} 100%{transform:rotate(360deg) translateX(80px) rotate(-360deg)} }
        @keyframes orbitFast { 0%{transform:rotate(0deg) translateX(52px) rotate(0deg)} 100%{transform:rotate(-360deg) translateX(52px) rotate(360deg)} }
        .float { animation: float 6s ease-in-out infinite; }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .delay-1{animation-delay:.08s}.delay-2{animation-delay:.16s}
        .delay-3{animation-delay:.24s}.delay-4{animation-delay:.32s}
        .delay-5{animation-delay:.40s}.delay-6{animation-delay:.48s}
        .shimmer-btn {
          background: linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b,#fbbf24);
          background-size: 200% auto;
          animation: shimmer 2s linear infinite;
        }
        .orbit-slow { animation: orbitSlow 12s linear infinite; }
        .orbit-fast { animation: orbitFast 8s linear infinite; }
      `}</style>

      {/* ── LEFT: Form ── */}
      <div className="relative w-full lg:w-[52%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 py-12 overflow-hidden">
        <GradientBlob className="w-96 h-96 bg-amber-500 -top-32 -left-32" />
        <GradientBlob className="w-72 h-72 bg-violet-700 bottom-0 left-1/2" />

        <div className="relative z-10 max-w-md mx-auto w-full space-y-6">

          {/* Logo */}
          <div className="fade-up">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#0a0a0f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white/60 text-sm tracking-widest uppercase font-semibold">Academia</span>
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight">
              Welcome<br />
              <span className="font-['Playfair_Display',serif] italic text-amber-400">back.</span>
            </h1>
            <p className="text-white/40 text-sm mt-2">Sign in to continue your learning journey.</p>
          </div>

          {/* Google SSO */}
          <div className="fade-up delay-1">
            <button className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-white/25 hover:bg-white/10 text-white/70 hover:text-white rounded-xl py-3 text-sm font-medium transition-all duration-200">
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"/>
                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"/>
                <path fill="#4A90D9" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"/>
                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"/>
              </svg>
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="fade-up delay-2 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-white/25 text-xs uppercase tracking-widest">or login with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {/* Fields */}
          <div className="fade-up delay-3 space-y-3">
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
          </div>

          {/* Remember + Forgot */}
          <div className="fade-up delay-4 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <div
                onClick={() => setRemember(v => !v)}
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${remember ? "bg-amber-400 border-amber-400" : "border-white/20 bg-white/5"}`}
              >
                {remember && (
                  <svg className="w-2.5 h-2.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-white/40 text-xs group-hover:text-white/60 transition-colors">Keep me logged in</span>
            </label>
            <span className="text-amber-400 text-xs cursor-pointer hover:underline">Forgot your password?</span>
          </div>

          {/* Submit */}
          <div className="fade-up delay-5 space-y-3">
            <button
              onClick={handleSubmit}
              // className="shimmer-btn w-full py-3.5 rounded-xl text-black font-bold text-sm tracking-wide hover:scale-[1.02] active:scale-95 transition-transform duration-150 shadow-lg shadow-amber-500/20"
              className="w-full py-3.5 rounded-xl bg-linear-to-r from-amber-400 to-amber-500 text-black font-bold text-sm tracking-wide 
  hover:from-amber-500 hover:to-amber-600 
  hover:scale-[1.02] active:scale-95 
  transition-all duration-200 
  shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
            >
              Log In →
            </button>
            <p className="text-center text-white/30 text-xs">
              Don't have an account?{" "}
              {/* <span className="text-amber-400 cursor-pointer hover:underline">Sign up</span> */}
              <Link className="text-amber-400 cursor-pointer hover:underline" to="/register">Sign up</Link>
            </p>
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

        {/* Floating SVG */}
        <div className="relative z-10 float">
          <svg viewBox="0 0 420 480" width="390" xmlns="http://www.w3.org/2000/svg">

            {/* ── Orbiting planet system ── */}
            {/* Central orb */}
            <circle cx="210" cy="200" r="52" fill="url(#orbGrad)" opacity="0.95" />
            <circle cx="210" cy="200" r="52" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
            {/* Glow rings */}
            <circle cx="210" cy="200" r="68" fill="none" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="4 6" opacity="0.2" />
            <circle cx="210" cy="200" r="90" fill="none" stroke="#8b5cf6" strokeWidth="0.8" strokeDasharray="3 8" opacity="0.2" />
            <circle cx="210" cy="200" r="115" fill="none" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="2 10" opacity="0.15" />

            {/* Central lock icon */}
            <rect x="194" y="202" width="32" height="26" rx="6" fill="white" opacity="0.9" />
            <path d="M200 202 v-8 a10 10 0 0 1 20 0 v8" stroke="white" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
            <circle cx="210" cy="215" r="4" fill="#f59e0b" />
            <rect x="208.5" y="215" width="3" height="6" rx="1.5" fill="#f59e0b" />

            {/* Orbit 1 — amber dot */}
            <g style={{transformOrigin:"210px 200px"}} className="orbit-slow">
              <circle cx="210" cy="130" r="8" fill="#f59e0b" opacity="0.9" />
              <circle cx="210" cy="130" r="4" fill="white" opacity="0.6" />
            </g>

            {/* Orbit 2 — purple dot */}
            <g style={{transformOrigin:"210px 200px"}} className="orbit-fast">
              <circle cx="262" cy="200" r="6" fill="#8b5cf6" opacity="0.9" />
              <circle cx="262" cy="200" r="3" fill="white" opacity="0.5" />
            </g>

            {/* ── Stats cards floating around ── */}
            {/* Card: Students */}
            <rect x="18" y="100" width="100" height="52" rx="12" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.2" />
            <circle cx="40" cy="120" r="12" fill="#f59e0b" opacity="0.15" />
            <text x="34" y="124" fontSize="13" fill="#f59e0b">👥</text>
            <rect x="58" y="111" width="48" height="5" rx="2.5" fill="#f59e0b" opacity="0.7" />
            <rect x="58" y="120" width="36" height="4" rx="2" fill="white" opacity="0.15" />
            <rect x="58" y="128" width="44" height="4" rx="2" fill="white" opacity="0.1" />
            <text x="22" y="144" fontSize="9" fill="white" opacity="0.4">10,240 students</text>

            {/* Card: Courses */}
            <rect x="302" y="88" width="104" height="52" rx="12" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.2" />
            <circle cx="324" cy="108" r="12" fill="#8b5cf6" opacity="0.15" />
            <text x="317" y="113" fontSize="13">🎓</text>
            <rect x="342" y="100" width="50" height="5" rx="2.5" fill="#8b5cf6" opacity="0.7" />
            <rect x="342" y="109" width="38" height="4" rx="2" fill="white" opacity="0.15" />
            <rect x="342" y="117" width="46" height="4" rx="2" fill="white" opacity="0.1" />
            <text x="308" y="132" fontSize="9" fill="white" opacity="0.4">320 live courses</text>

            {/* Card: Achievement */}
            <rect x="52" y="280" width="108" height="52" rx="12" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.2" />
            <circle cx="74" cy="300" r="12" fill="#34d399" opacity="0.15" />
            <text x="67" y="304" fontSize="13">🏆</text>
            <rect x="92" y="291" width="52" height="5" rx="2.5" fill="#34d399" opacity="0.7" />
            <rect x="92" y="300" width="40" height="4" rx="2" fill="white" opacity="0.15" />
            <rect x="92" y="308" width="48" height="4" rx="2" fill="white" opacity="0.1" />
            <text x="58" y="324" fontSize="9" fill="white" opacity="0.4">98% satisfaction</text>

            {/* Card: Rating */}
            <rect x="272" y="278" width="108" height="52" rx="12" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.2" />
            <circle cx="294" cy="298" r="12" fill="#f59e0b" opacity="0.15" />
            <text x="287" y="303" fontSize="13">⭐</text>
            <rect x="312" y="290" width="52" height="5" rx="2.5" fill="#f59e0b" opacity="0.7" />
            <rect x="312" y="299" width="40" height="4" rx="2" fill="white" opacity="0.15" />
            <rect x="312" y="307" width="48" height="4" rx="2" fill="white" opacity="0.1" />
            <text x="278" y="322" fontSize="9" fill="white" opacity="0.4">4.9 / 5 rating</text>

            {/* ── Bottom: avatars row ── */}
            <rect x="136" y="390" width="148" height="44" rx="22" fill="#1a1830" stroke="#2e2b50" strokeWidth="1.2" />
            {/* Avatar circles */}
            {[
              { cx: 161, fill: "#f59e0b" },
              { cx: 181, fill: "#8b5cf6" },
              { cx: 201, fill: "#34d399" },
              { cx: 221, fill: "#f472b6" },
            ].map((a, i) => (
              <g key={i}>
                <circle cx={a.cx} cy="412" r="12" fill={a.fill} opacity="0.85" stroke="#1a1830" strokeWidth="2" />
                <text x={a.cx - 5} y="417" fontSize="11">{["😊","🧑","👩","🧒"][i]}</text>
              </g>
            ))}
            <text x="242" y="408" fontSize="9" fill="white" opacity="0.5">+8.2k</text>
            <text x="240" y="420" fontSize="8" fill="white" opacity="0.3">online now</text>

            {/* Decorative dots */}
            <circle cx="60" cy="60" r="3" fill="#f59e0b" opacity="0.6" />
            <circle cx="370" cy="420" r="3" fill="#8b5cf6" opacity="0.5" />
            <circle cx="390" cy="170" r="2" fill="#34d399" opacity="0.5" />
            <circle cx="30" cy="370" r="2.5" fill="#f472b6" opacity="0.4" />
            <circle cx="200" cy="460" r="2" fill="#60a5fa" opacity="0.4" />

            <defs>
              <radialGradient id="orbGrad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#1e1b4b" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Top badge */}
        <div className="absolute top-14 right-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 flex items-center gap-3 fade-up delay-4">
          <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400 text-lg">✦</div>
          <div>
            <p className="text-white text-xs font-semibold">Secure Login</p>
            <p className="text-white/40 text-[10px]">256-bit encrypted</p>
          </div>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-16 left-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 fade-up delay-5">
          <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">Continue with</p>
          <div className="flex gap-2">
            {["📚","🎨","🔬","💻"].map((e, i) => (
              <div key={i} className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-base">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}