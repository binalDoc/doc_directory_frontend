import { useEffect, useState } from "react";
import doctorService from "../services/doctor.service";
import { getImageUrl } from "../utils/helper";

function DoctorProfileModal({ doctorId, onClose }) {
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDoctor = async () => {
        try {
            setLoading(true);
            const result = await doctorService.getDoctorProfileById(doctorId);
            setDoctor(result);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (doctorId) fetchDoctor();
    }, [doctorId]);

    return (
        <div className="fixed inset-0 bg-[#0a1628]/60 backdrop-blur-sm flex justify-center items-center z-50 px-4 py-6">
            {/* MODAL */}
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl relative h-[90vh] flex flex-col overflow-hidden">
                {/* CLOSE */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition text-sm z-20"
                >
                    ✕
                </button>

                {/* LOADING */}
                {loading && (
                    <div className="flex items-center justify-center py-16 text-gray-400 text-sm gap-2">
                        <span className="w-4 h-4 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
                        Loading profile...
                    </div>
                )}

                {!loading && doctor && (
                    <>
                        {/* HEADER (STICKY) */}
                        <div
                            className="bg-[#0a1628] px-6 py-7 relative overflow-hidden shrink-0"
                            style={{
                                backgroundImage: `
                  linear-gradient(rgba(59,130,246,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59,130,246,0.06) 1px, transparent 1px)
                `,
                                backgroundSize: "48px 48px",
                            }}
                        >
                            {/* Glow */}
                            <div className="absolute top-[-40px] right-[-40px] w-[180px] h-[180px] rounded-full bg-blue-600/15 blur-[60px]" />

                            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-5">

                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-2xl bg-blue-900/50 border border-blue-700/30 overflow-hidden flex items-center justify-center shrink-0">
                                    {doctor.profile_image_url ? (
                                        <img
                                            src={getImageUrl(doctor.profile_image_url)}
                                            className="w-full h-full object-cover"
                                            alt={doctor.name}
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-blue-300 capitalize">
                                            {doctor.name?.charAt(0)}
                                        </span>
                                    )}
                                </div>

                                {/* Name */}
                                <div className="text-center sm:text-left flex-1">
                                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                                        <h2 className="text-lg font-bold text-white">
                                            {doctor.name}
                                        </h2>

                                        {doctor.status === "VERIFIED" && (
                                            <span className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                ✓ Verified
                                            </span>
                                        )}
                                    </div>

                                    {doctor.specialty && (
                                        <p className="text-blue-300 text-sm mt-1">
                                            {doctor.specialty}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-xs text-gray-400">
                                        {(doctor.city_name || doctor.state_name || doctor.country_name) && (
                                            <span>
                                                {[doctor.city_name, doctor.state_name, doctor.country_name]
                                                    .filter(Boolean)
                                                    .join(", ")}
                                            </span>
                                        )}

                                        {doctor.experience > 0 && (
                                            <span>{doctor.experience} yrs experience</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BODY (SCROLLABLE) */}
                        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5 min-h-0">

                            {/* Professional Details */}
                            <div>
                                <h3 className="text-xs font-semibold uppercase text-gray-400 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-3.5 bg-blue-600 rounded-full" />
                                    Professional Details
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {[
                                        { label: "Qualification", value: doctor.qualification },
                                        { label: "Hospital", value: doctor.hospital },
                                        { label: "Registration number", value: doctor.registration_number },
                                        { label: "Registration year", value: doctor.registration_year },
                                        { label: "State medical council", value: doctor.state_medical_council },
                                    ]
                                        .filter((item) => item.value)
                                        .map(({ label, value }) => (
                                            <div
                                                key={label}
                                                className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3"
                                            >
                                                <p className="text-xs text-gray-400">{label}</p>
                                                <p className="text-sm font-medium text-[#0a1628]">
                                                    {value}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </div>

                            {/* Bio */}
                            {doctor.bio && (
                                <div>
                                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-3 flex items-center gap-2">
                                        <span className="w-1 h-3.5 bg-blue-600 rounded-full" />
                                        About
                                    </h3>

                                    <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4">
                                        <p className="text-sm text-gray-600 whitespace-pre-wrap">
                                            {doctor.bio}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="px-6 py-4 shrink-0 bg-white border-t border-gray-100">
                            <button
                                onClick={onClose}
                                className="w-full py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
                            >
                                Close
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DoctorProfileModal;