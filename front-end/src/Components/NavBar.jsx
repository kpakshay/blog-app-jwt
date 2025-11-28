import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  // const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-white">
              MyBlog
            </Link>
          </div>

          {/* Center - Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/posts" className="hover:text-blue-400">Blog</Link>
            <Link to="/create" className="hover:text-blue-400">Create Post</Link>
            <Link to="/about" className="hover:text-blue-400">About</Link>
          </div>

          {/* Right side - Auth */}
          <div className="hidden md:flex space-x-4">
            {/* Example with auth context */}
            {/* {user ? (
              <>
                <Link to="/create" className="hover:text-blue-400">Create Post</Link>
                <button onClick={logout} className="hover:text-blue-400">Logout</button>
              </>
            ) : ( */}
              <>
                <Link to="/login" className="hover:text-blue-400">Login</Link>
                <Link to="/register" className="hover:text-blue-400">Register</Link>
              </>
            {/* )} */}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden px-4 pb-3 space-y-2 bg-gray-700">
        <Link to="/" className="block hover:text-blue-400">Home</Link>
        <Link to="/about" className="block hover:text-blue-400">About</Link>
        <Link to="/posts" className="block hover:text-blue-400">Blog</Link>
        <Link to="/create" className="block hover:text-blue-400">Create Post</Link>
        <Link to="/login" className="block hover:text-blue-400">Login</Link>
        <Link to="/register" className="block hover:text-blue-400">Register</Link>
      </div>
    </nav>
  );
}

// import { Link } from "react-router-dom";
// // import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
// //   const { user, logout } = useAuth();

//   return (
//     <nav style={{ padding: "10px", background: "#333", color: "#fff" }}>
//       <Link to="/" style={{ color: "white", marginRight: "20px" }}>Home</Link>
//       <Link to="/about" style={{ color: "white", marginRight: "20px" }}>About</Link>
//       <Link to="/posts" style={{ color: "white", marginRight: "20px" }}>Blog</Link>
//       <Link to="/create" style={{ color: "white", marginRight: "20px" }}>Create Post</Link>
// {/* 
//       {user ? (
//         <>
//           <Link to="/create" style={{ color: "white", marginRight: "20px" }}>Create Post</Link>
//           <button onClick={logout}>Logout</button>
//         </>
//       ) : ( */}
//         <>
//           <Link to="/login" style={{ color: "white", marginLeft: "20px" }}>Login</Link>
//           <Link to="/register" style={{ color: "white" }}>Register</Link>
//         </>
//       {/* )} */}
//     </nav>
//   );
// }
