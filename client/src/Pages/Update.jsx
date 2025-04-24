import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../component/Footer";
import Navbar from "../component/Navbar";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    minDonation: "",
    deadline: "",
    type: ""
  });

  // Fetch campaign details
  useEffect(() => {
    fetch(`https://server-pied-omega.vercel.app/campaign/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCampaign(data);
        setFormData({
          title: data.title,
          description: data.description,
          minDonation: data.minDonation,
          deadline: data.deadline.split("T")[0], // Format for date input
          type: data.type
        });
      })
      .catch((err) => console.error("Error fetching campaign:", err));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch(`https://server-pied-omega.vercel.app/campaign/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          // Success Alert
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Campaign updated successfully!",
          }).then(() => {
            // Navigate to My Campaigns page after alert
            navigate("/my-campaigns");
          });
        } else {
          // Warning Alert if no changes were made
          Swal.fire({
            icon: "warning",
            title: "No Changes",
            text: "No updates were made to the campaign.",
          });
        }
      })
      .catch((err) => {
        console.error("Error updating campaign:", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update the campaign. Please try again later.",
        });
      });
  };
  

  if (!campaign) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="p-4 max-w-3xl mt-32 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Update Campaign</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Minimum Donation:</label>
            <input
              type="number"
              name="minDonation"
              value={formData.minDonation}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Deadline:</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-medium">Type:</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update Campaign
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Update;
