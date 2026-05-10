import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginErrors {
  email?: string;
  password?: string;
}

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  // Basic email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 4) {
      newErrors.password = "Password must be at least 4 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call (instant for demo)
    setTimeout(() => {
      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
      localStorage.setItem("isLoggedIn", "true");

      // Clear form
      setEmail("");
      setPassword("");
      setErrors({});
      setLoading(false);

      // Navigate to dashboard
      navigate("/dashboard");
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-teal-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-2">
            ✈️ Traveloop
          </h1>
          <p className="text-slate-600">Plan Your Perfect Trip</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="you@example.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-slate-700 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              placeholder="Enter your password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">⚠️ {errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 mt-6"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Demo Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-900">
            <strong>Demo:</strong> Use any email (e.g., demo@example.com) and password (min 4 chars)
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-600 text-sm mt-6">
          © 2024 Traveloop - Plan Smarter, Travel Better
        </p>
      </div>
    </div>
  );
}

export default Login;