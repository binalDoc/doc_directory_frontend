import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function Welcome() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a1628] text-white flex flex-col overflow-hidden">

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="fixed top-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-blue-600/10 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-80px] right-[-80px] w-[320px] h-[320px] rounded-full bg-blue-400/8 blur-[80px] pointer-events-none" />

      {/* NAV */}
      <nav className="relative z-10 flex justify-between items-center px-6 sm:px-10 py-5 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          {/* Logo mark */}
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <span className="text-white text-xl font-semibold tracking-wide">DocDirectory</span>
        </div>

        <div className="flex items-center gap-3">
          {!user && (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-sm text-gray-400 hover:text-white transition px-3 py-1.5"
              >
                Sign in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition font-medium"
              >
                Get started
              </button>
            </>
          )}
          {user && (
            <button
              onClick={() => navigate("/home")}
              className="text-sm bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg transition font-medium"
            >
              Browse Doctors
            </button>
          )}
        </div>
      </nav>

      {/* HERO */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-16 sm:py-24 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          Trusted by 500+ verified healthcare professionals
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mb-6"
          style={{ letterSpacing: "-0.02em" }}
        >
          The{" "}
          <span className="text-blue-400">Verified Doctor</span>
          <br />
          Directory for Pharma
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">
          Connect pharmaceutical teams with trusted, NMC-verified doctors.
          Streamline outreach, verify credentials, and build meaningful healthcare partnerships.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {user ? (
            <button
              onClick={() => navigate("/home")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/20"
            >
              Browse Doctors →
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/20"
              >
                Create account
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-3 border border-white/15 hover:border-white/30 hover:bg-white/5 text-white rounded-xl font-semibold text-sm transition"
              >
                Sign in
              </button>
            </>
          )}
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap justify-center gap-5 mt-10 text-xs text-gray-500">
          {[
            { icon: "✓", text: "NMC registry verified" },
            { icon: "✓", text: "Admin-approved profiles" },
            { icon: "✓", text: "Role-based access" },
          ].map(({ icon, text }) => (
            <span key={text} className="flex items-center gap-1.5">
              <span className="text-blue-400 font-bold">{icon}</span>
              {text}
            </span>
          ))}
        </div>

      </main>

      {/* FEATURE CARDS */}
      <section className="relative z-10 px-6 sm:px-10 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
              ),
              title: "Verified Profiles",
              desc: "Every doctor is cross-checked against the NMC register before approval.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/>
                </svg>
              ),
              title: "Smart Search",
              desc: "Filter by specialty, state, experience and find the right doctor instantly.",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              ),
              title: "Secure Access",
              desc: "Role-based permissions for admins, doctors and pharma representatives.",
            },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white/[0.04] border border-white/8 rounded-2xl p-5 hover:bg-white/[0.07] transition"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                {icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-1.5">{title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 px-6 sm:px-10 py-5 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-600">
        <span>© 2025 MedConnect. All rights reserved.</span>
        <span>Built for verified healthcare connections.</span>
      </footer>

    </div>
  );
}

export default Welcome;