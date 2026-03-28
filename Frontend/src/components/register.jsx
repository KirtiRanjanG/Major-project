import { useState } from "react";

const EyeIcon = ({ open }) =>
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

export default function RegisterPage() {
  const [role, setRole] = useState("");
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e = {};
    if (!role) e.role = "Please select a role.";
    if (!form.username.trim()) e.username = "Username is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (form.password.length < 8) e.password = "Minimum 8 characters.";
    if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (!Object.keys(e).length) setDone(true);
  };

  const InputField = ({ fieldKey, placeholder, type = "text" }) => {
    const isPass = fieldKey === "password" || fieldKey === "confirm";
    const showToggle = fieldKey === "password" ? showPass : showConfirm;
    const resolvedType = isPass ? (showToggle ? "text" : "password") : type;

    return (
      <div className="mb-3">
        <label className="block text-xs font-semibold text-gray-500 mb-1">{placeholder}</label>
        <div className="relative">
          <input
            type={resolvedType}
            placeholder={placeholder}
            value={form[fieldKey]}
            onChange={e => { setForm(p => ({ ...p, [fieldKey]: e.target.value })); setErrors(p => ({ ...p, [fieldKey]: undefined })); }}
            className={`w-full border ${errors[fieldKey] ? "border-red-400 bg-red-50" : "border-gray-200"} rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white`}
          />
          {isPass && (
            <button
              type="button"
              onClick={() => fieldKey === "password" ? setShowPass(v => !v) : setShowConfirm(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <EyeIcon open={showToggle} />
            </button>
          )}
        </div>
        {errors[fieldKey] && <p className="text-red-400 text-[11px] mt-0.5">{errors[fieldKey]}</p>}
      </div>
    );
  };

  if (done) {
    return (
      <div className="min-h-screen bg-[#6C63FF] flex items-center justify-center font-['DM_Sans',sans-serif]">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>
        <div className="bg-white rounded-2xl p-12 text-center shadow-2xl">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome, <span className="text-indigo-500">{form.username}</span>!</h2>
          <p className="text-gray-400 text-sm mt-1">Registered as <span className="capitalize font-semibold text-gray-600">{role}</span></p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#6C63FF] flex items-center justify-center p-4 font-['DM_Sans',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        .fade-up { animation: fadeUp 0.45s ease both; }
        .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}
        .d4{animation-delay:.24s}.d5{animation-delay:.30s}.d6{animation-delay:.36s}
        .float-svg { animation: floatY 5s ease-in-out infinite; }
      `}</style>

      {/* Card */}
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-225 flex overflow-hidden" style={{minHeight: 580}}>

        {/* ───── LEFT: Form ───── */}
        <div className="w-full lg:w-[46%] flex flex-col justify-center px-10 py-10">

          {/* Logo */}
          <div className="fade-up flex items-center gap-2 mb-7">
            <div className="w-8 h-8 bg-indigo-500 rounded-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-bold text-gray-800 text-base tracking-tight">Academia</span>
          </div>

          {/* Title */}
          <div className="fade-up d1 mb-6">
            <h1 className="text-[28px] font-bold text-gray-800 leading-tight">Create Account</h1>
            <p className="text-gray-400 text-sm mt-0.5">Join thousands of learners and educators.</p>
          </div>

          {/* Role */}
          <div className="fade-up d2 mb-5">
            <p className="text-xs font-semibold text-gray-500 mb-2">I am a</p>
            <div className="flex gap-3">
              {["student","teacher"].map(r => (
                <button
                  key={r}
                  onClick={() => { setRole(r); setErrors(p => ({...p, role: undefined})); }}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg border text-sm font-semibold capitalize transition-all
                    ${role === r ? "border-indigo-500 bg-indigo-50 text-indigo-600" : "border-gray-200 text-gray-400 hover:border-indigo-300 hover:text-indigo-500"}`}
                >
                  <span>{r === "teacher" ? "🎓" : "📚"}</span>{r}
                </button>
              ))}
            </div>
            {errors.role && <p className="text-red-400 text-[11px] mt-1">{errors.role}</p>}
          </div>

          {/* Divider */}
          <div className="fade-up d2 flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-gray-100"/>
            <span className="text-gray-300 text-[11px] uppercase tracking-widest whitespace-nowrap">fill your details</span>
            <div className="flex-1 h-px bg-gray-100"/>
          </div>

          {/* Fields */}
          <div className="fade-up d3"><InputField fieldKey="username" placeholder="Username" /></div>
          <div className="fade-up d3"><InputField fieldKey="email" placeholder="Email Address" type="email" /></div>
          <div className="fade-up d4"><InputField fieldKey="password" placeholder="Password" /></div>
          <div className="fade-up d4"><InputField fieldKey="confirm" placeholder="Confirm Password" /></div>

          {/* Submit */}
          <div className="fade-up d5 mt-1">
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-white font-semibold py-3 rounded-lg text-sm transition-all shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
            >
              Register
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>
          </div>

          <div className="fade-up d6 text-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <span className="text-indigo-500 font-semibold cursor-pointer hover:underline">Sign in</span>
            </p>
          </div>
        </div>

        {/* ───── RIGHT: Illustration ───── */}
        <div className="hidden lg:flex w-[54%] bg-[#ECEEFF] flex-col items-center justify-between py-10 px-8 relative overflow-hidden">

          {/* Top info card */}
          <div className="self-end bg-white rounded-2xl px-5 py-3.5 shadow-sm max-w-52.5">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-5 h-5 bg-indigo-500 rounded-md flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-bold text-gray-700 text-xs">Academia</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed">Access top courses, track progress, and grow every day.</p>
            <button className="mt-2 border border-gray-200 text-gray-500 rounded px-3 py-1 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors">
              Explore Courses
            </button>
          </div>

          {/* SVG Illustration */}
          <div className="float-svg flex-1 flex items-center justify-center w-full">
            <svg viewBox="0 0 400 340" width="360" xmlns="http://www.w3.org/2000/svg">

              {/* Floor shadow */}
              <ellipse cx="200" cy="332" rx="120" ry="7" fill="#C8CCF0" opacity="0.55"/>

              {/* Desk */}
              <rect x="50" y="222" width="300" height="13" rx="6.5" fill="#BCC0EC"/>
              <rect x="78" y="235" width="9" height="88" rx="4.5" fill="#ADB1E2"/>
              <rect x="313" y="235" width="9" height="88" rx="4.5" fill="#ADB1E2"/>

              {/* Laptop base */}
              <rect x="128" y="255" width="144" height="8" rx="4" fill="#BCC0EC"/>
              <rect x="136" y="263" width="128" height="5" rx="2.5" fill="#ADB1E2"/>
              {/* Laptop screen */}
              <rect x="128" y="162" width="144" height="95" rx="9" fill="#CDD0F5"/>
              <rect x="136" y="169" width="128" height="80" rx="6" fill="#A5AAE0"/>
              {/* Screen UI */}
              <rect x="144" y="178" width="52" height="5" rx="2.5" fill="#6C63FF" opacity="0.9"/>
              <rect x="144" y="188" width="100" height="3.5" rx="1.8" fill="white" opacity="0.3"/>
              <rect x="144" y="195" width="78" height="3.5" rx="1.8" fill="white" opacity="0.22"/>
              <rect x="144" y="213" width="14" height="22" rx="4" fill="white" opacity="0.45"/>
              <rect x="162" y="205" width="14" height="30" rx="4" fill="white" opacity="0.65"/>
              <rect x="180" y="210" width="14" height="25" rx="4" fill="white" opacity="0.45"/>
              <rect x="198" y="201" width="14" height="34" rx="4" fill="#6C63FF" opacity="0.85"/>
              <rect x="216" y="208" width="14" height="27" rx="4" fill="white" opacity="0.45"/>
              <rect x="234" y="215" width="14" height="20" rx="4" fill="white" opacity="0.35"/>

              {/* Lamp */}
              <rect x="90" y="218" width="5" height="46" rx="2.5" fill="#ADB1E2"/>
              <path d="M92 218 Q108 195 124 210" stroke="#ADB1E2" strokeWidth="4" strokeLinecap="round" fill="none"/>
              <ellipse cx="128" cy="212" rx="19" ry="9" fill="#7C83D6" transform="rotate(-28 128 212)"/>
              <ellipse cx="138" cy="226" rx="28" ry="7" fill="#FFF6C0" opacity="0.3"/>

              {/* Plant */}
              <rect x="306" y="196" width="28" height="28" rx="5" fill="#7C83D6"/>
              <ellipse cx="320" cy="196" rx="16" ry="5" fill="#9099E0"/>
              <ellipse cx="320" cy="178" rx="9" ry="20" fill="#5BB87A" transform="rotate(-14 320 178)"/>
              <ellipse cx="320" cy="178" rx="9" ry="20" fill="#4AAD6B" transform="rotate(14 320 178)"/>
              <ellipse cx="320" cy="185" rx="5.5" ry="13" fill="#67C98A"/>

              {/* Mug */}
              <rect x="264" y="198" width="28" height="26" rx="6" fill="#E8EAF8" stroke="#BCC0EC" strokeWidth="1.5"/>
              <path d="M292 206 Q304 206 304 215 Q304 224 292 224" stroke="#BCC0EC" strokeWidth="1.5" fill="none"/>
              <ellipse cx="278" cy="202" rx="11" ry="4" fill="#A8AEDD" opacity="0.55"/>
              <path d="M274 195 Q276 190 274 185" stroke="#BCC0EC" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
              <path d="M280 193 Q282 188 280 183" stroke="#BCC0EC" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>

              {/* Person */}
              {/* Chair */}
              <rect x="162" y="265" width="76" height="52" rx="10" fill="#9BA2DC"/>
              <rect x="150" y="263" width="100" height="13" rx="6.5" fill="#8B92D0"/>
              {/* Legs */}
              <rect x="170" y="290" width="20" height="42" rx="10" fill="#2D2D3A" transform="rotate(8 170 290)"/>
              <rect x="208" y="290" width="20" height="42" rx="10" fill="#2D2D3A" transform="rotate(-8 218 290)"/>
              <ellipse cx="174" cy="330" rx="17" ry="7" fill="#1A1A28"/>
              <ellipse cx="218" cy="330" rx="17" ry="7" fill="#1A1A28"/>
              {/* Torso */}
              <rect x="174" y="200" width="52" height="68" rx="16" fill="#E05FA0"/>
              {/* Arms */}
              <rect x="132" y="218" width="48" height="16" rx="8" fill="#F9C78A" transform="rotate(6 132 218)"/>
              <rect x="220" y="218" width="48" height="16" rx="8" fill="#F9C78A" transform="rotate(-6 244 218)"/>
              {/* Head */}
              <circle cx="200" cy="174" r="34" fill="#F9C78A"/>
              {/* Hair */}
              <ellipse cx="200" cy="148" rx="33" ry="15" fill="#1A1A28"/>
              <rect x="167" y="148" width="66" height="20" fill="#1A1A28"/>
              <rect x="167" y="155" width="7" height="26" rx="3.5" fill="#1A1A28"/>
              <rect x="226" y="155" width="7" height="26" rx="3.5" fill="#1A1A28"/>
              {/* Eyes */}
              <ellipse cx="189" cy="175" rx="6" ry="7" fill="white"/>
              <ellipse cx="211" cy="175" rx="6" ry="7" fill="white"/>
              <circle cx="191" cy="176" r="3.5" fill="#1A1A28"/>
              <circle cx="213" cy="176" r="3.5" fill="#1A1A28"/>
              <circle cx="192" cy="174.5" r="1.2" fill="white"/>
              <circle cx="214" cy="174.5" r="1.2" fill="white"/>
              {/* Brows */}
              <path d="M183 167 Q189 164 195 167" stroke="#1A1A28" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M205 167 Q211 164 217 167" stroke="#1A1A28" strokeWidth="2" strokeLinecap="round" fill="none"/>
              {/* Smile */}
              <path d="M192 187 Q200 194 208 187" stroke="#d4845a" strokeWidth="2" strokeLinecap="round" fill="none"/>

              {/* Floating card top-left */}
              <rect x="16" y="120" width="90" height="46" rx="10" fill="white" opacity="0.85"/>
              <circle cx="36" cy="143" r="12" fill="#ECEEFF"/>
              <text x="29" y="148" fontSize="14">📚</text>
              <rect x="53" y="135" width="44" height="5" rx="2.5" fill="#6C63FF" opacity="0.7"/>
              <rect x="53" y="144" width="34" height="4" rx="2" fill="#C5C9F0"/>
              <rect x="53" y="153" width="40" height="4" rx="2" fill="#C5C9F0"/>

              {/* Floating card top-right */}
              <rect x="296" y="92" width="96" height="54" rx="10" fill="white" opacity="0.85"/>
              <circle cx="316" cy="114" r="11" fill="#ECEEFF"/>
              <text x="309" y="119" fontSize="12" fill="#6C63FF" fontWeight="bold">A+</text>
              <rect x="332" y="107" width="50" height="5" rx="2.5" fill="#6C63FF" opacity="0.7"/>
              <rect x="332" y="116" width="38" height="4" rx="2" fill="#C5C9F0"/>
              <rect x="332" y="125" width="46" height="4" rx="2" fill="#C5C9F0"/>
              <rect x="304" y="136" width="76" height="6" rx="3" fill="#6C63FF" opacity="0.15"/>

            </svg>
          </div>

          {/* Bottom */}
          <p className="text-indigo-400 text-[11px] font-medium opacity-60 tracking-wide">
            ✦ &nbsp; Learn · Grow · Achieve &nbsp; ✦
          </p>
        </div>
      </div>
    </div>
  );
}