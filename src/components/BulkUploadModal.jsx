import { useState, useRef } from "react";
import adminService from "../services/admin.service";
import toaster from "../components/toaster";

function BulkUploadModal({ onClose, onSuccess }) {
    const [file, setFile] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState(null); // holds upload result after completion
    const fileInputRef = useRef(null);

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped && (dropped.name.endsWith(".xlsx") || dropped.name.endsWith(".xls"))) {
            setFile(dropped);
        } else {
            toaster.error("Only .xlsx or .xls files are accepted");
        }
    };

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) setFile(selected);
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleUpload = async () => {
        if (!file) return;
        try {
            setUploading(true);
            const response = await adminService.uploadBulkDoctors(file);
            setResult(response); // show result summary in modal
            if (response.failedCount === 0) {
                toaster.success(`All ${response.successCount} doctors uploaded successfully`);
            } else if (response.successCount > 0) {
                toaster.success(`${response.successCount} uploaded, ${response.failedCount} failed`);
            } else {
                toaster.error("All rows failed to upload");
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            toaster.error("Upload failed. Please check the file format.");
        } finally {
            setUploading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const formatSize = (bytes) => {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const ResultView = () => {
        const allSuccess = result.failedCount === 0;
        const allFailed = result.successCount === 0;

        return (
            <div className="flex flex-col gap-4">

                {/* Summary Cards */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-green-50 border border-green-100">
                        <span className="text-2xl font-bold text-green-600">{result.successCount}</span>
                        <span className="text-xs text-green-700 font-medium">Uploaded</span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-red-50 border border-red-100">
                        <span className="text-2xl font-bold text-red-500">{result.failedCount}</span>
                        <span className="text-xs text-red-600 font-medium">Failed</span>
                    </div>
                </div>

                {/* Status message */}
                {allSuccess && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                        <svg className="text-green-500 shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <p className="text-xs text-green-700 font-medium">All doctors were uploaded successfully.</p>
                    </div>
                )}

                {allFailed && (
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                        <svg className="text-red-500 shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p className="text-xs text-red-600 font-medium">All rows failed. Please fix errors and re-upload.</p>
                    </div>
                )}

                {/* Failed rows table */}
                {result.failed?.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Failed Rows</p>
                        <div className="max-h-44 overflow-y-auto rounded-xl border border-red-100 divide-y divide-red-50">
                            {result.failed.map((item, idx) => (
                                <div key={idx} className="flex items-start justify-between gap-3 px-3 py-2.5 bg-red-50/60 hover:bg-red-50 transition">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="text-xs font-medium text-red-400 shrink-0">Row {item.row}</span>
                                        <span className="text-xs text-gray-600 truncate">{item.email || "—"}</span>
                                    </div>
                                    <span className="text-xs text-red-500 shrink-0 text-right max-w-[140px]">{item.error}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
        >
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-modal">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div>
                        <h2 className="text-lg font-bold text-gray-800">
                            {result ? "Upload Results" : "Bulk Doctor Upload"}
                        </h2>
                        <p className="text-xs text-gray-500 mt-0.5">
                            {result ? result.message : "Import multiple doctors via Excel file"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
                    >
                        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-5 flex flex-col gap-4">
                    {result ? (
                        <ResultView />
                    ) : (
                        <>
                            {/* Drop zone */}
                            <div
                                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                onDragLeave={() => setDragging(false)}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all
                                    ${dragging
                                        ? "border-blue-500 bg-blue-50 scale-[1.01]"
                                        : file
                                            ? "border-green-400 bg-green-50"
                                            : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/50"
                                    }`}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".xlsx,.xls"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                {file ? (
                                    <>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-gray-800 truncate max-w-[220px]">{file.name}</p>
                                            <p className="text-xs text-gray-400 mt-1">{formatSize(file.size)}</p>
                                        </div>
                                        <button
                                            onClick={handleRemoveFile}
                                            className="text-xs text-red-500 hover:text-red-600 underline"
                                        >
                                            Remove file
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="text-center">
                                            <p className="text-sm font-semibold text-gray-700">Drop your file here</p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                or <span className="text-blue-500 underline">browse to upload</span>
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-400">Supports .xlsx, .xls</p>
                                    </>
                                )}
                            </div>

                            {/* Template hint */}
                            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 border border-amber-100">
                                <span className="text-amber-500 mt-0.5">💡</span>
                                <p className="text-xs text-amber-700">
                                    Make sure your file follows the required template format with columns: <strong>name, email, password, specialty, country_id, city_id, state_id, experience, registration_number, registration_year</strong>.
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                    {result ? (
                        <>
                            {result.failedCount > 0 && (
                                <button
                                    onClick={handleReset}
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                                >
                                    Upload Again
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition"
                            >
                                Done
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpload}
                                disabled={!file || uploading}
                                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                            >
                                {uploading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Uploading...
                                    </>
                                ) : (
                                    <>Upload Doctors</>
                                )}
                            </button>
                        </>
                    )}
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

export default BulkUploadModal;