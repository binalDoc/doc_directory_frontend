import { useAuth } from "../context/auth-context";
import pharmaService from "../services/pharma.service";
import doctorService from "../services/doctor.service";
import { useEffect, useState } from "react";
import toaster from "../components/toaster";
import Loading from "../components/Loading";
import { STATE_LIST, MSD_STATE_COUNCILS, YEARS } from "../constants/app.constant";
import { getImageUrl } from "../utils/helper";

function Profile() {
    const { user, login } = useAuth();

    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [profileSave, setProfileSave] = useState(false);
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            setLoading(true);
            let result = null;
            if (user?.role === "DOCTOR") result = await doctorService.getDoctorProfile();
            else if (user?.role === "PHARMA") result = await pharmaService.getPharmaprofile();

            if (result) {
                setProfile({ ...user, ...result });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "state") {
            setProfile({
                ...profile,
                state: value,
                city: ""
            });
        } else {
            setProfile({
                ...profile,
                [name]: value
            });
        }
    };
    const selectedState = STATE_LIST.find(
        (s) => s.name === profile.state
    );

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", file);

            const result = await doctorService.uploadDoctorImage(formData);
            if (result) {
                setProfile({ ...profile, ...result });
                login({ ...profile, ...result });
                toaster.success("Profile image added!")
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("")

        try {
            setProfileSave(true);
            let res = null;
            if (user.role === "DOCTOR") {
                res = await doctorService.updateDoctorProfile(profile);
            } else if (user.role === "PHARMA") {
                res = await pharmaService.updatePharmaProfile(profile);
            }

            if (res.result) {
                login(res.result);
                toaster.success("Profile updated successfully!");
            }

            setProfileSave(false);
            setEditMode(false);
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
            setProfileSave(false);
            setEditMode(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex flex-col">

            <a href="/home"
                className="flex items-center w-fit text-sm hover:text-blue-600 transition font-medium p-4 gap-1.5"
            >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to home
            </a>

            {/* LOADING */}
            {
                loading && (
                    <div className="flex-1 flex items-center justify-center">
                        <Loading message="Loading profile..." />
                    </div>
                )
            }

            {
                !loading && profile && (
                    <main className="flex-1 max-w-4xl mx-auto w-full p-4">

                        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-2">
                            <div>
                                <h1 className="text-2xl font-bold text-[#0a1628]">My Profile</h1>
                                <p className="text-sm text-gray-400 mt-0.5">
                                    {editMode ? "Make changes and save when ready." : "View and manage your account details."}
                                </p>
                            </div>
                            <div>
                                {!editMode ? (
                                    <button
                                        onClick={() => setEditMode(true)}
                                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm"
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Edit profile
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setEditMode(false)}
                                            className="px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleUpdate}
                                            disabled={profileSave}
                                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm
                    ${profileSave ? "bg-green-400 text-white cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"}`}
                                        >
                                            {profileSave ? (
                                                <>
                                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    Saving...
                                                </>
                                            ) : (
                                                <>
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                                                    </svg>
                                                    Save changes
                                                </>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {error && (
                            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">
                                <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {profile?.role === "DOCTOR" && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">

                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 overflow-hidden flex items-center justify-center shrink-0">
                                        {profile.profile_image_url ? (
                                            <img
                                                src={getImageUrl(profile?.profile_image_url)}
                                                alt="profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-2xl font-bold text-blue-400 capitalize">
                                                {profile.name?.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[#0a1628]">{profile.name}</p>
                                        <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
                                        {profile.status === "VERIFIED" && (
                                            <span className="inline-flex items-center gap-1 mt-1.5 bg-green-50 border border-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                Verified Doctor
                                            </span>
                                        )}
                                        {profile.status === "PENDING" && (
                                            <span className="inline-flex items-center gap-1 mt-1.5 bg-yellow-50 border border-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                Pending verification
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="hidden sm:block w-px h-14 bg-gray-100" />

                                {/* Completion */}
                                <div className="flex-1 w-full sm:w-auto">
                                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                                        <span className="font-medium">Profile completion</span>
                                        <span className="font-semibold text-[#0a1628]">{profile?.completionPercentage || 0}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-500 ${(profile?.completionPercentage || 0) === 100
                                                ? "bg-green-500"
                                                : (profile?.completionPercentage || 0) >= 60
                                                    ? "bg-blue-500"
                                                    : "bg-yellow-400"
                                                }`}
                                            style={{ width: `${profile?.completionPercentage || 0}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1.5">
                                        {(profile?.completionPercentage || 0) < 100
                                            ? "Complete your profile to improve visibility to pharma teams."
                                            : "Your profile is complete!"}
                                    </p>
                                </div>

                                {/* Image upload */}
                                {editMode && (
                                    <div className="w-full sm:w-auto">
                                        <label className="block text-xs font-medium text-gray-500 mb-1.5">Change photo</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition w-full sm:w-auto"
                                        />
                                    </div>
                                )}

                            </div>
                        )}

                        {/* BASIC INFO CARD */}
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                            <h2 className="text-sm font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-600 rounded-full" />
                                Basic Information
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                {[
                                    { label: "Full name", name: "name", type: "text" },
                                    { label: "Email address", name: "email", type: "email" },
                                ].map(({ label, name, type }) => (
                                    <div key={name} className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">{label}</label>
                                        <input
                                            name={name}
                                            type={type}
                                            value={profile[name] || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        />
                                    </div>
                                ))}

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-gray-500">Role</label>
                                    <div className="flex items-center h-10">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium
                  ${profile.role === "DOCTOR" ? "bg-blue-100 text-blue-700"
                                                : profile.role === "PHARMA" ? "bg-green-100 text-green-700"
                                                    : "bg-purple-100 text-purple-700"}`}>
                                            {profile.role}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* DOCTOR DETAILS CARD */}
                        {user?.role === "DOCTOR" && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                                <h2 className="text-sm font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-600 rounded-full" />
                                    Professional Details
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    {[
                                        { label: "Registration number", name: "registration_number" },
                                        { label: "Specialty", name: "specialty" },
                                        { label: "Qualification", name: "qualification" },
                                        { label: "Hospital", name: "hospital" },
                                    ].map(({ label, name }) => (
                                        <div key={name} className="space-y-1.5">
                                            <label className="block text-xs font-medium text-gray-500">{label}</label>
                                            <input
                                                name={name}
                                                value={profile[name] || ""}
                                                onChange={handleChange}
                                                disabled={!editMode}
                                                className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                      ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                            />
                                        </div>
                                    ))}

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">Experience (years)</label>
                                        <input
                                            type="number"
                                            name="experience"
                                            value={profile.experience || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">Year of registration</label>
                                        <select
                                            name="registration_year"
                                            value={profile.registration_year || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        >
                                            {YEARS.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">State medical council</label>
                                        <select
                                            name="state_medical_council"
                                            value={profile.state_medical_council || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        >
                                            {MSD_STATE_COUNCILS.map((s) => (
                                                <option key={s.label} value={s.label}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">State</label>
                                        <select
                                            name="state"
                                            value={profile.state || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        >
                                            <option value="">Select state</option>
                                            {STATE_LIST.map((s) => (
                                                <option key={s.name} value={s.name}>{s.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">City</label>
                                        <select
                                            name="city"
                                            value={profile.city || ""}
                                            onChange={handleChange}
                                            disabled={!editMode || !profile.state}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30
                    ${!editMode || !profile.state ? "bg-gray-50 text-gray-400 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        >
                                            <option value="">Select city</option>
                                            {selectedState?.cities?.map((city) => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Bio — full width */}
                                    <div className="sm:col-span-2 space-y-1.5">
                                        <label className="block text-xs font-medium text-gray-500">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={profile.bio || ""}
                                            onChange={handleChange}
                                            disabled={!editMode}
                                            placeholder="Write something about yourself..."
                                            rows={4}
                                            className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 resize-none
                    ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                        />
                                    </div>

                                </div>
                            </div>
                        )}

                        {/* PHARMA DETAILS CARD */}
                        {user?.role === "PHARMA" && (
                            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                                <h2 className="text-sm font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                                    <span className="w-1 h-4 bg-blue-600 rounded-full" />
                                    Company Details
                                </h2>
                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-gray-500">Company name</label>
                                    <input
                                        name="company_name"
                                        value={profile.company_name || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={`w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
                  ${!editMode ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`}
                                    />
                                </div>
                            </div>
                        )}

                    </main>
                )
            }

        </div >
    );
}

export default Profile;