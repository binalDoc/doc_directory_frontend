import { useAuth } from "../context/auth-context";
import pharmaService from "../services/pharma.service";
import doctorService from "../services/doctor.service";
import geographyService from "../services/geography.service";
import { useEffect, useState } from "react";
import toaster from "../components/toaster";
import Loading from "../components/Loading";
import { MSD_STATE_COUNCILS, YEARS, SPECIALTIES } from "../constants/app.constant";
import { getImageUrl } from "../utils/helper";

function Profile() {
    const { user, login } = useAuth();

    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [profileSave, setProfileSave] = useState(false);
    const [error, setError] = useState("");

    // Geography
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            let result = null;
            if (user?.role === "DOCTOR") result = await doctorService.getDoctorProfile();
            else if (user?.role === "PHARMA") result = await pharmaService.getPharmaprofile();

            if (result) setProfile({ ...user, ...result });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch states when country_id is set on profile
    useEffect(() => {
        if (!profile.country_id) {
            setStates([]);
            setCities([]);
            return;
        }
        const fetchStates = async () => {
            try {
                setLoadingStates(true);
                const result = await geographyService.getStates(profile.country_id);
                setStates(result || []);
            } catch {
                toaster.error("Failed to load states");
            } finally {
                setLoadingStates(false);
            }
        };
        fetchStates();
    }, [profile.country_id]);

    // Fetch cities when state_id is set on profile
    useEffect(() => {
        if (!profile.state_id) {
            setCities([]);
            return;
        }
        const fetchCities = async () => {
            try {
                setLoadingCities(true);
                const result = await geographyService.getCities(profile.state_id);
                setCities(result || []);
            } catch {
                toaster.error("Failed to load cities");
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCities();
    }, [profile.state_id]);

    useEffect(() => {
        if (user) fetchProfile();
    }, [user]);

     const handleChange = (e) => {
        let { name, value } = e.target;

        const intFields = ["country_id", "state_id", "city_id"];

        const sanitized = intFields.includes(name)
            ? (value === "" ? null : parseInt(value))
            : value;

        if(value==="") value = null;

        if (name === "country_id") {
            setProfile(prev => ({ ...prev, country_id: sanitized, state_id: null, city_id: null }));
        } else if (name === "state_id") {
            setProfile(prev => ({ ...prev, state_id: sanitized, city_id: null }));
        } else {
            setProfile(prev => ({ ...prev, [name]: sanitized }));
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("image", file);
            const result = await doctorService.uploadDoctorImage(formData);
            if (result) {
                setProfile(prev => ({ ...prev, ...result }));
                login({ ...profile, ...result });
                toaster.success("Profile image added!");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        try {
            setProfileSave(true);
            let res = null;
            if (user.role === "DOCTOR") res = await doctorService.updateDoctorProfile(profile);
            else if (user.role === "PHARMA") res = await pharmaService.updatePharmaProfile(profile);

            if (res.result) {
                login(res.result);
                toaster.success("Profile updated successfully!");
            }
            setEditMode(false);
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
            setEditMode(false);
        } finally {
            setProfileSave(false);
            setLoading(false);
        }
    };

    // Shared field styles
    const fieldClass = (editable = true) =>
        `w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400
        ${!editable ? "bg-gray-50 text-gray-600 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`;

    const selectClass = (editable = true) =>
        `w-full border px-3 py-2.5 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/30
        ${!editable ? "bg-gray-50 text-gray-400 border-gray-100 cursor-default" : "bg-white text-gray-800 border-gray-200"}`;

    return (
        <div className="min-h-screen bg-[#f0f4ff] flex flex-col">

            <a href="/home" className="flex items-center w-fit text-sm hover:text-blue-600 transition font-medium p-4 gap-1.5">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to home
            </a>

            {loading && (
                <div className="flex-1 flex items-center justify-center">
                    <Loading message="Loading profile..." />
                </div>
            )}

            {!loading && profile && (
                <main className="flex-1 max-w-4xl mx-auto w-full p-4">

                    {/* Header */}
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
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                                    <polyline points="17 21 17 13 7 13 7 21" />
                                                    <polyline points="7 3 7 8 15 8" />
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
                            <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* DOCTOR HEADER CARD */}
                    {profile?.role === "DOCTOR" && (
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 overflow-hidden flex items-center justify-center shrink-0">
                                    {profile.profile_image_url ? (
                                        <img src={getImageUrl(profile?.profile_image_url)} alt="profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-2xl font-bold text-blue-400 capitalize">{profile.name?.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold text-[#0a1628]">{profile.name}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{profile.email}</p>
                                    {profile.status === "VERIFIED" && (
                                        <span className="inline-flex items-center gap-1 mt-1.5 bg-green-50 border border-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>
                                            Verified Doctor
                                        </span>
                                    )}
                                    {profile.status === "PENDING" && (
                                        <span className="inline-flex items-center gap-1 mt-1.5 bg-yellow-50 border border-yellow-100 text-yellow-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Pending verification
                                        </span>
                                    )}
                                    {profile.status === "REJECTED" && (
                                        <span className="inline-flex items-center gap-1 mt-1.5 bg-red-50 border border-red-100 text-red-600 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                            Profile Rejected
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="hidden sm:block w-px h-14 bg-gray-100" />

                            <div className="flex-1 w-full sm:w-auto">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span className="font-medium">Profile completion</span>
                                    <span className="font-semibold text-[#0a1628]">{profile?.completionPercentage || 0}%</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${(profile?.completionPercentage || 0) === 100 ? "bg-green-500" : (profile?.completionPercentage || 0) >= 60 ? "bg-blue-500" : "bg-yellow-400"}`}
                                        style={{ width: `${profile?.completionPercentage || 0}%` }}
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5">
                                    {(profile?.completionPercentage || 0) < 100 ? "Complete your profile to improve visibility to pharma teams." : "Your profile is complete!"}
                                </p>
                            </div>

                            {editMode && (
                                <div className="w-full sm:w-auto">
                                    <label className="block text-xs font-medium text-gray-500 mb-1.5">Change photo</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition"
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
                                        className={fieldClass(editMode)}
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

                    {/* ── LOCATION CARD ── */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                        <h2 className="text-sm font-semibold text-[#0a1628] mb-4 flex items-center gap-2">
                            <span className="w-1 h-4 bg-blue-600 rounded-full" />
                            Location
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            {/* Country */}
                            <div className="space-y-1.5">
                                <label className="block text-xs font-medium text-gray-500">Country</label>
                                <div className="relative">
                                    <input
                                        value={profile?.country_name || profile?.country_id || ""}
                                        disabled={true}
                                        className={selectClass(editMode)}
                                    />
                                </div>
                            </div>

                            {/* State */}
                            <div className="space-y-1.5">
                                <label className={`block text-xs font-medium ${!profile.country_id ? "text-gray-300" : "text-gray-500"}`}>
                                    State
                                </label>
                                <div className="relative">
                                    <select
                                        name="state_id"
                                        value={profile.state_id || ""}
                                        onChange={handleChange}
                                        disabled={!editMode || !profile.country_id || loadingStates}
                                        className={selectClass(editMode && !!profile.country_id)}
                                    >
                                        <option value="">
                                            {loadingStates ? "Loading..." : !profile.country_id ? "Select country first" : "Select state"}
                                        </option>
                                        {states.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    {loadingStates && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                    )}
                                </div>
                            </div>

                            {/* City */}
                            <div className="space-y-1.5">
                                <label className={`block text-xs font-medium ${!profile.state_id ? "text-gray-300" : "text-gray-500"}`}>
                                    City
                                </label>
                                <div className="relative">
                                    <select
                                        name="city_id"
                                        value={profile.city_id || ""}
                                        onChange={handleChange}
                                        disabled={!editMode || !profile.state_id || loadingCities}
                                        className={selectClass(editMode && !!profile.state_id)}
                                    >
                                        <option value="">
                                            {loadingCities ? "Loading..." : !profile.state_id ? "Select state first" : "Select city"}
                                        </option>
                                        {cities.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {loadingCities && (
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                    )}
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
                                            className={fieldClass(editMode)}
                                        />
                                    </div>
                                ))}

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-gray-500">Specialty</label>
                                    <select
                                        name="specialty"
                                        value={profile.specialty || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={selectClass(editMode)}
                                    >
                                        <option value="">Select specialty</option>
                                        {SPECIALTIES.map(s => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-gray-500">Experience (years)</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        value={profile.experience || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={fieldClass(editMode)}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="block text-xs font-medium text-gray-500">Year of registration</label>
                                    <select
                                        name="registration_year"
                                        value={profile.registration_year || ""}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={selectClass(editMode)}
                                    >
                                        {YEARS.map(y => (
                                            <option key={y} value={y}>{y}</option>
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
                                        className={selectClass(editMode)}
                                    >
                                        {MSD_STATE_COUNCILS.map(s => (
                                            <option key={s.label} value={s.label}>{s.label}</option>
                                        ))}
                                    </select>
                                </div>

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
                                    className={fieldClass(editMode)}
                                />
                            </div>
                        </div>
                    )}

                </main>
            )}
        </div>
    );
}

export default Profile;