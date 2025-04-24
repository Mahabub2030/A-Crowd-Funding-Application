import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
 // Import AuthContext

const Register = () => {
  const { setUser } = useContext(AuthContext); // Get setUser from AuthContext
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate password
  const validatePassword = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !hasMinLength) {
      let errorMsg = "Password must contain: ";
      if (!hasUppercase) errorMsg += "an uppercase letter, ";
      if (!hasLowercase) errorMsg += "a lowercase letter, ";
      if (!hasMinLength) errorMsg += "at least 6 characters, ";
      setError(errorMsg.slice(0, -2));
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!validatePassword(password)) {
      toast.error("Password does not meet the requirements.");
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await updateProfile(user, {
        displayName: name,
        photoURL: photoURL || "",
      });
  
      // Update user in context
      setUser({
        displayName: name,
        email: email,
        photoURL: photoURL || "",
        uid: user.uid,
      });
  
      // Show SweetAlert2 success message
      Swal.fire({
        title: "Registration Successful!",
        text: "You have successfully created an account.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/"); // Redirect to home page after closing the alert
      });
    } catch (error) {
      setError(error.message);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-3/4">
        {/* Left Side - Card Section */}
        <div className="relative lg:w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full">
            <img
              className="w-full max-h-[500px] object-cover"
              src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto/static_images/signup_static_image"
              alt="Sample Product"
            />
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Join the community</h2>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="url"
              placeholder="Photo URL (optional)"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                error ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
            >
              Create Account
            </button>
          </form>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
