import { useState, useEffect } from "react";
import authService from "../services/auth.service";
import { useAuth } from "../context/auth-context";
import { useGeography } from "../context/geography-context";
import { useNavigate } from "react-router-dom";
import { registerDataValidation } from "../validators/auth.validator";
import toaster from "../components/toaster";
import { isEmpty } from "../utils/helper";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "DOCTOR",
        verificationCode: "",
        company_name: "",
        country_id: "",
        state_id: "",
        city_id: ""
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


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});

    //Country change → fetch states + reset
    useEffect(() => {
        if (data.country_id) {
            fetchStates(data.country_id);
        }
        setData(prev => ({ ...prev, state_id: "", city_id: "" }));
    }, [data.country_id]);

    //State change → fetch cities + reset
    useEffect(() => {
        if (data.state_id) {
            fetchCities(data.state_id);
        }
        setData(prev => ({ ...prev, city_id: "" }));
    }, [data.state_id]);

    const handleChange = (e) => {
        setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = registerDataValidation(data);
        if (Object.keys(validationError).length > 0) {
            setError(validationError);
            return;
        }

        setError({});
        try {
            setLoading(true);
            let payload = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                country_id: data.country_id || undefined,
                state_id: data.state_id || undefined,
                city_id: data.city_id || undefined,
            };

            if (data.company_name && !isEmpty(data.company_name)) payload.company_name = data.company_name;
            if (data.verificationCode && !isEmpty(data.verificationCode)) payload.verificationCode = data.verificationCode;

            const result = await authService.registerUser(payload);
            if (result && result.message) {
                login(result.user);
                toaster.success(result.message);
                navigate("/");
            }
        } catch (err) {
            setError({ error: err.response?.data?.message || "Register failed" });
        } finally {
            setLoading(false);
        }
    };

    // Reusable select field styles
    const selectClass = (hasError) =>
        `w-full border px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed
        ${hasError ? "border-red-300 bg-red-50/40" : "border-gray-200"}`;

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">

            {/* NAV */}
            <nav className="flex justify-center items-center px-6 sm:px-10 py-5 bg-transparent">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="font-bold text-[#0a1628] text-base tracking-wide">DocDirectory</span>
                </div>
            </nav>

            {/* FORM */}
            <main className="flex-1 flex items-start justify-center px-4 pb-10">
                <div className="w-full max-w-md">

                    <div className="text-center mb-2">
                        <h2 className="text-3xl font-bold text-[#0a1628]">Create account</h2>
                        <p className="text-sm text-gray-500 mt-1">Join DocDirectory and get started</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 px-8 py-8">

                        {error.error && (
                            <div className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-100 text-red-500 text-sm px-4 py-3 rounded-xl">
                                <svg className="shrink-0 mt-0.5" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="12" y1="8" x2="12" y2="12" />
                                    <line x1="12" y1="16" x2="12.01" y2="16" />
                                </svg>
                                {error.error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Name */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-600">Full Name <span className="text-red-400">*</span></label>
                                <input
                                    name="name"
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${error.name ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.name && <p className="text-red-400 text-xs">{error.name}</p>}
                            </div>

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-600">Email <span className="text-red-400">*</span></label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${error.email ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.email && <p className="text-red-400 text-xs">{error.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-600">Password <span className="text-red-400">*</span></label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${error.password ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.password && <p className="text-red-400 text-xs">{error.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-600">Confirm Password <span className="text-red-400">*</span></label>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${error.confirmPassword ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.confirmPassword && <p className="text-red-400 text-xs">{error.confirmPassword}</p>}
                            </div>

                            {/* Role */}
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-gray-600">Role <span className="text-red-400">*</span></label>
                                <select
                                    name="role"
                                    onChange={handleChange}
                                    className="w-full border px-4 py-3 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 border-gray-200"
                                >
                                    <option value="DOCTOR">Doctor</option>
                                    <option value="PHARMA">Pharma</option>
                                </select>
                            </div>

                            {/* Pharma Fields */}
                            {data.role === "PHARMA" && (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-600">Verification Code <span className="text-red-400">*</span></label>
                                        <input
                                            name="verificationCode"
                                            placeholder="Enter code"
                                            onChange={handleChange}
                                            className={`w-full border px-4 py-3 rounded-xl text-sm ${error.verificationCode ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                        />
                                        {error.verificationCode && <p className="text-red-400 text-xs">{error.verificationCode}</p>}
                                    </div>

                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium text-gray-600">Company Name <span className="text-red-400">*</span></label>
                                        <input
                                            name="company_name"
                                            placeholder="Company Ltd."
                                            onChange={handleChange}
                                            className={`w-full border px-4 py-3 rounded-xl text-sm ${error.company_name ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                        />
                                        {error.company_name && <p className="text-red-400 text-xs">{error.company_name}</p>}
                                    </div>
                                </>
                            )}

                            {/* ── GEOGRAPHY SECTION ── */}
                            <div className="border-t border-gray-100 pt-4 space-y-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Location</p>

                                {/* Country */}
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-gray-600">Country</label><span className="text-red-400">*</span>
                                    <div className="relative">
                                        <select
                                            name="country_id"
                                            value={data.country_id}
                                            onChange={handleChange}
                                            disabled={loadingCountries}
                                            className={selectClass(error.country_id)}
                                        >
                                            <option value="">
                                                {loadingCountries ? "Loading countries..." : "Select country"}
                                            </option>
                                            {countries.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {loadingCountries && (
                                            <span className="absolute right-3 top-1/3 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                        )}
                                    </div>
                                    {error.country_id && <p className="text-red-400 text-xs">{error.country_id}</p>}
                                </div>

                                {/* State */}
                                <div className="space-y-1.5">
                                    <label className={`text-sm font-medium ${!data.country_id ? "text-gray-300" : "text-gray-600"}`}>State</label>
                                    <div className="relative">
                                        <select
                                            name="state_id"
                                            value={data.state_id}
                                            onChange={handleChange}
                                            disabled={!data.country_id || loadingStates}
                                            className={selectClass(error.state_id)}
                                        >
                                            <option value="">
                                                {loadingStates ? "Loading states..." : !data.country_id ? "Select country first" : "Select state"}
                                            </option>
                                            {states.map(s => (
                                                <option key={s.id} value={s.id}>{s.name}</option>
                                            ))}
                                        </select>
                                        {loadingStates && (
                                            <span className="absolute right-3 top-1/3 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                        )}
                                    </div>
                                    {error.state_id && <p className="text-red-400 text-xs">{error.state_id}</p>}
                                </div>

                                {/* City */}
                                <div className="space-y-1.5">
                                    <label className={`text-sm font-medium ${!data.state_id ? "text-gray-300" : "text-gray-600"}`}>City</label>
                                    <div className="relative">
                                        <select
                                            name="city_id"
                                            value={data.city_id}
                                            onChange={handleChange}
                                            disabled={!data.state_id || loadingCities}
                                            className={selectClass(error.city_id)}
                                        >
                                            <option value="">
                                                {loadingCities ? "Loading cities..." : !data.state_id ? "Select state first" : "Select city"}
                                            </option>
                                            {cities.map(c => (
                                                <option key={c.id} value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        {loadingCities && (
                                            <span className="absolute right-3 top-1/3 w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin" />
                                        )}
                                    </div>
                                    {error.city_id && <p className="text-red-400 text-xs">{error.city_id}</p>}
                                </div>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition shadow-md
                                    ${loading ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Creating account...
                                    </>
                                ) : "Create account →"}
                            </button>

                        </form>
                    </div>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        Already have an account?{" "}
                        <span onClick={() => navigate("/login")} className="text-blue-600 cursor-pointer hover:text-blue-700 font-semibold transition">
                            Sign in
                        </span>
                    </p>

                </div>
            </main>
        </div>
    );
}

export default Register;