import { useState } from "react";
import adminService from "../services/admin.service";
import toaster from "../components/toaster";

function ImportFromNMCModal({ onClose, onSuccess }) {
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImport = async () => {
    setError("");

    if (!year) {
      setError("Registration year is required");
      return;
    }

    if (year < 1950 || year > new Date().getFullYear()) {
      setError("Enter a valid registration year");
      return;
    }

    if (!limit || limit < 1 || limit > 5) {
      setError("Limit must be between 1 and 5");
      return;
    }

    try {
      setLoading(true);

      const res = await adminService.importDoctorsFromNMC({
        year: Number(year),
        limit: Number(limit)
      });

      console.log(res)

      if (res.failedCount === 0) {
        toaster.success(`Successfully imported ${res.successCount} doctors`);
      } else if (res.successCount > 0) {
        toaster.success(`${res.successCount} imported, ${res.failedCount} failed`);
      } else {
        toaster.error("All imports failed");
      }

      onSuccess();
      onClose();

    } catch (err) {
      const message =
        err?.response?.data?.message || "Import failed";

      setError(message);
      toaster.error(message);

    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-modal">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-800">
            Import from NMC
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Fetch doctors directly from NMC registry
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">

          {/* Year */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Registration Year
            </label>
            <input
              type="number"
              placeholder="e.g. 2006"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Limit */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">
              Number of Records
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={limit}
              onChange={(e) =>
                setLimit(Math.min(5, Math.max(1, Number(e.target.value))))
              }
              className="border px-3 py-2 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 border border-blue-100">
            <span>ℹ️</span>
            <p className="text-xs text-blue-700">
              You can import <strong>maximum 5 doctors per day</strong>.
              This action is allowed <strong>only once per day</strong>.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="text-xs text-red-500 bg-red-50 border border-red-100 p-2 rounded-lg">
              {error}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleImport}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Importing..." : "Import"}
          </button>
        </div>

      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal { animation: modal-in 0.2s ease both; }
      `}</style>
    </div>
  );
}

export default ImportFromNMCModal;