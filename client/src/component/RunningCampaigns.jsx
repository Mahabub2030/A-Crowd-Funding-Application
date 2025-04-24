import { getAuth, onAuthStateChanged } from "firebase/auth"; // Firebase Auth import
import React, { useContext, useEffect, useState } from "react";
import { Fade } from 'react-awesome-reveal'; // Import Fade animation
import { useNavigate } from "react-router-dom";
import { Typewriter } from 'react-simple-typewriter';
import { AuthContext } from "../provider/AuthProvider";

const RunningCampaigns = () => {
  const { isDarkMode } = useContext(AuthContext);  // Accessing dark mode from context
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate();
  const auth = getAuth();  // Firebase Auth instance
  const [user, setUser] = useState(null);

  // Fetch running campaigns
  useEffect(() => {
    fetch("https://server-pied-omega.vercel.app/runningCampaigns")
      .then((res) => res.json())
      .then((data) => setCampaigns(data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  // Check current user authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSeeMore = (id) => {
    if (user) {
      // If user is logged in, navigate to campaign details
      navigate(`/campaign/${id}`);
    } else {
      // If not logged in, redirect to login page
      navigate(`/campaign/${id}`);
    }
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>
      <div className="p-4 container mx-auto">
        <h1 className={`${isDarkMode ? 'text-white' : 'text-black'} text-3xl font-bold text-center mb-8`}>
          <Typewriter
            words={['Running Campaigns', 'Explore Current Projects', 'Support a Cause']}
            loop={true}
            cursor
            cursorStyle='|'
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>

        {/* Grid of Campaigns with Animation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.slice(0, 6).map((campaign, index) => (
            <Fade key={campaign._id} bottom duration={1000} delay={index * 200}> {/* Delay each fade-in effect */}
              <div className={`border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 flex flex-col ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '100%' }}>
                <img
                  src={campaign.image || "default-image.jpg"}  // Add default image or campaign image
                  alt={campaign.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-grow">
                  <h2 className={`${isDarkMode ? 'text-white' : 'text-gray-800'} text-xl font-bold mb-2`}>
                    {campaign.title}
                  </h2>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm mb-4`}>
                    Deadline: {new Date(campaign.deadline).toLocaleDateString()}
                  </p>
                </div>
                <button
                  className={`${isDarkMode ? 'bg-blue-700' : 'bg-blue-500'} px-4 py-2 text-white rounded-b-lg hover:${isDarkMode ? 'bg-blue-600' : 'bg-blue-600'} transition duration-200`}
                  onClick={() => handleSeeMore(campaign._id)}
                >
                  See More
                </button>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunningCampaigns;
