import React, { useContext, useEffect, useState } from "react";
 // Assuming you're using AuthContext
import { Helmet } from "react-helmet-async";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";
import { AuthContext } from "../provider/AuthProvider";

const UserDonations = () => {
  const { user } = useContext(AuthContext); // Firebase থেকে ইউজার ডেটা পাওয়া
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`https://server-pied-omega.vercel.app/donation/${user.email}`)
        .then((res) => res.json())
        .then((data) => setDonations(data))
        .catch((error) => console.error("Error fetching donations:", error));
    }
  }, [user]);

  return (
    <div>
      <Helmet>
        <title>My Donation</title>
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
        <div className="p-4 mt-28 min-h-[600px]">
      <h1 className="text-2xl font-bold mb-4">My Donations</h1>
      {donations.length > 0 ? (
        <ul>
          {donations.map((donation) => (
            <li key={donation._id} className="border p-4 mb-2 rounded-md">
              <p><strong>Campaign:</strong> {donation.donorName}</p>
              <p><strong>Amount:</strong> ${donation.amount}</p>
              <p><strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations found.</p>
      )}
    </div>
    <Footer/>
    </div>
  );
};

export default UserDonations;
