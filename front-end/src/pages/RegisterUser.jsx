import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/useAuth";

export default function Register({ onClose, onRegistered }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password

    const { refreshProfile } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setError(""); // Clear any previous errors
        setIsLoading(true); // Start loading state

        try {
            // API call to backend for user registration
            const res = await axios.post("http://localhost:3000/api/users/register", {
                username: name,
                email,
                password,
            },
                { withCredentials: true }
            );

            console.log("User registered successfully:", res);
            refreshProfile()
            onClose();
            //   navigate("/login"); // Redirect to login on successful registration

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
            console.error("User registration failed:", err);
        } finally {
            setIsLoading(false); // Stop loading state
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5 text-gray-800">
                
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    Welcome To MyBlog
                </h2>
                <div>
                    <label htmlFor="name" className="block mb-1 text-gray-600">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block mb-1 text-gray-600">Confirm Password</label>
                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                        >
                            {showConfirmPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* Error message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white py-2 rounded-lg text-lg font-medium hover:bg-blue-700 transition ${isLoading ? "bg-gray-400" : ""}`}
                >
                    {isLoading ? "Registering..." : "Register"}
                </button>

                {/* Link to Login */}
                <p className="text-sm text-blue-500 text-center mt-2 cursor-pointer hover:underline">
                    Already have an account? <span onClick={() => onRegistered()}>Login</span>
                </p>
            </form>
    );
}
