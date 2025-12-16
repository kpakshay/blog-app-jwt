import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../Context/useAuth";

export const LoginModal = ({ onClose, redirectPath, onNotRegistered }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { refreshProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful!");

      try {
        await refreshProfile();
      } catch (profileErr) {
        console.error("Profile refresh failed", profileErr);
      }

      onClose();

      if (redirectPath) {
        navigate(redirectPath)
      } else {
        navigate("/")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-gray-800">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Welcome Back
      </h2>

      {error && (
        <p className="text-red-600 text-center bg-red-50 border border-red-300 p-2 rounded-md">
          {error}
        </p>
      )}

      {/* Email */}
      <div>
        <label className="block mb-1 text-gray-600">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/* Password */}
      <div className="relative">
        <label className="block mb-1 text-gray-600">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="button"
          className="absolute right-3 top-1/2 transform text-gray-600"
          onClick={() => setShowPassword((p) => !p)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      {/* Login button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white text-lg font-medium transition 
          ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
        `}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      {/* Links */}
      <p className="text-center text-sm text-blue-500 hover:underline cursor-pointer">
        Forgot password?
      </p>

      <div className="text-center text-sm">
        Don’t have an account?{" "}
        <span
          className="text-blue-600 font-semibold hover:underline cursor-pointer"
          onClick={() => onNotRegistered()}
        >
          Sign up
        </span>
      </div>
    </form>
  );
};