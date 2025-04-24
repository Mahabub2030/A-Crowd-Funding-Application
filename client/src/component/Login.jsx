import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router-dom"; // Import Link
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider(); // Google Provider

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user in context
      setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      setError("");
      navigate("/"); // Redirect to home page after successful login

      // Show SweetAlert2 for successful login
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        timer: 2000, // 2 seconds before auto-close
        showConfirmButton: false
      });
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Update user in context
      setUser({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid,
      });

      setError("");
      navigate("/"); // Redirect to home page after successful login

      // Show SweetAlert2 for successful login
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
        timer: 2000, // 2 seconds before auto-close
        showConfirmButton: false
      });
    } catch (err) {
      setError("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 lg:p-12">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full lg:w-3/4">
        <div className="relative lg:w-1/2 bg-gray-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full">
            <img
              src="https://c4.iggcdn.com/indiegogo-media-prod-cld/image/upload/c_fit,g_center,q_auto,f_auto/static_images/signup_static_image"
              alt="Login Illustration"
              className="w-full max-h-[500px] object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Welcome back</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form className="space-y-6" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right">
              <a href="#" className="text-sm text-pink-500 hover:underline">
                Forgot password?
              </a>
            </div>
            <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition">
              LOG IN
            </button>
          </form>

          {/* Google Login Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-100 transition w-full"
            >
              <i className="fab fa-google text-red-600 mr-2"></i>
              CONTINUE WITH GOOGLE
            </button>
          </div>

          {/* Register Link */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-pink-500 hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
