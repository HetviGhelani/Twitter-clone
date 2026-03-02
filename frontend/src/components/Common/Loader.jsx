import React from "react";
import { FiLoader, FiTwitter } from "react-icons/fi";

const Loader = ({
  size = "md",
  color = "twitter-blue",
  text = "",
  fullPage = false,
  type = "spinner", // spinner, dots, pulse, twitter
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
    xl: "h-16 w-16",
  };

  const colorClasses = {
    "twitter-blue": "text-twitter-blue",
    white: "text-white",
    gray: "text-gray-500 dark:text-gray-400",
    red: "text-red-500",
    green: "text-green-500",
  };

  const renderSpinner = () => (
    <FiLoader
      className={`animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
    />
  );

  const renderDots = () => (
    <div className="flex space-x-2">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "0ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-bounce`}
        style={{ animationDelay: "300ms" }}
      ></div>
    </div>
  );

  const renderPulse = () => (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-ping`}
    />
  );

  const renderTwitter = () => (
    <FiTwitter
      className={`${sizeClasses[size]} text-twitter-blue animate-pulse`}
    />
  );

  const renderLoader = () => {
    switch (type) {
      case "spinner":
        return renderSpinner();
      case "dots":
        return renderDots();
      case "pulse":
        return renderPulse();
      case "twitter":
        return renderTwitter();
      default:
        return renderSpinner();
    }
  };

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-twitter-darker z-50">
        {renderLoader()}
        {text && (
          <p className="mt-4 text-gray-600 dark:text-gray-400 animate-pulse">
            {text}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {renderLoader()}
      {text && (
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
};

// Skeleton loaders for different components
export const TweetSkeleton = () => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 p-4 animate-pulse">
      <div className="flex space-x-3">
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
          <div className="flex justify-between max-w-md mt-4">
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700"></div>
      <div className="px-4 pb-4">
        <div className="flex justify-between items-start">
          <div className="relative -mt-12">
            <div className="h-24 w-24 bg-gray-200 dark:bg-gray-700 rounded-full border-4 border-white dark:border-twitter-darker"></div>
          </div>
          <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded-full mt-2"></div>
        </div>
        <div className="mt-4">
          <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mt-2"></div>
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
          <div className="flex gap-4 mt-4">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const FeedSkeleton = () => {
  return (
    <div>
      <div className="sticky top-0 bg-white dark:bg-twitter-darker bg-opacity-80 backdrop-blur-md z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="h-16 p-4">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-3">
          <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="flex-1">
            <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="flex justify-between mt-3">
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
      <TweetSkeleton />
      <TweetSkeleton />
      <TweetSkeleton />
    </div>
  );
};

// Loading button component
export const LoadingButton = ({ loading, children, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`relative ${props.className || ""} ${loading ? "cursor-not-allowed opacity-70" : ""}`}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <FiLoader className="h-5 w-5 animate-spin" />
        </span>
      )}
      <span className={loading ? "opacity-0" : ""}>{children}</span>
    </button>
  );
};

// Loading overlay component
export const LoadingOverlay = ({ isLoading, children }) => {
  if (!isLoading) return children;

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-white dark:bg-twitter-darker bg-opacity-75 dark:bg-opacity-75 z-10 flex items-center justify-center">
        <Loader />
      </div>
      <div className="opacity-50 pointer-events-none">{children}</div>
    </div>
  );
};

export default Loader;
