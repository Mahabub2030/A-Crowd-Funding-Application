import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { AuthContext } from "../provider/AuthProvider";
// Assuming you're using AuthContext for managing Firebase auth

const DetailsPage = () => {
  const { id } = useParams();
  const [campaign, setCampaign] = useState(null);
  const { user } = useContext(AuthContext); // Get authenticated user info

  useEffect(() => {
    fetch(`https://server-pied-omega.vercel.app/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data))
      .catch((err) => console.error("Error loading campaign:", err));
  }, [id]);

  const handleDonate = () => {
    if (!user) {
      Swal.fire({
        title: "Login Required",
        text: "Please log in to make a donation.",
        icon: "warning",
        confirmButtonText: "Close",
      });
      return;
    }
  
    // Check if the deadline has passed
    const currentDate = new Date();
    const deadlineDate = new Date(campaign.deadline);
    if (currentDate > deadlineDate) {
      Swal.fire({
        title: "Campaign Closed",
        text: "The donation deadline for this campaign has passed.",
        icon: "error",
        confirmButtonText: "Close",
      });
      return;
    }
  
    const donationData = {
      campaignId: campaign._id,
      donorName: campaign.title || "Anonymous", // From Firebase user
      email: user.email, // From Firebase user
      amount: campaign.minDonation,
      image: campaign.image,
      date: new Date(),
    };
  
    fetch("https://server-pied-omega.vercel.app/donation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donationData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          Swal.fire({
            title: "Thank you!",
            text: "Your donation has been successfully processed.",
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
            confirmButtonText: "Close",
          });
        }
      })
      .catch((err) => console.error("Error donating:", err));
  };
  

  if (!campaign) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Details</title>
        <meta
          name="description"
          content="Join the community and create your account."
        />
        <meta
          name="keywords"
          content="registration, signup, community, IDEAIGNITE"
        />
      </Helmet>
      <div className="flex items-center mt-10 justify-center min-h-[700px] bg-gray-100">
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
          {/* Left Section - Image */}
          <div className="flex-1">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-full max-h-96 object-cover rounded-md"
            />
          </div>

          {/* Right Section - Details */}
          <div className="flex-1 space-y-4 px-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {campaign.title}
            </h1>
            <p className="text-gray-600">{campaign.description}</p>
            <div className="space-y-2">
              <p className="text-lg">
                Minimum Donation: <strong>${campaign.minDonation}</strong>
              </p>
              <p className="text-lg">
                Deadline:{" "}
                <strong>
                  {new Date(campaign.deadline).toLocaleDateString()}
                </strong>
              </p>
              <p className="text-lg">
                Type: <strong>{campaign.type}</strong>
              </p>
            </div>
            {/* Donate Now Button */}
            <button
              onClick={handleDonate}
              className="px-6 py-2 mt-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
            >
              Donate Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailsPage;
