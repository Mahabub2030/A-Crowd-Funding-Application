import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const MyCampaignCard = () => {
  const { user } = useContext(AuthContext); // Get logged-in user from AuthContext
  const [campaigns, setCampaigns] = useState(null); // Initialize as null
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`https://server-pied-omega.vercel.app/myCampaigns?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // Ensure data is an array
          if (Array.isArray(data)) {
            setCampaigns(data);
          } else {
            setCampaigns([]); // Set as empty array if data is not an array
          }
        })
        .catch((error) => console.error("Error fetching campaigns:", error));
    }
  }, [user]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://server-pied-omega.vercel.app/campaign/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your campaign has been deleted.",
                icon: "success",
              });
              setCampaigns((prevCampaigns) =>
                prevCampaigns.filter((campaign) => campaign._id !== id)
              );
            }
          });
      }
    });
  };

  return (
    <div className="p-4 mt-32 min-h-[600px]">
      <h1 className="text-center text-2xl font-bold mb-4">My Campaigns</h1>

      {/* Render campaigns based on state */}
      {campaigns === null ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : campaigns.length === 0 ? (
        <p className="text-center text-gray-500">No campaigns found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr key={campaign._id} className="border-b hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{campaign.title}</td>
                <td className="border border-gray-300 px-4 py-2">{campaign.description}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {new Date(campaign.deadline).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                  <Link to={`updateCampaign/${campaign._id}`}>
                    <button className="text-blue-500 flex items-center">
                      <FaEdit className="mr-1" /> Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(campaign._id)}
                    className="text-red-500 flex items-center"
                  >
                    <FaTrashAlt className="mr-1" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyCampaignCard;
