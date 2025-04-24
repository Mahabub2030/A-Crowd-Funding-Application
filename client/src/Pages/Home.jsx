import React, { useContext, useState } from "react";
import Navbar from "../component/Navbar";
import Banner from "../component/Banner";
import Footer from "../component/Footer";
import TopCollections from "../component/TopCollection";
import RunningCampaigns from "../component/RunningCampaigns";
import { AuthContext } from "../provider/AuthProvider";
import Blogs from "../component/Blogs";
import { Helmet } from "react-helmet-async";

const Home = () => {
  const { isDarkMode } = useContext(AuthContext);
  // Toggle Dark Mode

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } min-h-screen`}
    >
      {/* Pass toggleDarkMode and isDarkMode as props */}
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Join the community and create your account."
        />
        <meta
          name="keywords"
          content="registration, signup, community, IDEAIGNITE"
        />
      </Helmet>
      <Navbar />
      <Banner />
      <RunningCampaigns />
      <TopCollections />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Home;
