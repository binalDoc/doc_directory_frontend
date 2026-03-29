import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminService from "../services/admin.service";
import Loading from "../components/Loading";
import { getIndianTime } from "../utils/helper";
 
const MiniBarChart = ({ data }) => {
  if (!data?.length) return <div className="text-xs text-gray-500">No data</div>;
  const max = Math.max(...data.map((d) => Number(d.count)));
  return (
    <div className="flex items-end gap-0.5 h-12">
      {data.map((d, i) => (
        <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full">
          <div
            className="w-full bg-blue-500/60 hover:bg-blue-400 rounded-sm transition-all"
            style={{ height: `${Math.max(4, (Number(d.count) / max) * 100)}%` }}
          />
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
            {d.date}: {d.count}
          </div>
        </div>
      ))}
    </div>
  );
};
 
// ── Horizontal bar (for top terms) ───────────────────────────────────────────
const TopTermBar = ({ term, count, max, color = "bg-blue-500" }) => (
  <div className="flex items-center gap-3">
    <div className="w-28 text-xs text-gray-300 truncate shrink-0">{term}</div>
    <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
      <div
        className={`h-2 rounded-full ${color} transition-all duration-500`}
        style={{ width: `${Math.max(4, (count / max) * 100)}%` }}
      />
    </div>
    <div className="text-xs text-gray-400 w-8 text-right">{count}</div>
  </div>
);
 
// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, accent = "text-blue-400" }) => (
  <div className="bg-white/3 border border-white/8 rounded-2xl p-5 flex flex-col gap-1">
    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">{label}</p>
    <p className={`text-3xl font-bold ${accent}`}>{value ?? "—"}</p>
    {sub && <p className="text-xs text-gray-500">{sub}</p>}
  </div>
);
 
// ── Main Page ─────────────────────────────────────────────────────────────────
function SearchAnalytics() {
  const [summary, setSummary] = useState(null);
  const [topTerms, setTopTerms] = useState(null);
  const [recent, setRecent] = useState([]);
  const [trend, setTrend] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [days, setDays] = useState(14);
  const [loading, setLoading] = useState(true);
  const limit = 15;
 
  useEffect(() => {
    fetchAll();
  }, []);
 
  useEffect(() => {
    fetchTrend();
  }, [days]);
 
  useEffect(() => {
    fetchRecent();
  }, [page]);
 
  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, t] = await Promise.all([
        adminService.getSearchAnalyticsSummary(),
        adminService.getTopSearchTerms(8),
      ]);
      setSummary(s);
      setTopTerms(t);
      await Promise.all([fetchRecent(), fetchTrend()]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
 
  const fetchRecent = async () => {
    try {
      const data = await adminService.getRecentSearches({page, limit});
      setRecent(data?.searches || []);
      setTotal(data?.total || 0);
    } catch (err) {
      console.error(err);
    }
  };
 
  const fetchTrend = async () => {
    try {
      const data = await adminService.getSearchesByDate({days});
      setTrend(data || []);
    } catch (err) {
      console.error(err);
    }
  };
 
  const formatDate = (ts) => ts ? getIndianTime(ts) : "—";
 
  const maxSpec = topTerms?.top_specialties?.[0]?.count || 1;
  const maxName = topTerms?.top_names?.[0]?.count || 1;
  const maxCity = topTerms?.top_cities?.[0]?.count || 1;
 
  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto space-y-6">
 
        {/* ── Header ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Search Analytics</h1>
            <p className="text-sm text-gray-500 mt-0.5">What users are searching on the platform</p>
          </div>
        </div>
 
        {loading && <Loading message="Loading analytics..." />}
 
        {!loading && (
          <>
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Total Searches</p>
                <p className="text-3xl font-bold text-blue-600">{Number(summary?.total_searches || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-400">all time</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Unique Searchers</p>
                <p className="text-3xl font-bold text-violet-500">{Number(summary?.unique_searchers || 0).toLocaleString()}</p>
                <p className="text-xs text-gray-400">distinct users</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Top Specialty</p>
                <p className="text-xl font-bold text-emerald-600 truncate">{summary?.top_specialty || "—"}</p>
                <p className="text-xs text-gray-400">most searched</p>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5 flex flex-col gap-1">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-medium">Most Active Day</p>
                <p className="text-lg font-bold text-amber-500">{summary?.most_active_day || "—"}</p>
                <p className="text-xs text-gray-400">peak search day</p>
              </div>
            </div>
 
            {/* ── Search Type Breakdown ── */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "By Name", value: summary?.name_searches, color: "bg-blue-50 border-blue-100", text: "text-blue-600" },
                { label: "By Specialty", value: summary?.specialty_searches, color: "bg-emerald-50 border-emerald-100", text: "text-emerald-600" },
                { label: "By Location", value: summary?.location_searches, color: "bg-amber-50 border-amber-100", text: "text-amber-600" },
              ].map((item, i) => (
                <div key={i} className={`rounded-2xl border p-4 ${item.color}`}>
                  <p className="text-xs text-gray-500 font-medium mb-1">{item.label}</p>
                  <p className={`text-2xl font-bold ${item.text}`}>{Number(item.value || 0).toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-1">searches</p>
                </div>
              ))}
            </div>
 
            {/* ── Trend Chart + Top Terms ── */}
            <div className="grid md:grid-cols-2 gap-5">
 
              {/* Trend */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-gray-700">Search Trend</h2>
                  <div className="flex gap-1">
                    {[7, 14, 30].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDays(d)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition ${days === d ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                      >
                        {d}d
                      </button>
                    ))}
                  </div>
                </div>
                {trend.length > 0 ? (
                  <>
                    {/* Bar chart */}
                    <div className="flex items-end gap-0.5 h-28 mb-2">
                      {(() => {
                        const max = Math.max(...trend.map((d) => Number(d.count)));
                        return trend.map((d, i) => (
                          <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full">
                            <div
                              className="w-full bg-blue-500 hover:bg-blue-400 rounded-t transition-all"
                              style={{ height: `${Math.max(4, (Number(d.count) / max) * 100)}%` }}
                            />
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                              {d.date}: {d.count}
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                    <div className="flex justify-between text-[10px] text-gray-400">
                      <span>{getIndianTime(trend[0]?.date)}</span>
                      <span>{getIndianTime(trend[trend.length - 1]?.date)}</span>
                    </div>
                  </>
                ) : (
                  <div className="h-28 flex items-center justify-center text-sm text-gray-400">No data for this period</div>
                )}
              </div>
 
              {/* Top Specialties */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Specialties Searched</h2>
                <div className="space-y-3">
                  {topTerms?.top_specialties?.length > 0 ? topTerms.top_specialties.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
                      <div className="w-28 text-xs text-gray-700 font-medium truncate shrink-0">{item.term}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${Math.max(4, (item.count / maxSpec) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{item.count}</span>
                    </div>
                  )) : <p className="text-sm text-gray-400">No data yet</p>}
                </div>
              </div>
 
            </div>
 
            {/* ── Top Names + Top Locations ── */}
            <div className="grid md:grid-cols-2 gap-5">
 
              {/* Top Names */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Names Searched</h2>
                <div className="space-y-3">
                  {topTerms?.top_names?.length > 0 ? topTerms.top_names.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
                      <div className="w-28 text-xs text-gray-700 font-medium truncate shrink-0">{item.term}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${Math.max(4, (item.count / maxName) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{item.count}</span>
                    </div>
                  )) : <p className="text-sm text-gray-400">No data yet</p>}
                </div>
              </div>
 
              {/* Top Cities */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
                <h2 className="text-sm font-semibold text-gray-700 mb-4">Top Cities Searched</h2>
                <div className="space-y-3">
                  {topTerms?.top_cities?.length > 0 ? topTerms.top_cities.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-4 shrink-0">{i + 1}</span>
                      <div className="w-28 text-xs text-gray-700 font-medium truncate shrink-0">{item.term}</div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div className="h-2 rounded-full bg-amber-500 transition-all duration-500"
                          style={{ width: `${Math.max(4, (item.count / maxCity) * 100)}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-8 text-right">{item.count}</span>
                    </div>
                  )) : <p className="text-sm text-gray-400">No data yet</p>}
                </div>
              </div>
 
            </div>
 
            {/* ── Recent Searches Log ── */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="text-sm font-semibold text-gray-700">Recent Search Log</h2>
                <p className="text-xs text-gray-400 mt-0.5">{total.toLocaleString()} total searches</p>
              </div>
 
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Searched By", "Role", "Name Query", "Specialty", "City", "State", "Country", "Searched At"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {recent.length === 0 ? (
                      <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-400 text-sm">No searches yet</td></tr>
                    ) : recent.map((s, i) => (
                      <tr key={i} className="hover:bg-gray-50/60 transition">
                        <td className="px-4 py-3 text-gray-700 font-medium">{s.searched_by || "—"}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium
                            ${s.user_role === "PHARMA" ? "bg-cyan-100 text-cyan-700"
                              : s.user_role === "DOCTOR" ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"}`}>
                            {s.user_role || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{s.name || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 text-gray-600">{s.specialty || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 text-gray-600">{s.city || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 text-gray-600">{s.state || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 text-gray-600">{s.country || <span className="text-gray-300">—</span>}</td>
                        <td className="px-4 py-3 text-xs text-gray-400">{formatDate(s.searched_at)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
 
              {/* Mobile cards */}
              <div className="md:hidden divide-y divide-gray-100">
                {recent.map((s, i) => (
                  <div key={i} className="p-4 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{s.searched_by || "Anonymous"}</span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium
                        ${s.user_role === "PHARMA" ? "bg-cyan-100 text-cyan-700" : "bg-blue-100 text-blue-700"}`}>
                        {s.user_role}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                      {s.name && <span><span className="font-medium text-gray-600">Name:</span> {s.name}</span>}
                      {s.specialty && <span><span className="font-medium text-gray-600">Specialty:</span> {s.specialty}</span>}
                      {s.city && <span><span className="font-medium text-gray-600">City:</span> {s.city}</span>}
                      {s.state && <span><span className="font-medium text-gray-600">State:</span> {s.state}</span>}
                    </div>
                    <p className="text-[11px] text-gray-400">{formatDate(s.searched_at)}</p>
                  </div>
                ))}
              </div>
 
              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 px-5 py-4 border-t border-gray-100">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-1.5 bg-gray-100 rounded-lg text-sm disabled:opacity-40 hover:bg-gray-200 transition font-medium"
                >
                  ← Prev
                </button>
                <span className="text-sm text-gray-500">
                  Page {page} of {Math.ceil(total / limit) || 1}
                </span>
                <button
                  disabled={page >= Math.ceil(total / limit)}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm disabled:opacity-40 hover:bg-blue-700 transition font-medium"
                >
                  Next →
                </button>
              </div>
            </div>
 
          </>
        )}
      </div>
    </AdminLayout>
  );
}
 
export default SearchAnalytics;