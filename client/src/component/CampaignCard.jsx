import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const CampaignCard = ({ campaign }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSeeMore = (campaignId) => {
    if (user) {
      navigate(`/campaign/${campaignId}`);
    } else {
      navigate(`/campaign/${campaignId}`);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <img
        className="w-full h-48 object-cover"
        src={campaign.image}
        alt={campaign.title}
      />
      <div className="p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {campaign.title}
        </h2>
        
        <div className="mt-4 space-y-2">
          
          <div className="text-sm font-medium text-gray-500">
            <span className="text-gray-800">{new Date(campaign.deadline).toLocaleDateString()}</span>
          </div>
        </div>
        
      </div>
      <button
        onClick={() => handleSeeMore(campaign._id)}
        className="bg-blue-500 text-white px-4 py-2 w-full text-center rounded-b-lg text-sm hover:bg-blue-600 transition"
      >
        See More
      </button>
    </div>
  );
};

export default CampaignCard;
