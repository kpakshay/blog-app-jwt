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
          {showPassword ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          }
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

      {/* <p className="text-center text-sm text-blue-500 hover:underline cursor-pointer">
        Forgot password?
      </p> */}

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