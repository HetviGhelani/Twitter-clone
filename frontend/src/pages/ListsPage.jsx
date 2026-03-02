import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMoreHorizontal, FiUsers } from "react-icons/fi"; // Removed unused FiUser and FiEdit2
import { useAuth } from "../context/AuthContext";

const ListsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("created");
  const [showNewListModal, setShowNewListModal] = useState(false);

  // Mock lists data
  const mockLists = {
    created: [
      {
        id: 1,
        name: "Tech Influencers",
        description: "Top tech people to follow",
        memberCount: 42,
        followerCount: 128,
        isPrivate: false,
        members: [
          { username: "elonmusk", name: "Elon Musk" },
          { username: "billgates", name: "Bill Gates" },
          { username: "sama", name: "Sam Altman" },
        ],
      },
      {
        id: 2,
        name: "Design Inspiration",
        description: "UI/UX designers and artists",
        memberCount: 28,
        followerCount: 56,
        isPrivate: true,
        members: [
          { username: "figma", name: "Figma" },
          { username: "adobe", name: "Adobe" },
        ],
      },
    ],
    subscribed: [
      {
        id: 3,
        name: "JavaScript Developers",
        description: "Best JS devs on the platform",
        memberCount: 156,
        followerCount: 389,
        createdBy: { username: "jscommunity", name: "JS Community" },
        members: [
          { username: "reactjs", name: "React" },
          { username: "vuejs", name: "Vue.js" },
        ],
      },
      {
        id: 4,
        name: "Startup News",
        description: "Founders and investors",
        memberCount: 89,
        followerCount: 234,
        createdBy: { username: "techcrunch", name: "TechCrunch" },
        members: [
          { username: "ycombinator", name: "Y Combinator" },
          { username: "techstars", name: "Techstars" },
        ],
      },
    ],
  };

  const NewListModal = () => (
    <div className="modal-overlay">
      <div className="modal-content p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">
          Create new List
        </h2>

        <form>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                maxLength="25"
                className="input-primary"
                placeholder="e.g., Tech News"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                0/25
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                maxLength="100"
                rows="3"
                className="input-primary resize-none"
                placeholder="What's this list about?"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                0/100
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="private"
                className="rounded dark:bg-twitter-dark"
              />
              <label
                htmlFor="private"
                className="text-sm text-gray-700 dark:text-gray-300"
              >
                Make private
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={() => setShowNewListModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-full hover:bg-gray-50 dark:hover:bg-twitter-dark dark:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Lists</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to see your lists
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold dark:text-white">Lists</h1>
          <button
            onClick={() => setShowNewListModal(true)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
          >
            <FiPlus className="h-5 w-5 dark:text-white" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b dark:border-gray-800">
          <button
            onClick={() => setActiveTab("created")}
            className={`flex-1 py-3 font-medium transition ${
              activeTab === "created"
                ? "text-twitter-blue border-b-2 border-twitter-blue"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-twitter-dark"
            }`}
          >
            Created
          </button>
          <button
            onClick={() => setActiveTab("subscribed")}
            className={`flex-1 py-3 font-medium transition ${
              activeTab === "subscribed"
                ? "text-twitter-blue border-b-2 border-twitter-blue"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-twitter-dark"
            }`}
          >
            Subscribed
          </button>
        </div>
      </div>

      {/* Lists */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800">
        {mockLists[activeTab].length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-bold mb-2 dark:text-white">
              {activeTab === "created" ? "Create a List" : "Subscribe to Lists"}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
              {activeTab === "created"
                ? "Create Lists to organize people you follow."
                : "When you subscribe to Lists, you'll see them here."}
            </p>
          </div>
        ) : (
          mockLists[activeTab].map((list) => (
            <div
              key={list.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-twitter-dark transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link to={`/lists/${list.id}`} className="block">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-lg dark:text-white">
                        {list.name}
                      </h3>
                      {list.isPrivate && (
                        <span className="text-xs bg-gray-200 dark:bg-twitter-dark px-2 py-1 rounded-full dark:text-gray-300">
                          Private
                        </span>
                      )}
                    </div>

                    {list.description && (
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {list.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center space-x-1">
                        <FiUsers className="h-4 w-4" />
                        <span>{list.memberCount} members</span>
                      </span>
                      <span>{list.followerCount} followers</span>
                    </div>

                    {/* Member preview */}
                    <div className="flex items-center space-x-1 mt-3">
                      {list.members.slice(0, 3).map((member, index) => (
                        <img
                          key={index}
                          src={`https://via.placeholder.com/24`}
                          alt={member.name}
                          className="h-6 w-6 rounded-full border-2 border-white dark:border-twitter-darker -ml-1 first:ml-0"
                        />
                      ))}
                      {list.members.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          +{list.members.length - 3}
                        </span>
                      )}
                    </div>

                    {activeTab === "subscribed" && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Created by{" "}
                        <Link
                          to={`/${list.createdBy.username}`}
                          className="text-twitter-blue hover:underline"
                        >
                          @{list.createdBy.username}
                        </Link>
                      </p>
                    )}
                  </Link>
                </div>

                <button className="p-2 hover:bg-gray-200 dark:hover:bg-twitter-darker rounded-full">
                  <FiMoreHorizontal className="h-5 w-5 dark:text-white" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New List Modal */}
      {showNewListModal && <NewListModal />}
    </div>
  );
};

export default ListsPage;
