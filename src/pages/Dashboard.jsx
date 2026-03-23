import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminService from "../services/admin.service";
import Loading from "../components/Loading";

/* ---------------- ICONS ---------------- */

const UsersIcon = () => (
  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-3-3.87M7 21v-2a4 4 0 0 1 3-3.87M12 7a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

/* ---------------- STAT CARD ---------------- */

function StatCard({ label, value, color, loading, Icon }) {
  const colorMap = {
    blue: { text: "text-blue-700", iconBg: "bg-blue-100" },
    yellow: { text: "text-yellow-700", iconBg: "bg-yellow-100" },
    green: { text: "text-green-700", iconBg: "bg-green-100" },
    red: { text: "text-red-700", iconBg: "bg-red-100" },
  };

  const c = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition flex items-center justify-between">
      
      {/* LEFT */}
      <div>
        <p className="text-sm text-gray-500">{label}</p>

        {loading ? (
          <div className="h-8 w-16 bg-gray-100 rounded animate-pulse mt-2" />
        ) : (
          <h2 className={`text-3xl font-bold mt-1 ${c.text}`}>
            {value ?? 0}
          </h2>
        )}
      </div>

      {/* RIGHT ICON */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.iconBg}`}>
        {Icon}
      </div>
    </div>
  );
}

/* ---------------- DASHBOARD ---------------- */

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchDoctorStats = async () => {
    try {
      setLoading(true);
      const res = await adminService.getDoctorStatusCounts();
      setStats(res || {});
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorStats();
  }, []);

  return (
    <AdminLayout>
      {loading && <Loading message="Loading..." />}

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of doctor verification status
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
        <StatCard label="Total Doctors" value={stats?.ALL} color="blue" loading={loading} Icon={<UsersIcon />} />
        <StatCard label="Pending" value={stats?.PENDING} color="yellow" loading={loading} Icon={<ClockIcon />} />
        <StatCard label="Verified" value={stats?.VERIFIED} color="green" loading={loading} Icon={<CheckIcon />} />
        <StatCard label="Rejected" value={stats?.REJECTED} color="red" loading={loading} Icon={<CrossIcon />} />
      </div>

      {/* SUMMARY */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6">
          Verification Breakdown
        </h3>

        <div className="space-y-4">
          {[
            { label: "Verified", value: stats?.VERIFIED, total: stats?.ALL, color: "bg-green-500" },
            { label: "Pending", value: stats?.PENDING, total: stats?.ALL, color: "bg-yellow-500" },
            { label: "Rejected", value: stats?.REJECTED, total: stats?.ALL, color: "bg-red-500" },
          ].map(({ label, value, total, color }) => {
            const pct = total ? Math.round(((value || 0) / total) * 100) : 0;

            return (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-medium">{pct}%</span>
                </div>

                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`${color} h-full rounded-full transition-all duration-700`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Dashboard;