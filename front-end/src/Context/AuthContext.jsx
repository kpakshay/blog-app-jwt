import { useEffect, useState, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/users/profile", {
        withCredentials: true,
      });
      setUser(res.data);
      console.log(res.data, "fetchhh")
    } catch (err) {
      if (err.response?.status === 401) {
        setUser(null);
      } else {
        console.error("Failed to fetch profile:", err.response?.data || err.message);
        setUser(null);
      }
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      console.log(res.data);
      // alert(res.data.message || "Logged out");
      toast.success("Logged out successfully");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshProfile: fetchProfile }}>
      {children}
    </AuthContext.Provider>
  );
};