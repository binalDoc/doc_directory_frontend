import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";

function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-white border-b mt-16 p-4 sticky top-0 z-50">

        <div className="flex gap-2 overflow-x-auto items-center">
          {[
            { label: "Dashboard", path: "/admin" },
            { label: "Doctors", path: "/admin/doctors" },
            { label: "Users", path: "/admin/users" },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="text-xs px-3 py-1.5 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 whitespace-nowrap transition"
            >
              {item.label}
            </button>
          ))}

          {/* LOGOUT */}
          <button
            onClick={logout}
            className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 whitespace-nowrap"
          >
            Logout
          </button>
        </div>
      </div>

      {/* TABLET SIDEBAR */}
      <div className="hidden md:flex lg:hidden flex-col justify-between items-center w-16 bg-white border-r mt-16 px-4">

        <div className="flex flex-col items-center gap-5">
          {[
            {
              path: "/admin",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12l2-2 7-7 7 7 2 2M5 10v10h14V10" />
                </svg>
              ),
            },
            {
              path: "/admin/doctors",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
                </svg>
              ),
            },
            {
              path: "/admin/users",
              icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857" />
                  <path d="M7 20H2v-2a3 3 0 015.356-1.857" />
                  <circle cx="12" cy="8" r="4" />
                </svg>
              ),
            },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {item.icon}
            </button>
          ))}
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-red-500 hover:bg-red-50 transition"
          title="Logout"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path d="M7 16v1a2 2 0 002 2h6" />
            <path d="M7 8V7a2 2 0 012-2h6" />
          </svg>
        </button>
      </div>

      {/* DESKTOP SIDEBAR */}
      <div className="hidden lg:flex flex-col justify-between w-64 bg-white border-r mt-16 px-4">

        <div>

          <div className="flex flex-col gap-2">
            {[
              {
                label: "Dashboard",
                path: "/admin",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12l2-2 7-7 7 7 2 2M5 10v10h14V10" />
                  </svg>
                ),
              },
              {
                label: "Doctors",
                path: "/admin/doctors",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
                  </svg>
                ),
              },
              {
                label: "Users",
                path: "/admin/users",
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857" />
                    <path d="M7 20H2v-2a3 3 0 015.356-1.857" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                ),
              },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
            <path d="M7 16v1a2 2 0 002 2h6" />
            <path d="M7 8V7a2 2 0 012-2h6" />
          </svg>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </>
  );
}

export default AdminSidebar;