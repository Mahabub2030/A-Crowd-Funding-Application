import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2"; // Import SweetAlert2

const Navbar = () => {
  const location = useLocation();
  const { user, logout, toggleDarkMode, isDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  // Handle scroll for sticky navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    logout();
    Swal.fire({
      title: "Logged out!",
      text: "You have successfully logged out.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/auth/login");
    });
  };

  return (
    <div
      className={`${
        isDarkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Announcement Bar */}
      <div className="fixed w-full top-0 bg-purple-600 text-white text-center py-5 flex justify-center items-center z-50">
        <span className="mr-2">🎁</span>
        <p className="text-sm font-medium">
          Holiday Gift Guides:{" "}
          <span className="underline cursor-pointer">
            Explore ready-to-ship gifts
          </span>
          .
        </p>
      </div>

      {/* Navbar */}
      <div
        className={`fixed top-16 left-0 w-full px-4 lg:px-12 py-3 flex items-center justify-between z-50 ${
          isHomePage && !isScrolled
            ? "bg-transparent text-white"
            : isDarkMode
            ? "text-white bg-gray-900"
            : "bg-white text-black"
        } transition-all duration-300`}
      >
        {/* Website Logo */}
        <div className="text-lg font-bold">
          <Link to="/">IDEAIGNITE</Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            <i className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`lg:flex space-x-6 mr-7 text-sm font-medium ${
            isMenuOpen ? "block" : "hidden"
          } lg:block lg:flex-grow lg:justify-end`}
        >
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/campaigns" className="hover:underline">
            All Campaign
          </Link>
          {user && (
            <>
              <Link to="/add-campaign" className="hover:underline">
                Add New Campaign
              </Link>
              <Link to="/my-campaigns" className="hover:underline">
                My Campaign
              </Link>
              <Link to="/my-donations" className="hover:underline">
                My Donations
              </Link>
            </>
          )}
        </div>

        {/* User Section (Dark Mode & Logout) */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 border rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Conditional Login/Register or Profile */}
          {user ? (
            <>
              {/* User Avatar */}
              <div className="relative group hidden lg:flex items-center">
                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-300"
                />
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100">
                  {user.displayName || "User"}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-red-500 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-500 hover:text-white transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="text-blue-500 border border-blue-500 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                Log in
              </Link>
              <Link
                to="/auth/register"
                className="text-green-500 border border-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-white transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
