import { useState } from "react";
import authService from "../services/auth.service";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { loginDataValidation } from "../validators/auth.validator";
import toaster from "../components/toaster";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationError = loginDataValidation(data);
        if (Object.keys(validationError).length > 0) {
            setError(validationError);
            return;
        }

        setError({});
        try {
            setLoading(true);
            const result = await authService.loginUser(data);
            if (result && result.message) {
                login(result.user);
                toaster.success(result.message);
                navigate("/home");
            }
        } catch (err) {
            setError({ "error": err.response?.data?.message || "Login failed" });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">

            <nav className="flex justify-center items-center px-6 sm:px-10 py-5 bg-transparent">
                <div
                    className="flex items-center gap-2.5 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                    </div>
                    <span className="font-bold text-[#0a1628] text-2xl tracking-wide">
                        DocDirectory
                    </span>
                </div>
            </nav>

            {/* FORM */}
            <main className="flex-1 flex items-start justify-center px-4 ">
                <div className="w-full max-w-md">

                    {/* Header */}
                    <div className="text-center mb-2">
                        <h2 className="text-xl font-bold text-[#0a1628]">
                            Welcome back
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Sign in to your account
                        </p>
                    </div>

                    {/* Card */}
                    <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-gray-100 px-8 py-8">

                        {/* Error */}
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

                            {/* Email */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-600">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition
                  ${error.email ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.email && <p className="text-red-400 text-xs">{error.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="space-y-1.5">
                                <label className="block text-sm font-medium text-gray-600">
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className={`w-full border px-4 py-3 rounded-xl text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition
                  ${error.password ? "border-red-300 bg-red-50/40" : "border-gray-200 bg-white"}`}
                                />
                                {error.password && <p className="text-red-400 text-xs">{error.password}</p>}
                            </div>

                            {/* Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition shadow-md
                ${loading ? "bg-blue-400 text-white cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                            >
                                {loading ? (
                                    <>
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Signing in...
                                    </>
                                ) : "Sign in →"}
                            </button>

                        </form>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-gray-500 text-center mt-6">
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className="text-blue-600 cursor-pointer hover:text-blue-700 font-semibold transition"
                        >
                            Register
                        </span>
                    </p>

                </div>
            </main>
        </div>
    );
}

export default Login;
