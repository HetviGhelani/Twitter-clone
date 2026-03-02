import React from "react";
import {
  FiEye,
  FiHeart,
  FiRepeat,
  FiMessageCircle,
  FiBarChart2,
} from "react-icons/fi";

const TweetAnalytics = ({ tweet }) => {
  const analytics = {
    impressions: Math.floor(Math.random() * 10000) + 1000,
    engagements: Math.floor(Math.random() * 5000) + 500,
    detailExpands: Math.floor(Math.random() * 2000) + 200,
    profileClicks: Math.floor(Math.random() * 1000) + 100,
    linkClicks: Math.floor(Math.random() * 500) + 50,
  };

  const engagementRate = (
    (analytics.engagements / analytics.impressions) *
    100
  ).toFixed(1);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-xl font-bold">Tweet Analytics</h2>

      {/* Overview */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <FiEye className="h-5 w-5" />
            <span className="text-sm">Impressions</span>
          </div>
          <p className="text-2xl font-bold">
            {analytics.impressions.toLocaleString()}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-2xl">
          <div className="flex items-center space-x-2 text-gray-500 mb-2">
            <FiBarChart2 className="h-5 w-5" />
            <span className="text-sm">Engagement rate</span>
          </div>
          <p className="text-2xl font-bold">{engagementRate}%</p>
        </div>
      </div>

      {/* Engagement Breakdown */}
      <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
        <h3 className="font-bold mb-4">Engagement breakdown</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiHeart className="h-5 w-5 text-red-500" />
              <span>Likes</span>
            </div>
            <span className="font-bold">{tweet.likes?.length || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiRepeat className="h-5 w-5 text-green-500" />
              <span>Retweets</span>
            </div>
            <span className="font-bold">{tweet.retweets?.length || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiMessageCircle className="h-5 w-5 text-twitter-blue" />
              <span>Replies</span>
            </div>
            <span className="font-bold">{tweet.replies?.length || 0}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>🔗</span>
              <span>Link clicks</span>
            </div>
            <span className="font-bold">{analytics.linkClicks}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>👤</span>
              <span>Profile clicks</span>
            </div>
            <span className="font-bold">{analytics.profileClicks}</span>
          </div>
        </div>
      </div>

      {/* Additional metrics */}
      <div className="bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
        <h3 className="font-bold mb-4">Additional metrics</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Detail expands</span>
            <span>{analytics.detailExpands.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">New followers</span>
            <span>+{Math.floor(analytics.engagements / 10)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Total engagements</span>
            <span>{analytics.engagements.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetAnalytics;
