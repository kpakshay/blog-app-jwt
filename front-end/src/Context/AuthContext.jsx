import { useEffect, useState, createContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
    // const fetchProfile = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:3000/api/users/profile", {
    //       withCredentials: true,
    //     });
    //     if(res.data&&res.data._id){
    //         setUser(res.data);
    //         console.log(res.data);
    //     } else {
    //         setUser(null)
    //     }
    //   } catch (err) {
    //     console.error("Failed to fetch profile:", err.response?.data || err.message);
    //     setUser(null)
    //   }
    // };
    const fetchProfile = async () => {
  try {
    const res = await axios.get("http://localhost:3000/api/users/profile", {
      withCredentials: true,
    });
    setUser(res.data);
    console.log(res.data,"fetchhh")
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
      alert(res.data.message || "Logged out");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, refreshProfile: fetchProfile  }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);


// import { useEffect,useState,createContext, Children, useContext } from "react";
// import axios from "axios";

// const AuthContext=createContext();

// export const AuthProvider = ({children}) =>{
//     const [user,setUser]=useState(null);
//     useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/users/profile", {
//           withCredentials: true,
//         });
//         setUser(res.data);
//         console.log(res.data);
//       } catch (err) {
//         console.error("Failed to fetch profile:", err.response?.data || err.message);
//       }
//     };
//     fetchProfile();
//   }, []); 

//     const logout = async () => {
//         let res= await axios.post('http://localhost:3000/api/users/logout')
//         console.log(res.data)
//         alert(res.data)
//         setUser(null)
//     }

//     return (
//         <AuthContext.Provider value={{user, setUser, logout}}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth=() => useContext(AuthContext)