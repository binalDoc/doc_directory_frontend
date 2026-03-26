import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#060d1a] text-white flex flex-col overflow-x-hidden font-sans">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none">
        {/* grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }} />
        {/* glows */}
        <div className="absolute top-[-160px] left-[-100px] w-[500px] h-[500px] rounded-full bg-blue-700/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[-80px] w-[360px] h-[360px] rounded-full bg-cyan-500/6 blur-[100px]" />
        <div className="absolute bottom-[-100px] left-[30%] w-[400px] h-[300px] rounded-full bg-blue-500/8 blur-[100px]" />
      </div>

      {/* ── NAV ── */}
      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-12 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
            <svg width="16" height="16" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="hidden sm:block text-lg font-bold tracking-tight">DocDirectory</span>
          <span className="hidden sm:block text-[10px] bg-blue-500/15 border border-blue-500/25 text-blue-300 px-2 py-0.5 rounded-full">Global</span>
        </div>
        <div className="flex items-center gap-3">
          {!user ? (
            <>
              <button onClick={() => navigate("/login")} className="text-sm text-gray-400 hover:text-white transition">Sign in</button>
              <button onClick={() => navigate("/register")} className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg transition shadow-lg shadow-blue-600/20">
                Get started
              </button>
            </>
          ) : (
            <button onClick={() => navigate("/home")} className="text-sm bg-blue-600 hover:bg-blue-500 px-4 py-1.5 rounded-lg transition">
              Browse Doctors
            </button>
          )}
        </div>
      </nav>

      {/* ── HERO ── */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-4">

        <div className="mb-6 inline-flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-300">
          <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Auto-verified via Medical Registry APIs · Open to doctors worldwide
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-[1.1] max-w-4xl mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            NMC-Verified
          </span>
          {" "}doctor directory
          <br />
          built for pharma
        </h1>

        <p className="text-gray-400 max-w-2xl mb-4 text-lg leading-relaxed">
          Every doctor profile on this platform is automatically verified against official
          medical registries the moment it's updated — no waiting, no manual review bottlenecks.
        </p>
        <p className="text-gray-500 max-w-xl mb-10 text-sm">
          Built for pharmaceutical companies who need accurate, trustworthy data to drive
          meaningful engagement with healthcare professionals — globally.
        </p>

        <div className="flex gap-3 flex-wrap justify-center">
          {user ? (
            <button onClick={() => navigate("/home")} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition shadow-xl shadow-blue-600/25">
              Browse Doctors →
            </button>
          ) : (
            <>
              <button onClick={() => navigate("/register")} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition shadow-xl shadow-blue-600/25">
                Join the platform →
              </button>
              <button onClick={() => navigate("/login")} className="px-8 py-3 border border-white/15 hover:border-white/30 rounded-xl transition text-gray-300 hover:text-white">
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Stats bar */}
        <div className="flex gap-8 mt-12 border-t border-white/5 text-sm text-gray-500 flex-wrap justify-center">
          <span><strong className="text-white text-base">500+</strong> Verified Doctors</span>
          <span><strong className="text-white text-base">20+</strong> Specialties</span>
          <span><strong className="text-white text-base">Global</strong> Platform</span>
          <span><strong className="text-white text-base">Real-time</strong> Verification</span>
        </div>

      </main>

      {/* ── THE PROBLEM ── */}
      {/* <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Doctor directories are broken</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Pharma teams waste days chasing unverified leads from directories full of
              outdated, self-claimed profiles. There's no standard, no trust, no efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: "⚠️", title: "Unverified profiles", desc: "Most platforms let anyone self-list with zero credential checks. Doctors claim specialties they may not have." },
              { icon: "📭", title: "Stale data", desc: "Profiles go years without updates. Phone numbers change, doctors relocate, registrations lapse — the data stays the same." },
              { icon: "🎯", title: "No pharma focus", desc: "Generic directories aren't built for pharma engagement workflows. No filtering by specialty, region, or verification status." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-red-500/5 border border-red-500/15 rounded-2xl">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-red-300 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section> */}

      {/* ── THE SOLUTION / AUTO-VERIFY ── */}
      <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-4">
            <p className="text-blue-400 text-xl font-semibold uppercase tracking-widest">Our Approach</p>
          </div>

          {/* Auto-verify flow */}
          <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
            {[
              { label: "Doctor updates profile", color: "bg-white/5 border-white/10", text: "text-gray-300" },
              { label: "→", color: "", text: "text-blue-400 text-xl font-bold", arrow: true },
              { label: "Registry API called instantly", color: "bg-blue-500/10 border-blue-500/20", text: "text-blue-300" },
              { label: "→", color: "", text: "text-blue-400 text-xl font-bold", arrow: true },
              { label: "Profile auto-verified ✓", color: "bg-green-500/10 border-green-500/20", text: "text-green-300" },
            ].map((step, i) => (
              step.arrow
                ? <span key={i} className="hidden sm:block text-blue-400 text-xl font-bold">→</span>
                : (
                  <div key={i} className={`px-5 py-3 rounded-xl border text-sm font-medium ${step.color} ${step.text}`}>
                    {step.label}
                  </div>
                )
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white/3 border border-white/8 rounded-2xl">
              <div className="text-blue-400 mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Automatic, not manual</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                No admin needs to sit and review 500 profiles. Verification happens live
                via API — admin oversight is a safety net, not the primary gate.
              </p>
            </div>
            <div className="p-6 bg-white/3 border border-white/8 rounded-2xl">
              <div className="text-blue-400 mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Always up-to-date</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every time a doctor edits their profile, re-verification triggers automatically.
                The data you see reflects what the registry says — today, not two years ago.
              </p>
            </div>
            <div className="p-6 bg-white/3 border border-white/8 rounded-2xl">
              <div className="text-blue-400 mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="2" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Global by design</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Any licensed doctor anywhere in the world can register. The platform
                integrates with multiple medical registry APIs — not locked to one country.
              </p>
            </div>
            <div className="p-6 bg-white/3 border border-white/8 rounded-2xl">
              <div className="text-blue-400 mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Admin as quality control</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Admins can additionally review, approve, or reject profiles — but they're
                the second layer, not the only layer. Speed and accuracy both win.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      {/* <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-14">From registration to discovery</h2>

          <div className="grid md:grid-cols-4 gap-5">
            {[
              { step: "01", title: "Doctor registers", desc: "Any licensed doctor worldwide creates a profile with credentials and medical council details." },
              { step: "02", title: "Auto-verification", desc: "Backend instantly cross-checks the registration number against official medical registry APIs." },
              { step: "03", title: "Admin oversight", desc: "Admins can review flagged or manually submitted profiles as a quality-control layer." },
              { step: "04", title: "Pharma discovers", desc: "Verified, structured profiles are searchable by specialty, location, and experience." },
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white/3 border border-white/8 rounded-2xl text-left relative overflow-hidden group hover:border-blue-500/30 transition">
                <div className="text-5xl font-black text-white/5 absolute -top-2 -right-1 group-hover:text-blue-500/10 transition">{item.step}</div>
                <div className="text-blue-400 text-sm font-bold mb-3">{item.step}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section> */}

      {/* ── VS OTHER DIRECTORIES ── */}
      {/* <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Why Different</p>
            <h2 className="text-3xl sm:text-4xl font-bold">Not just another directory</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-gray-500 font-medium">Feature</th>
                  <th className="text-center py-3 px-4 text-gray-500 font-medium">Other Directories</th>
                  <th className="text-center py-3 px-4 text-blue-400 font-semibold">DocDirectory</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  ["Profile verification", "Self-claimed ✗", "Registry API ✓"],
                  ["Verification speed", "Days / weeks", "Instant, automatic"],
                  ["Data freshness", "Stale, rarely updated", "Re-verified on every update"],
                  ["Global doctors", "Usually country-specific", "Worldwide coverage"],
                  ["Pharma-focused filters", "Generic search only", "Specialty, region, status"],
                  ["Admin oversight", "Primary (slow) gate", "Safety net layer"],
                  ["Profile completeness tracking", "None", "Completion % per profile"],
                  ["Bulk onboarding", "Manual only", "Excel bulk upload"],
                ].map(([feature, others, ours], i) => (
                  <tr key={i} className="hover:bg-white/2 transition">
                    <td className="py-3 px-4 text-gray-300">{feature}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{others}</td>
                    <td className="py-3 px-4 text-center text-green-400 font-medium">{ours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section> */}

      {/* ── BUILT FOR ── */}
      <section className="relative z-10 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-blue-400 text-xl font-semibold uppercase tracking-widest mb-3">Who It's For</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">Three roles. One platform.</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                role: "Doctors",
                icon: "🩺",
                color: "border-blue-500/20 bg-blue-500/5",
                accent: "text-blue-300",
                points: ["Build a verified global presence", "Registration auto-checked via API", "Control your profile visibility", "Track who's viewing your profile"],
              },
              {
                role: "Pharma",
                icon: "💊",
                color: "border-cyan-500/20 bg-cyan-500/5",
                accent: "text-cyan-300",
                points: ["Search only verified doctors", "Filter by specialty & location", "Trust the data you're working with", "Engage with confidence"],
              },
              {
                role: "Admins",
                icon: "🛡️",
                color: "border-green-500/20 bg-green-500/5",
                accent: "text-green-300",
                points: ["Oversee verification quality", "Approve, verify, or reject profiles", "Bulk-import doctor records", "Analytics on platform activity"],
              },
            ].map((item, i) => (
              <div key={i} className={`p-6 border rounded-2xl text-left ${item.color}`}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className={`font-bold text-lg mb-4 ${item.accent}`}>{item.role}</h3>
                <ul className="space-y-2">
                  {item.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className={`mt-0.5 shrink-0 ${item.accent}`}>✓</span>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join the verified network
          </h2>
          <p className="text-gray-400 mb-10">
            Whether you're a doctor building your professional presence,
            or a pharma team looking for trusted healthcare contacts —
            this platform was built for you.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {!user ? (
              <>
                <button onClick={() => navigate("/register")} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition shadow-xl shadow-blue-600/25">
                  Create free account →
                </button>
                <button onClick={() => navigate("/login")} className="px-8 py-3 border border-white/15 hover:border-white/30 rounded-xl transition text-gray-300 hover:text-white">
                  Sign in
                </button>
              </>
            ) : (
              <button onClick={() => navigate("/home")} className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold transition shadow-xl shadow-blue-600/25">
                Browse Doctors →
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 py-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-600">
        <span>© 2026 DocDirectory — Built for verified healthcare connections</span>
        <span className="text-xs">Auto-verified · Global · Pharma-first</span>
      </footer>

    </div>
  );
}

export default Welcome;