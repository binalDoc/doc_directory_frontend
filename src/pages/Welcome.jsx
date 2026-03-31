import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#060d1a] text-white flex flex-col overflow-x-hidden font-sans">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }} />
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
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-10">
        <div className="mb-6 inline-flex items-center gap-2 text-xs bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full text-blue-300">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse hidden sm:block" />
          Auto-verified via Medical Registry APIs · Open to doctors worldwide
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-[1.1] max-w-4xl mb-6 tracking-tight">
          The doctor directory
          <br />
          that actually{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            verifies
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mb-4 text-lg leading-relaxed">
          Every profile is cross-checked against official medical registries the moment
          it's created or updated. No waiting. No fake credentials. No stale data.
        </p>
        <p className="text-gray-500 max-w-xl mb-10 text-sm">
          A global platform built for pharma companies, healthcare institutions, and
          patients who need to find and trust verified doctors — fast.
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
              <button onClick={() => navigate("/home")} className="px-8 py-3 rounded-xl transition text-white text-sm underline underline-offset-4">
                Browse as guest →
              </button>
            </>
          )}
        </div>

        <p className="mt-4 text-xs text-gray-600">
          No account needed — search and explore the directory freely
        </p>

        <div className="flex gap-8 mt-12 pt-8 border-t border-white/5 text-sm text-gray-500 flex-wrap justify-center">
          <span><strong className="text-white text-base">500+</strong> Verified Doctors</span>
          <span><strong className="text-white text-base">20+</strong> Specialties</span>
          <span><strong className="text-white text-base">Global</strong> Platform</span>
          <span><strong className="text-white text-base">Real-time</strong> Verification</span>
        </div>
      </main>

      {/* ── WHO, WHY, VS OTHERS — combined ── */}
      <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">Who It's For & Why</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">A different platform for different people — with one thing in common</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              Practo gets you booked. Google gets you found. DocDirectory gets you <strong className="text-white">trusted</strong> —
              by pharma companies and healthcare institutions that care about verified credentials.
            </p>
          </div>

          {/* 3-column role layout — each tells a unique story */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">

            {/* DOCTORS */}
            <div className="p-7 border border-blue-500/20 bg-blue-500/5 rounded-2xl flex flex-col gap-5">
              <div>
                <span className="text-2xl">🩺</span>
                <h3 className="font-bold text-lg text-blue-300 mt-3 mb-1">For Doctors</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Build credibility that travels</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your NMC registration exists — but nobody outside your city knows it's real.
                DocDirectory puts your verified credentials in front of global pharma networks,
                so your reputation travels as far as your work deserves.
              </p>
              <div className="space-y-2.5 pt-3 border-t border-white/5">
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-blue-400 shrink-0">→</span>
                  <span>Pharma reps actively search this platform — your profile is their first impression</span>
                </div>
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-blue-400 shrink-0">→</span>
                  <span>A verified badge here carries weight — it's backed by a registry, not a checkbox</span>
                </div>
              </div>
            </div>

            {/* PHARMA */}
            <div className="p-7 border border-cyan-500/20 bg-cyan-500/5 rounded-2xl flex flex-col gap-5">
              <div>
                <span className="text-2xl">💊</span>
                <h3 className="font-bold text-lg text-cyan-300 mt-3 mb-1">For Pharma</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Engage without second-guessing</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every doctor you find here has cleared a registry check — not just filled out a form.
                Search by specialty, city, or experience and reach out knowing the data is current,
                the credentials are real, and your time isn't wasted.
              </p>
              <div className="space-y-2.5 pt-3 border-t border-white/5">
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>Filter by specialty, location, experience, and verification status in seconds</span>
                </div>
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-cyan-400 shrink-0">→</span>
                  <span>Data re-verified on every profile update — never stale, never guessed</span>
                </div>
              </div>
            </div>

            {/* ADMINS */}
            <div className="p-7 border border-green-500/20 bg-green-500/5 rounded-2xl flex flex-col gap-5">
              <div>
                <span className="text-2xl">🛡️</span>
                <h3 className="font-bold text-lg text-green-300 mt-3 mb-1">For Admins</h3>
                <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">Oversee, not operate</p>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Verification doesn't wait in your inbox. The moment a doctor submits their
                registration details, the system checks the registry automatically. You step in
                only when something needs a human eye — not for every profile.
              </p>
              <div className="space-y-2.5 pt-3 border-t border-white/5">
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-green-400 shrink-0">→</span>
                  <span>Bulk-upload hundreds of doctors from Excel in one upload</span>
                </div>
                <div className="flex gap-2.5 text-xs text-gray-400">
                  <span className="text-green-400 shrink-0">→</span>
                  <span>Search and profile view Analytics dashboards</span>
                </div>
              </div>
            </div>

          </div>

          {/* Guest access callout */}
          <div className="mb-6 p-5 rounded-xl border border-white/8 bg-white/2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-gray-300 mb-1">Just here to explore?</p>
              <p className="text-xs text-gray-500">
                No account required. Browse and search verified doctors freely — register only when you're ready.
              </p>
            </div>
            <button
              onClick={() => navigate("/home")}
              className="shrink-0 px-5 py-2 rounded-lg border border-white/15 hover:border-white/30 text-sm text-gray-300 hover:text-white transition whitespace-nowrap"
            >
              Browse as guest →
            </button>
          </div>

          {/* Bottom comparison */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-white/8 bg-white/2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Other Platforms</p>
              <ul className="space-y-2">
                {[
                  "Profiles are self-submitted, unverified",
                  "Built for appointments or general networking",
                  "No pharma-specific search or filtering",
                  "Data goes stale — no re-verification trigger",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="shrink-0 mt-0.5 text-gray-600">✗</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-blue-500/30 bg-blue-500/8">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">DocDirectory</p>
              <ul className="space-y-2">
                {[
                  "Every profile verified against medical registries",
                  "Purpose-built for pharma engagement workflows",
                  "Filter by specialty, location, and verified status",
                  "Re-verified automatically on every profile update",
                ].map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-blue-300">
                    <span className="shrink-0 mt-0.5 text-blue-400">✓</span>{pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>

      {/* ── AUTO-VERIFY ── */}
      <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-3">
              How Verification Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Verified by Source. Approved by Admin.
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm">
              As soon as a doctor submits or updates their profile, our system instantly
              verifies their credentials using official medical registry APIs (like NMC).
              Only profiles that pass verification are reviewed and approved by admins
              before being listed publicly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            {[
              { label: "Doctor submits/updates profile", color: "bg-white/5 border-white/10 text-gray-300" },
              null,
              { label: "NMC API verification ✓", color: "bg-blue-500/10 border-blue-500/20 text-blue-300" },
              null,
              { label: "Admin approval → Listed", color: "bg-green-500/10 border-green-500/20 text-green-300" },
            ].map((step, i) =>
              step === null
                ? <span key={i} className="hidden sm:block text-blue-400 text-xl">→</span>
                : <div key={i} className={`px-5 py-3 rounded-xl border text-sm font-medium ${step.color}`}>{step.label}</div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: "⚡",
                title: "Instant API Verification",
                desc: "Doctor details are verified in real-time via official registry APIs (like NMC) as soon as the profile is created or updated."
              },
              {
                icon: "🏷️",
                title: "Verification Flag in Database",
                desc: "Once verified, a secure flag is stored in the database ensuring only trusted, validated profiles move forward in the process."
              },
              {
                icon: "🛡️",
                title: "Admin Approval Layer",
                desc: "Only NMC-verified profiles are reviewed by admins, adding a final layer of trust before making them visible in the directory."
              },
              {
                icon: "🌐",
                title: "Trust-first Directory",
                desc: "Doctors are listed publicly only after passing both verification and admin approval, ensuring users see reliable and authentic profiles."
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-6 bg-white/3 border border-white/8 rounded-2xl">
                <div className="text-2xl shrink-0">{item.icon}</div>
                <div>
                  <h3 className="font-semibold mb-1.5">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative z-10 px-6 py-20 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to join the verified network?
          </h2>
          <p className="text-gray-400 mb-10">
            If you're a doctor who wants real professional visibility —
            or a pharma team who's tired of bad data — this platform was built for you.
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
                <button onClick={() => navigate("/home")} className="px-8 py-3 rounded-xl transition text-gray-500 hover:text-gray-300 text-sm underline underline-offset-4">
                  Browse as guest →
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