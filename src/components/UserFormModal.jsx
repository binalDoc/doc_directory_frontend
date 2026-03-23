import { useState } from "react";
import adminService from "../services/admin.service";
import toaster from "./toaster";
import { userDataValidation } from "../validators/user.validator";
import { STATE_LIST, MSD_STATE_COUNCILS, YEARS } from "../constants/app.constant";

function UserFormModal({ user, onClose, onSuccess }) {
    const isEdit = !!user;
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: user?.name || "",
        email: user?.email || "",
        role: user?.role || "DOCTOR",
        password: "",

        // Doctor fields
        specialty: user?.specialty || "",
        experience: user?.experience || 0,
        qualification: user?.qualification || "",
        hospital: user?.hospital || "",
        city: user?.city || "",
        state: user?.state || "",
        registration_number: user?.registration_number || "",
        registration_year: user?.registration_year || "",
        state_medical_council: user?.state_medical_council || "",

        // Pharma
        company_name: user?.company_name || ""
    });

    const selectedState = STATE_LIST.find(
        (s) => s.name === form.state
    );

    const [errors, setErrors] = useState({});

    const validate = () => {
        let err = userDataValidation(form);
        console.log(err)
        setErrors(err);
        return Object.keys(err).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "state") {
            setForm({
                ...form,
                state: value,
                city: ""
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSubmit = async () => {
        if (!isEdit && !validate()) return;

        setErrors({})

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
            setErrors({ "error": err.response?.data?.message || "Login failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 px-4">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl flex flex-col max-h-[90vh] relative">

                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-black text-xl"
                >
                    ✕
                </button>

                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {isEdit ? "Edit User" : "Create New User"}
                    </h2>
                    <p className="text-sm text-gray-500">Fill in the details below to {isEdit ? 'update' : 'register'} the account.</p>
                </div>

                <div className="p-6 overflow-y-auto space-y-4">
                    {errors.error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                            <p className="text-red-700 text-sm font-medium">{errors.error}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Basic Information</label>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm text-gray-400 mb-1"> Full name </label>
                            <input
                                name="name"
                                placeholder="Full Name"
                                value={form.name}
                                onChange={handleChange}
                                className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                            <label className="block text-sm text-gray-400 mb-1"> Email </label>
                            <input
                                name="email"
                                placeholder="Email Address"
                                value={form.email}
                                onChange={handleChange}
                                className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        {!isEdit && (
                            <div className="md:col-span-2 space-y-1">
                                <label className="block text-sm text-gray-400 mb-1"> Password </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Temporary Password"
                                    value={form.password}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                                {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                            </div>
                        )}

                        <div className="md:col-span-2 pt-2">
                            <label className="block text-sm text-gray-400 mb-1">Role</label>
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

                        {form.role === "DOCTOR" && (
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                <div className="md:col-span-2 border-t pt-4">
                                    <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Professional Details</label>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Specialty </label>
                                    <input
                                        name="specialty"
                                        placeholder="Specialty"
                                        value={form.specialty}
                                        onChange={handleChange}
                                        className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.specialty && <p className="text-red-500 text-xs">{errors.specialty}</p>}

                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Experience </label>
                                    <input
                                        type="number"
                                        name="experience"
                                        placeholder="Experience (Years)"
                                        value={form.experience}
                                        onChange={handleChange}
                                        className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.experience && <p className="text-red-500 text-xs">{errors.experience}</p>}

                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Qualification </label>
                                    <input
                                        name="qualification"
                                        placeholder="Qualification"
                                        value={form.qualification}
                                        onChange={handleChange}
                                        className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Hospital </label>
                                    <input
                                        name="hospital"
                                        placeholder="Hospital"
                                        value={form.hospital}
                                        onChange={handleChange}
                                        className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Registration number </label>
                                    <input
                                        name="registration_number"
                                        placeholder="Registration number"
                                        value={form.registration_number}
                                        onChange={handleChange}
                                        className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.registration_number && <p className="text-red-500 text-xs">{errors.registration_number}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> Registration year </label>
                                    <select name="registration_year" value={form.registration_year || ""} onChange={handleChange} className="border p-2.5 rounded-lg border-gray-300">
                                        <option value="">Reg. Year</option>
                                        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                    {errors.registration_year && <p className="text-red-500 text-xs">{errors.registration_year}</p>}
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> State </label>
                                    <select name="state" value={form.state || ""} onChange={handleChange} className="w-full border p-2.5 rounded-lg border-gray-300 disabled:opacity-50">
                                        <option value="">Select state</option>
                                        {STATE_LIST?.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> City </label>
                                    <select name="city" value={form.city || ""} onChange={handleChange} disabled={!form.state} className="w-full border p-2.5 rounded-lg border-gray-300 disabled:opacity-50">
                                        <option value="">Select City</option>
                                        {selectedState?.cities?.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>

                                <div className="space-y-1">
                                    <label className="block text-sm text-gray-400 mb-1"> State medical council </label>
                                    <select name="state_medical_council" value={form.state_medical_council || ""} onChange={handleChange} className="border p-2.5 rounded-lg border-gray-300">
                                        <option value="">Medical Council</option>
                                        {MSD_STATE_COUNCILS.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                                    </select>
                                    {errors.state_medical_council && <p className="text-red-500 text-xs">{errors.state_medical_council}</p>}
                                </div>
                            </div>
                        )}

                        {form.role === "PHARMA" && (
                            <div className="md:col-span-2 pt-2 border-t mt-2">
                                <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Company Details</label>
                                <input name="company_name" placeholder="Company Name" value={form.company_name} onChange={handleChange} className="w-full border p-2.5 border-gray-300 rounded-lg" />
                                {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-6 border-t flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-600 font-medium hover:text-gray-800 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`bg-blue-600 text-white px-8 py-2 rounded-lg font-bold shadow-md transition-all flex items-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 active:scale-95"
                            }`}
                    >
                        {loading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
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