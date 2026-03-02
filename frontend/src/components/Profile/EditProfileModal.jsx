import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const EditProfileModal = ({ isOpen, onClose, profile }) => {
  const { updateUser } = useAuth(); // Removed unused 'user'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    bio: profile?.bio || "",
    location: profile?.location || "",
    website: profile?.website || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put("/users/profile", formData);

      if (response.data.success) {
        updateUser(response.data.data);
        toast.success("Profile updated successfully!");
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2 transition"
            >
              <FiX className="h-5 w-5 dark:text-white" />
            </button>
            <h2 className="text-xl font-bold dark:text-white">Edit Profile</h2>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                maxLength="50"
                className="input-primary"
                required
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                maxLength="160"
                rows="3"
                className="input-primary resize-none"
                placeholder="Tell us about yourself"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formData.bio.length}/160
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                maxLength="30"
                className="input-primary"
                placeholder="City, Country"
              />
            </div>

            {/* Website */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="input-primary"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
