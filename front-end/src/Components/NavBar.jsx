import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

export default function Navbar() {
//   const { user, logout } = useAuth();

  return (
    <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
      <Link to="/about" style={{ color: "white", marginRight: "20px" }}>About</Link>
      <Link to="/posts" style={{ color: "white", marginRight: "20px" }}>Blog</Link>
      <Link to="/create" style={{ color: "white", marginRight: "20px" }}>Create Post</Link>

      {/* {user ? (
        <>
          <Link to="/create" style={{ color: "white", marginRight: "20px" }}>Create Post</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: "white", marginRight: "20px" }}>Login</Link>
          <Link to="/register" style={{ color: "white" }}>Register</Link>
        </>
      )} */}
    </nav>
  );
}
