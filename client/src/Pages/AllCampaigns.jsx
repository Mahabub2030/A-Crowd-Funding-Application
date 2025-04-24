import React, { useState } from "react";

import Footer from "../component/Footer";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import CampaignCard from "../component/CampaignCard";
import Navbar from "../component/Navbar";

const AllCampaigns = () => {
  const campaigns = useLoaderData();
  const [sortOrder, setSortOrder] = useState("asc"); // Default to ascending
  console.log(campaigns)
  // Sorting function based on minimum donation amount
  const sortCampaigns = (campaigns) => {
    return [...campaigns].sort((a, b) => {
      const minDonationA = a.minDonation || 0; // Default to 0 if no minimum donation
      const minDonationB = b.minDonation || 0;

      if (sortOrder === "asc") {
        return minDonationA - minDonationB;
      } else {
        return minDonationB - minDonationA;
      }
    });
  };

  const handleSortChange = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedCampaigns = sortCampaigns(campaigns);

  return (
    <div>
      <Helmet>
        <title>All Campaign</title>
        <meta
          name="description"
          content="Join the community and create your account."
        />
        <meta
          name="keywords"
          content="registration, signup, community, IDEAIGNITE"
        />
      </Helmet>
       <Navbar/>
      <div className="max-w-7xl mt-48 mx-auto px-4 py-8">
        {/* Sort Button */}
        <div className="mb-4 text-right">
          <button
            onClick={handleSortChange}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Sort by Minimum Donation (
            {sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>

        {/* Responsive Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sortedCampaigns.map((campaign) => (
            <CampaignCard key={campaign._id} campaign={campaign} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllCampaigns;
