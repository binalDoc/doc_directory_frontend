import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import adminService from "../services/admin.service";
import doctorService from "../services/doctor.service";
import Loading from "../components/Loading";
import DoctorProfileModal from "../components/DoctorProfileModal";
import BulkUploadModal from "../components/BulkUploadModal";
import { SPECIALTIES } from "../constants/app.constant";
import ImportFromNMCModal from "../components/ImportDoctorModal";
import toaster from "../components/toaster";

export const CheckIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const CrossIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const ClockIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export const SearchIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.3-4.3" />
  </svg>
);

export const EyeIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

function DoctorsList() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const [filters, setFilters] = useState({
    name: "",
    specialty: ""
  });

  const [status, setStatus] = useState("");
  const [nmc_verified, setNmcVerified] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [verifyingId, setVerifyingId] = useState(null);

  const fetchDoctors = async () => {
    try {
      setLoading(true);

      const params = {
        ...filters,
        page,
        limit,
        status,
        nmc_verified
      }
      const result = await doctorService.getDoctors(params);
      setList(result?.doctor_list || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, [page, status, nmc_verified]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = () => {
    setPage(1);
    fetchDoctors();
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await adminService.updateDoctorStatus(id, { status });
      fetchDoctors();
    } catch (err) {
      console.error(err);
    }
  };

  const handleExportDoctors = async () => {
    setIsDownloading(true);

    try {
      const cleanFilters = Object.fromEntries(
        Object.entries({
          ...filters,
          status,
          nmc_verified
        }).filter(([_, v]) => v !== "")
      );

      const response = await doctorService.exportDoctors(cleanFilters);

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

  const handleVerifyOnNMC = async (id) => {
    try {
      setVerifyingId(id);
      const result = await adminService.verifyDoctorOnNMC(id);
      if (result && result.message) toaster.success(result.message);
      fetchDoctors();
    } catch (err) {
      console.error(err);
      toaster.error(err?.response?.data?.message || "NMC verification failed");
    } finally {
      setVerifyingId(null);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-7xl mx-auto">

        <div className="flex flex-row items-center justify-between gap-2 mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Manage Doctors</h1>

          <div className="flex gap-2">
            <button
              onClick={() => setShowBulkModal(true)}
              className="w-fit inline-flex items-center gap-2 p-2 bg-white text-black border border-gray-400 rounded-xl text-sm font-medium shadow-sm transition"
            >
              Bulk Upload Doctors
            </button>

            <button
              onClick={() => setShowImportModal(true)}
              className="w-fit inline-flex items-center gap-2 p-2 bg-white text-black border border-gray-400 rounded-xl text-sm font-medium shadow-sm transition"
            >
              Import from NMC
            </button>
          </div>


        </div>

        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-sm text-blue-800">
            To verify doctor credentials, you can use the official NMC registry.
          </p>

          <a href="https://www.nmc.org.in/information-desk/indian-medical-register/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
          >
            Verify on NMC
          </a>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide items-center">
          {["", "PENDING", "VERIFIED", "REJECTED"].map((s) => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1); setNmcVerified(false) }}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition font-medium
        ${status === s
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {s || "ALL"}
            </button>
          ))}

          <button
            onClick={() => { setNmcVerified(true), setStatus("") }}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition font-medium
        ${nmc_verified
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
          >
            NMC VERIFIED
          </button>

          <button
            onClick={handleExportDoctors}
            disabled={isDownloading || list.length === 0}
            className="ml-auto px-4 py-2 bg-white text-black border border-gray-400 text-sm rounded-lg disabled:opacity-50 whitespace-nowrap"
          >
            {isDownloading ? "Exporting..." : "Export Doctors"}
          </button>
        </div>

        <div className="bg-white p-3 rounded-2xl shadow mb-6 flex flex-col sm:flex-row gap-3">
          <input
            name="name"
            placeholder="Doctor name"
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-400 outline-none text-sm"
          />
          <select
            name="specialty"
            value={filters.specialty}
            onChange={handleChange}
            className="border px-3 py-2 rounded-lg w-full text-sm"
          >
            <option value="">Select Specialty</option>
            {SPECIALTIES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            onClick={handleSearch}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm whitespace-nowrap"
          >
            <SearchIcon />
            Search
          </button>
        </div>

        {loading && <Loading message="Loading doctors..." />}

        {/* DESKTOP TABLE — hidden on mobile */}
        {!loading && (
          <>
            <div className="hidden md:block bg-white border border-gray-200 rounded-2xl shadow w-full overflow-hidden">              <div className="overflow-x-auto">
              <table className="w-full text-sm table-fixed">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th className="p-4 text-left w-[100px]">Doctor</th>
                    <th className="p-4 text-left w-[100px]">Specialty</th>
                    <th className="p-4 text-center w-[100px]">Profile</th>
                    <th className="p-4 text-center w-[120px]">Completion</th>
                    <th className="p-4 text-center w-[120px]">NMC status</th>
                    <th className="p-4 text-center w-[120px]">Status</th>
                    <th className="p-4 text-center w-[160px]">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((doc, index) => (
                    <tr
                      key={doc.id}
                      className={`border-t hover:bg-gray-50 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4 font-medium text-gray-800">{doc.name}</td>
                      <td className="p-4 font-medium text-gray-800">{doc?.specialty || "-"}</td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => setSelectedDoctorId(doc.id)}
                          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                          title="View Profile"
                        >
                          <EyeIcon />
                        </button>
                      </td>
                      <td className="p-4 text-center text-gray-600">
                        {doc?.completionPercentage || "0"}%
                      </td>
                      <td className="p-4 text-center">
                        {doc.nmc_verified ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            <CheckIcon />
                            Verified
                          </span>
                        ) : (
                          <button
                            onClick={() => handleVerifyOnNMC(doc.user_id)}
                            disabled={verifyingId === doc.user_id}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                          >
                            {verifyingId === doc.user_id ? (
                              <>
                                <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Verifying...
                              </>
                            ) : (
                              <>
                                Verify
                              </>
                            )}
                          </button>
                        )}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                          ${doc.status === "VERIFIED" ? "bg-green-100 text-green-700"
                            : doc.status === "PENDING" ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"}`}
                        >
                          {doc.status === "VERIFIED" && <CheckIcon />}
                          {doc.status === "PENDING" && <ClockIcon />}
                          {doc.status === "REJECTED" && <CrossIcon />}
                          {doc.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          {doc.status !== "VERIFIED" && (
                            <button
                              disabled={!doc.nmc_verified}
                              onClick={() => handleUpdateStatus(doc.id, "VERIFIED")}
                              title={!doc.nmc_verified ? "Sould be NMC verified to approve" : ""}
                              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs
                                ${doc.nmc_verified
                                  ? "bg-green-600 text-white hover:bg-green-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                              <CheckIcon />
                              Approve
                            </button>
                          )}
                          {doc.status !== "REJECTED" && (
                            <button
                              onClick={() => handleUpdateStatus(doc.id, "REJECTED")}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs"
                            >
                              <CrossIcon />
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

              {list.length === 0 && (
                <div className="p-10 text-center text-gray-500">No doctors found</div>
              )}
            </div>

            {/* MOBILE CARDS — shown only on mobile */}
            <div className="md:hidden flex flex-col gap-3">
              {list.length === 0 && (
                <div className="p-10 text-center text-gray-500 bg-white rounded-2xl shadow">
                  No doctors found
                </div>
              )}
              {list.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl shadow border border-gray-100 p-4 flex flex-col gap-3">

                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-500">{doc.email}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium shrink-0
                    ${doc.status === "VERIFIED" ? "bg-green-100 text-green-700"
                        : doc.status === "PENDING" ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"}`}
                    >
                      {doc.status === "VERIFIED" && <CheckIcon />}
                      {doc.status === "PENDING" && <ClockIcon />}
                      {doc.status === "REJECTED" && <CrossIcon />}
                      {doc.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                    <span><span className="font-medium text-gray-700">Specialty:</span> {doc?.specialty || "-"}</span>
                    <span><span className="font-medium text-gray-700">State:</span> {doc?.state || "-"}</span>
                    <span><span className="font-medium text-gray-700">Completion:</span> {doc?.completionPercentage || "0"}%</span>
                    <span className="flex items-center gap-1">
                      <span className="font-medium text-gray-700">NMC status:</span>

                      {doc.nmc_verified ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          <CheckIcon />
                          Verified
                        </span>
                      ) : (
                        <button
                          onClick={() => handleVerifyOnNMC(doc.user_id)}
                          disabled={verifyingId === doc.user_id}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-700 text-white hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
                        >
                          {verifyingId === doc.user_id ? (
                            <>
                              <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                              </svg>
                              Verifying...
                            </>
                          ) : (
                            <>
                              Verify
                            </>
                          )}
                        </button>
                      )}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-1 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedDoctorId(doc.id)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs text-gray-700"
                    >
                      <EyeIcon size={13} />
                      View
                    </button>
                    {doc.status !== "VERIFIED" && (
                      <button
                        onClick={() => handleUpdateStatus(doc.id, "VERIFIED")}
                        disabled={!doc.nmc_verified}
                        title={!doc.nmc_verified ? "Should be NMC verified to approve" : ""}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs
                                ${doc.nmc_verified
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                      >
                        <CheckIcon />
                        Approve
                      </button>
                    )}
                    {doc.status !== "REJECTED" && (
                      <button
                        onClick={() => handleUpdateStatus(doc.id, "REJECTED")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 text-xs"
                      >
                        <CrossIcon />
                        Reject
                      </button>
                    )}
                  </div>

                </div>
              ))}
            </div>
          </>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-gray-300 transition"
          >
            ← Prev
          </button>
          <span className="text-gray-600 font-medium text-sm">Page {page}</span>
          <button
            disabled={list.length < limit}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 text-sm font-medium hover:bg-blue-700 transition"
          >
            Next →
          </button>
        </div>

        {showBulkModal && (
          <BulkUploadModal
            onClose={() => setShowBulkModal(false)}
            onSuccess={fetchDoctors}
          />
        )}

        {selectedDoctorId && (
          <DoctorProfileModal
            doctorId={selectedDoctorId}
            onClose={() => setSelectedDoctorId(null)}
            CrossIcon={CrossIcon}
          />
        )}

        {showImportModal && (
          <ImportFromNMCModal
            onClose={() => setShowImportModal(false)}
            onSuccess={fetchDoctors}
          />
        )}

      </div>
    </AdminLayout>
  );

}

export default DoctorsList;