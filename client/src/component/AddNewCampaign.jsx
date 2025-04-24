import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const AddNewCampaign = () => {
 const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    type: "personal issue", // Default value for the dropdown
    description: "",
    minDonation: "",
    deadline: "",
    email: "", // Initially empty, will be updated dynamically
    userName: "", // Initially empty, will be updated dynamically
  });

  // Firebase Auth setup
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setFormData((prevData) => ({
          ...prevData,
          email: user.email,
          userName: user.displayName || "Anonymous", // Default to 'Anonymous' if displayName is not available
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Campaign Data:", formData);

    fetch('https://server-pied-omega.vercel.app/campaign', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: 'Success!',
            text: 'Campaign added successfully!',
            icon: 'success',
            confirmButtonText: 'Cool',
          });
          navigate("/campaigns");
          

          // Reset form fields
          setFormData({
            image: "",
            title: "",
            type: "personal issue",
            description: "",
            minDonation: "",
            deadline: "",
            email: formData.email, // Keep email unchanged
            userName: formData.userName, // Keep userName unchanged
          });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-32">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Campaign</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image/Thumbnail */}
        <div>
          <label htmlFor="image" className="block text-gray-700 font-medium mb-2">
            Campaign Thumbnail (Image URL)
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Enter image URL"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Campaign Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
            Campaign Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter campaign title"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Campaign Type */}
        <div>
          <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
            Campaign Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <option value="personal issue">Personal Issue</option>
            <option value="startup">Startup</option>
            <option value="business">Business</option>
            <option value="creative ideas">Creative Ideas</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter campaign description"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Minimum Donation Amount */}
        <div>
          <label htmlFor="minDonation" className="block text-gray-700 font-medium mb-2">
            Minimum Donation Amount
          </label>
          <input
            type="number"
            id="minDonation"
            name="minDonation"
            value={formData.minDonation}
            onChange={handleChange}
            placeholder="Enter minimum donation amount"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium mb-2">
            Deadline
          </label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        {/* User Email */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            User Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* User Name */}
        <div>
          <label htmlFor="userName" className="block text-gray-700 font-medium mb-2">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            readOnly
            className="w-full border border-gray-300 px-4 py-2 rounded-lg bg-gray-100 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Add Campaign
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewCampaign;
