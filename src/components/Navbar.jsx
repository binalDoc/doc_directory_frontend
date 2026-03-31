import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { getImageUrl } from "../utils/helper";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

   return (
  <div className="w-full bg-white border-b border-gray-100 shadow-sm px-6 sm:px-10 py-4 flex justify-between items-center fixed top-0 left-0 z-50">

    {/* Logo */}
    <div
      className="flex items-center gap-2.5 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      </div>
      <span className="font-bold text-[#0a1628] text-lg tracking-wide">DocDirectory</span>
    </div>

    {/* Right side */}
    {user && <div className="flex items-center gap-3">

      {/* Admin panel button */}
      {user?.role === "ADMIN" && (
        <button
          onClick={() => navigate("/admin")}
          className="flex items-center gap-2 bg-[#0a1628] hover:bg-[#0f2040] text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
          </svg>
          <span className="hidden sm:inline">Admin Panel</span>
        </button>
      )}

      {/* Profile avatar */}
      {(user?.role === "DOCTOR" || user?.role === "PHARMA") && (
        <div
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="My Profile"
        >
          <div className="w-8 h-8 rounded-xl overflow-hidden border border-gray-200 group-hover:border-blue-400 transition">
            {user?.profile_image_url ? (
              <img
                src={getImageUrl(user?.profile_image_url)}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex items-center justify-center text-sm font-semibold text-blue-500 capitalize">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>
          <span className="hidden md:inline text-sm text-gray-600 group-hover:text-blue-600 font-medium transition truncate max-w-[100px]">
            {user?.name}
          </span>
        </div>
      )}

      {/* Divider */}
      <div className="w-px h-5 bg-gray-200" />

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-500 transition font-medium"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"/>
        </svg>
        <span className="hidden sm:inline">Logout</span>
      </button>

    </div>}
  </div>
);
}

export default Navbar;