import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../Context/useAuth.jsx";
import Modal from "./Modal.jsx";
import { LoginModal } from "../pages/Login.jsx";
import { useNavigate } from "react-router-dom";
import Register from "../pages/RegisterUser.jsx";

const navItemClasses = (isActive) =>
  `px-3 py-1 rounded-md transition-colors ${isActive
    ? "bg-gray-800 text-blue-300"
    : "hover:text-blue-400 text-gray-200"
  }`;

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [redirectTo, setRedirectTo] = useState(null)

  const navigate = useNavigate();
  const location = useLocation()

  const handleProtectedNav = (link) => {
    if (!user) {
      setRedirectTo(link.to);
      setShowLoginModal(true);
    } else {
      navigate(link.to);
    }
    setIsOpen(false);
  }

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "Blog" },
    { to: "/create", label: "Create", protected: true },
    { to: "/about", label: "About" },
  ];

  return (
    <nav className="bg-gray-900 text-gray-200 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide text-blue-400">
            MyBlog
          </Link>

          {/* Desktop Navigation */}

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.protected ? (
                <button
                  key={link.to}
                  onClick={()=>handleProtectedNav(link)}
                  // onClick={() => {
                  //   if (!user) {
                  //     setShowLoginModal(true);
                  //   } else {
                  //     navigate(link.to);
                  //   }
                  // }}
                  className={navItemClasses(location.pathname === link.to)}
                >
                  {link.label}
                </button>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => navItemClasses(isActive)}
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span>Hi, {user?.username}</span>
                <button
                  onClick={logout}
                  className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>

                <button
                  onClick={() => { setShowLoginModal(true) }}
                  className="px-4 py-1.5 bg-gray-700 hover:bg-gray-800 rounded-md transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => { setShowRegisterModal(true) }}
                  className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}

          <div className="md:hidden flex items-center space-x-2">
            {user && (
              <span className="text-gray-200">Hi, {user?.username}</span>
            )
            }
            <button
              className="text-gray-200 focus:outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-gray-700 rounded-lg mt-2 py-3 px-4 space-y-2">
            {navLinks.map((link) =>
              link.protected ? (
                <button
                  key={link.to}
                  onClick={()=>handleProtectedNav(link)}
                  // onClick={() => {
                  //   if (!user) setShowLoginModal(true);
                  //   else navigate(link.to);
                  //   setIsOpen(false);
                  // }}
                  className={`block w-full text-left ${navItemClasses(location.pathname === link.to)}`}
                >
                  {link.label}
                </button>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left ${navItemClasses(isActive)}`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <hr className="border-gray-600 my-2" />

            {/* Auth actions */}
            {!user ? (
              <>
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 bg-gray-800 rounded-md"
                >
                  Login
                </button>

                <button
                  onClick={() => {
                    setShowRegisterModal(true);
                    setIsOpen(false);
                  }}
                  className="w-full px-3 py-2 bg-blue-500 rounded-md"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2 bg-red-500 rounded-md"
              >
                Logout
              </button>
            )}

          </div>
        )}

      </div>

      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)}>
        <LoginModal onClose={() => setShowLoginModal(false)} redirectPath={redirectTo} onNotRegistered={() => { setShowLoginModal(false); setShowRegisterModal(true) }} />
      </Modal>

      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <Register onClose={() => setShowRegisterModal(false)} onRegistered={() => { setShowRegisterModal(false), setShowLoginModal(true); }} />
      </Modal>

    </nav>
  );
}