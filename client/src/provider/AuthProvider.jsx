import React, { createContext, useState, useEffect } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
// Replace with your Firebase configuration file

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  

  
    const [isDarkMode, setIsDarkMode] = useState(false);
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      document.documentElement.classList.toggle("dark"); // Toggle dark mode class on the root HTML
    };


  // Create User Function
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        email: result.user.email,
        displayName: name,
        photoURL: photoURL,
      };
      setUser(newUser);
      // Update user profile in Firebase if needed (e.g., displayName, photoURL)
      console.log("User created successfully:", newUser);
    } catch (error) {
      console.error("Error creating user:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login Function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      console.log("User logged in successfully:", result.user);
    } catch (error) {
      console.error("Error logging in:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch current user on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const userInfo = {
    user,
    setUser,
    loading,
    createUser,
    login,
    logout,
    toggleDarkMode,
    isDarkMode
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
