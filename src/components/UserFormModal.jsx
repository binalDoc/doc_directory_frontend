import { useState, useEffect } from "react";
import adminService from "../services/admin.service";
import geographyService from "../services/geography.service";
import toaster from "./toaster";
import { userDataValidation } from "../validators/user.validator";
import { MSD_STATE_COUNCILS, YEARS } from "../constants/app.constant";

function UserFormModal({ user, onClose, onSuccess }) {
    const isEdit = !!user;
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "DOCTOR",
        password: null,

        country_id: user?.country_id || null,
        state_id: user?.state_id || null,
        city_id: user?.city_id || null,

        specialty: user?.specialty || null,
        experience: user?.experience || null,
        qualification: user?.qualification || null,
        hospital: user?.hospital || null,
        registration_number: user?.registration_number || null,
        registration_year: user?.registration_year || null,
        state_medical_council: user?.state_medical_council || null,

        company_name: user?.company_name || null
    });

    const [errors, setErrors] = useState({});

    // Geography
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // Load countries on mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const result = await geographyService.getCountries();
                setCountries(result || []);
            } catch {
                toaster.error("Failed to load countries");
            }
        };
        fetchCountries();
    }, []);

    // If editing, pre-load states for the user's existing country
    useEffect(() => {
        if (!form.country_id) {
            setStates([]);
            setCities([]);
            return;
        }
        const fetchStates = async () => {
            try {
                setLoadingStates(true);
                const result = await geographyService.getStates(form.country_id);
                setStates(result || []);
            } catch {
                toaster.error("Failed to load states");
            } finally {
                setLoadingStates(false);
            }
        };
        fetchStates();
    }, [form.country_id]);

    // If editing, pre-load cities for the user's existing state
    useEffect(() => {
        if (!form.state_id) {
            setCities([]);
            return;
        }
        const fetchCities = async () => {
            try {
                setLoadingCities(true);
                const result = await geographyService.getCities(form.state_id);
                setCities(result || []);
            } catch {
                toaster.error("Failed to load cities");
            } finally {
                setLoadingCities(false);
            }
        };
        fetchCities();
    }, [form.state_id]);

    const handleChange = (e) => {
        let { name, value } = e.target;

        const intFields = ["country_id", "state_id", "city_id", "experience", "registration_year"];

        const sanitized = intFields.includes(name)
            ? (value === "" ? null : parseInt(value))
            : value;

        if (value === "") value = null;

        if (name === "country_id") {
            setForm(prev => ({ ...prev, country_id: sanitized, state_id: null, city_id: null }));
        } else if (name === "state_id") {
            setForm(prev => ({ ...prev, state_id: sanitized, city_id: null }));
        } else {
            setForm(prev => ({ ...prev, [name]: sanitized }));
        }
    };

    const validate = () => {
        const err = userDataValidation(form);
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleSubmit = async () => {
        if (!isEdit && !validate()) return;
        setErrors({});

        try {
            setLoading(true);
            if (isEdit) {
                await adminService.updateUserByAdmin(user?.user_id, form);
                toaster.success("User updated");
            } else {
                await adminService.createUserByAdmin(form);
                toaster.success("User created");
            }
            onSuccess();
        } catch (err) {
            console.error(err);
            setErrors({ error: err.response?.data?.message || "Action failed" });
        } finally {
            setLoading(false);
        }
    };

    // Shared styles
    const inputClass = (hasError) =>
        `w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all
        ${hasError ? "border-red-500" : "border-gray-300"}`;

    const selectClass = (disabled) =>
        `w-full border p-2.5 rounded-lg border-gray-300 transition-all focus:ring-2 focus:ring-blue-500 outline-none
        ${disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "bg-white"}`;

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] relative">

                <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl">✕</button>

                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Edit User" : "Create New User"}
                    </h2>
                    <p className="text-sm text-gray-500">
                        Fill in the details below to {isEdit ? "update" : "register"} the account.
                    </p>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">

                    {errors.error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3">
                            <p className="text-red-700 text-sm font-medium">{errors.error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        {/* ── BASIC INFO ── */}
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Basic Information</label>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm text-gray-400">Full name</label>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className={inputClass(errors.name)}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm text-gray-400">Email</label>
                            <input
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className={inputClass(errors.email)}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        {!isEdit && (
                            <div className="md:col-span-2 space-y-1">
                                <label className="block text-sm text-gray-400">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Temporary Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className={inputClass(errors.password)}
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            </div>
                        )}

                        <div className="md:col-span-2 space-y-1">
                            <label className="block text-sm text-gray-400">Role</label>
                            <select
                                name="role"
                                value={form.role}
                                disabled={isEdit}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-2.5 rounded-lg bg-gray-50 disabled:bg-gray-100 cursor-pointer"
                            >
                                <option value="DOCTOR">Doctor</option>
                                {isEdit && <option value="ADMIN">Admin</option>}
                                <option value="PHARMA">Pharma</option>
                            </select>
                        </div>

                        {/* ── LOCATION ── */}
                        <div className="md:col-span-2 border-t pt-4">
                            <label className="block text-xs font-semibold uppercase text-gray-400 mb-3">Location</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {/* Country */}
                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Country</label>
                                    <select
                                        name="country_id"
                                        value={form?.country_id || ""}
                                        onChange={handleChange}
                                        className={selectClass(false)}
                                        disabled={isEdit}
                                    >
                                        <option value="">Select country</option>
                                        {countries.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    {errors.country_id && <p className="text-red-500 text-xs">{errors.country_id}</p>}
                                </div>

                                {/* State */}
                                <div className="space-y-1">
                                    <label className={`block text-sm ${!form.country_id ? "text-gray-300" : "text-gray-400"}`}>
                                        State
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="state_id"
                                            value={form?.state_name || form?.state_id || ""}
                                            onChange={handleChange}
                                            disabled={!form.country_id || loadingStates}
                                            className={selectClass(!form.country_id || loadingStates)}
                                        >
                                            <option value="">
                                                {loadingStates ? "Loading..." : !form.country_id ? "Select country first" : "Select state"}
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
                                <div className="space-y-1">
                                    <label className={`block text-sm ${!form.state_id ? "text-gray-300" : "text-gray-400"}`}>
                                        City
                                    </label>
                                    <div className="relative">
                                        <select
                                            name="city_id"
                                            value={form?.city_name || form?.city_id || ""}
                                            onChange={handleChange}
                                            disabled={!form.state_id || loadingCities}
                                            className={selectClass(!form.state_id || loadingCities)}
                                        >
                                            <option value="">
                                                {loadingCities ? "Loading..." : !form.state_id ? "Select state first" : "Select city"}
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

                        {/* ── DOCTOR FIELDS ── */}
                        {form.role === "DOCTOR" && (
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="md:col-span-2 border-t pt-4">
                                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Professional Details</label>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Specialty</label>
                                    <input
                                        name="specialty"
                                        placeholder="Specialty"
                                        value={form.specialty}
                                        onChange={handleChange}
                                        className={inputClass(errors.specialty)}
                                    />
                                    {errors.specialty && <p className="text-red-500 text-xs">{errors.specialty}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Experience</label>
                                    <input
                                        type="number"
                                        name="experience"
                                        placeholder="Experience (Years)"
                                        value={form.experience}
                                        onChange={handleChange}
                                        className={inputClass(errors.experience)}
                                    />
                                    {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Qualification</label>
                                    <input
                                        name="qualification"
                                        placeholder="Qualification"
                                        value={form.qualification}
                                        onChange={handleChange}
                                        className={inputClass(errors.qualification)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Hospital</label>
                                    <input
                                        name="hospital"
                                        placeholder="Hospital"
                                        value={form.hospital}
                                        onChange={handleChange}
                                        className={inputClass(errors.hospital)}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Registration number</label>
                                    <input
                                        name="registration_number"
                                        placeholder="Registration number"
                                        value={form.registration_number}
                                        onChange={handleChange}
                                        className={inputClass(errors.registration_number)}
                                    />
                                    {errors.registration_number && <p className="text-red-500 text-xs">{errors.registration_number}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">Registration year</label>
                                    <select
                                        name="registration_year"
                                        value={form.registration_year || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2.5 rounded-lg border-gray-300"
                                    >
                                        <option value="">Reg. Year</option>
                                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.registration_year && <p className="text-red-500 text-xs">{errors.registration_year}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400">State medical council</label>
                                    <select
                                        name="state_medical_council"
                                        value={form.state_medical_council || ""}
                                        onChange={handleChange}
                                        className="w-full border p-2.5 rounded-lg border-gray-300"
                                    >
                                        <option value="">Medical Council</option>
                                        {MSD_STATE_COUNCILS.map(s => (
                                            <option key={s.label} value={s.label}>{s.label}</option>
                                        ))}
                                    </select>
                                    {errors.state_medical_council && <p className="text-red-500 text-xs">{errors.state_medical_council}</p>}
                                </div>
                            </div>
                        )}

                        {/* ── PHARMA FIELDS ── */}
                        {form.role === "PHARMA" && (
                            <div className="md:col-span-2 pt-2 border-t mt-2">
                                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Company Details</label>
                                <input
                                    name="company_name"
                                    placeholder="Company Name"
                                    value={form.company_name}
                                    onChange={handleChange}
                                    className="w-full border p-2.5 border-gray-300 rounded-lg"
                                />
                                {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}
                            </div>
                        )}

                    </div>
                </div>

                <div className="p-6 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                    <button onClick={onClose} className="px-6 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-md transition-all flex items-center gap-2
                            ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 active:scale-95"}`}
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Processing...
                            </>
                        ) : (
                            isEdit ? "Update User" : "Save User"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserFormModal;