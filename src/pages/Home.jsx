import { useEffect, useState } from "react";
import doctorService from "../services/doctor.service";
import Loading from "../components/Loading";
import { getImageUrl } from "../utils/helper";
import DoctorProfileModal from "../components/DoctorProfileModal";
import { SPECIALTIES } from "../constants/app.constant";
import { useGeography } from "../context/geography-context";
import { useAuth } from "../context/auth-context";

function Home() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const { user } = useAuth();

  const [filters, setFilters] = useState({
    name: "",
    specialty: "",
    country_id: "",
    state_id: "",
    city_id: "",
    minExperience: "",
    status: "VERIFIED"
  });

  const {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities,
    fetchStates,
    fetchCities
  } = useGeography();

  const [page, setPage] = useState(1);
  const limit = 8;

  const fetchDoctorList = async (customFilters = filters) => {
    try {
      setLoading(true);
      const cleanFilters = Object.fromEntries(
        Object.entries({
          ...customFilters,
          page,
          limit,
          status: "VERIFIED"
        }).filter(([_, v]) => v !== "")
      );

      const result = await doctorService.getDoctors(cleanFilters);
      if (result) setList(result?.doctor_list || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDoctorList();
  }, [page]);

  useEffect(() => {
    if (filters.country_id) {
      fetchStates(filters.country_id);
    }
    setFilters(prev => ({ ...prev, state_id: "", city_id: "" }));
  }, [filters.country_id]);

  useEffect(() => {
    if (filters.state_id) {
      fetchCities(filters.state_id);
    }
    setFilters(prev => ({ ...prev, city_id: "" }));
  }, [filters.state_id]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  }

  const handleResetFilters = () => {
    const reset = {
      name: "",
      specialty: "",
      country_id: "",
      state_id: "",
      city_id: "",
      minExperience: ""
    };

    setFilters(reset);
    setPage(1);
    fetchDoctorList(reset);
  };

  const handleSearch = () => {
    setPage(1);
    fetchDoctorList()
  }

  const handleExportDoctors = async () => {
    setIsDownloading(true);

    try {
      const response = await doctorService.exportDoctors(filters);

      const mimeType = response.headers["content-type"] || "application/octet-stream";
      const finalMimeType = mimeType.split(";")[0].trim();

      const blob = new Blob([response.data], { type: finalMimeType });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      let filename = "doctors_export";

      const mimeToExt = {
        "application/pdf": ".pdf",
        "text/csv": ".csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx"
      };

      filename += mimeToExt[finalMimeType] || ".file";

      a.download = filename;

      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex flex-col">

      {/* HERO / SEARCH HEADER */}
      <div className="bg-[#0a1628] relative overflow-hidden rounded-xl"
        style={{
          backgroundImage: `
          linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
        `,
          backgroundSize: "48px 48px",
        }}
      >
        {/* Glow */}
        <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] rounded-full bg-blue-600/10 blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto p-6">

          {/* Heading */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium px-4 py-1.5 rounded-full mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              NMC-verified doctors only
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
              Find a <span className="text-blue-400">Verified Doctor</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
              Search across specialties, cities and experience levels. Every doctor is admin-approved.
            </p>
          </div>

          {/* Primary search bar */}
          <div className="bg-white text-black rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
            <div className="flex-1 relative">
              <input
                name="name"
                value={filters?.name || ""}
                placeholder="Doctor name..."
                onChange={handleChange}
                className="w-full pl-9 pr-4 py-2.5 text-sm focus:outline-none rounded-xl"
              />
            </div>
            <div className="w-px bg-gray-400 hidden sm:block" />
            <div className="flex-1 relative">
              <select
                name="specialty"
                value={filters?.specialty || ""}
                onChange={handleChange}
                className="w-full pl-3 pr-4 py-2.5 text-sm text-gray-800 focus:outline-none rounded-xl"
              >
                <option value="">Select specialty</option>
                {SPECIALTIES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-center gap-2">
              <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-4 py-3 rounded-xl transition font-medium"
              >
                Search
              </button>

              <button
                onClick={handleResetFilters}
                className="bg-gray-300 hover:bg-gray-400 text-black text-xs px-4 py-3 rounded-xl transition font-medium"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Secondary filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-3 max-w-2xl mx-auto">

            {/* Country */}
            <select
              name="country_id"
              value={filters.country_id}
              onChange={handleChange}
              disabled={loadingCountries}
              className="w-full sm:w-[140px] min-w-[120px] max-w-[160px] truncate bg-white/10 border border-white/10 text-white text-xs p-3 rounded-xl"
            >
              <option value="" className="text-black">Select country</option>
              {countries.map(c => (
                <option className="text-black" key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* State */}
            <select
              name="state_id"
              value={filters.state_id}
              onChange={handleChange}
              disabled={!filters.country_id || loadingStates}
              className="w-full sm:w-[140px] min-w-[120px] max-w-[160px] truncate bg-white/10 border border-white/10 text-white text-xs p-3 rounded-xl"
            >
              <option value="" className="text-black">Select state</option>
              {states.map(s => (
                <option className="text-black" key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>

            {/* City */}
            <select
              name="city_id"
              value={filters.city_id}
              onChange={handleChange}
              disabled={!filters.state_id || loadingCities}
              className="w-full sm:w-[140px] min-w-[120px] max-w-[160px] truncate bg-white/10 border border-white/10 text-white text-xs p-3 rounded-xl"
            >
              <option value="" className="text-black">Select city</option>
              {cities.map(c => (
                <option className="text-black" key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            {/* Experience */}
            <input
              name="minExperience"
              value={filters.minExperience}
              placeholder="Min exp (yrs)"
              type="number"
              onChange={handleChange}
              className="bg-white/10 border border-white/10 text-white placeholder-gray-400 text-xs p-3 rounded-xl"
            />

            <button
              onClick={handleSearch}
              className="bg-white/10 hover:bg-white/20 border border-white/10 text-gray-300 text-xs p-3 rounded-xl transition font-medium"
            >
              Apply filters
            </button>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="flex-1 max-w-6xl mx-auto w-full py-6">

        {/* Results count */}
        {!loading && (
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-500">
              {list.length === 0
                ? "No doctors found — try adjusting your filters."
                : <><span className="font-semibold text-gray-800">{list.length}</span> doctor{list.length !== 1 ? "s" : ""} found</>
              }
            </p>

            {(user && (user.role === "PHARMA" || user.role === "ADMIN")) && (<button
              onClick={handleExportDoctors}
              disabled={isDownloading || list.length === 0}
              title={"Export doctors"}
              className="px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm disabled:cursor-not-allowed disabled:bg-blue-300
                  bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isDownloading ? "Exporting..." : "Export"}
            </button>
            )}
          </div>
        )}

        {loading && <Loading message="Loading doctors..." />}

        {/* Doctor grid */}
        {!loading && list.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {list.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition duration-200 flex flex-col overflow-hidden"
              >

                {/* Card top accent */}
                <div className="h-1 w-full bg-blue-600 rounded-t-2xl" />

                <div className="p-5 flex flex-col flex-1">

                  {/* Avatar + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 overflow-hidden flex items-center justify-center shrink-0">
                      {doc.profile_image_url ? (
                        <img
                          src={getImageUrl(doc.profile_image_url)}
                          className="w-full h-full object-cover"
                          alt={doc.name}
                        />
                      ) : (
                        <span className="text-lg font-bold text-blue-400 capitalize">
                          {doc.name?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h2 className="text-sm font-semibold text-[#0a1628] truncate">{doc.name}</h2>
                        {doc.status === "VERIFIED" && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0" title="Verified">
                            <circle cx="12" cy="12" r="10" fill="#2563eb" />
                            <path d="M7 12l3 3 7-7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {doc.specialty && (
                        <p className="text-xs text-blue-600 font-medium truncate">{doc.specialty}</p>
                      )}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2 flex-1">

                    {doc.qualification && (
                      <div className="flex items-center gap-2 text-xs text-black">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300">
                          <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                        <span className="truncate">{doc.qualification}</span>
                      </div>
                    )}

                    {(doc.city_name || doc.state_name || doc.country_name) && (
                      <div className="flex items-center gap-2 text-xs text-black">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="truncate">{[doc.city_name, doc.state_name, doc.country_name].filter(Boolean).join(", ")}</span>
                      </div>
                    )}

                    {doc.experience > 0 && (
                      <div className="flex items-center gap-2 text-xs text-black">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300">
                          <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                        </svg>
                        <span>{doc.experience} yrs experience</span>
                      </div>
                    )}

                  </div>

                  {/* Action */}
                  <button
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className="mt-4 w-full border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    View Profile →
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {list.length > 0 && (
          <div className="flex justify-center items-center mt-10 gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 transition shadow-sm"
            >
              ← Prev
            </button>
            <span className="text-sm text-gray-500 font-medium">Page {page}</span>
            <button
              disabled={list.length <= limit}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium disabled:opacity-40 transition shadow-sm"
            >
              Next →
            </button>
          </div>
        )}

      </div>

      {selectedDoctorId && (
        <DoctorProfileModal
          doctorId={selectedDoctorId}
          onClose={() => setSelectedDoctorId(null)}
        />
      )}

    </div>
  );
}

export default Home;