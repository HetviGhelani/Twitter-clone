import React from "react";
import {
  FiAlertCircle,
  FiXCircle,
  FiInfo,
  FiAlertTriangle,
} from "react-icons/fi";

const ErrorMessage = ({
  message,
  type = "error", // error, warning, info, success
  onRetry,
  onClose,
  fullPage = false,
  className = "",
}) => {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <FiXCircle className="h-6 w-6 text-red-500" />;
      case "warning":
        return <FiAlertTriangle className="h-6 w-6 text-yellow-500" />;
      case "info":
        return <FiInfo className="h-6 w-6 text-blue-500" />;
      case "success":
        return <FiAlertCircle className="h-6 w-6 text-green-500" />;
      default:
        return <FiAlertCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case "error":
        return "bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 border-yellow-200 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border-blue-200 dark:border-blue-800";
      case "success":
        return "bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border-green-200 dark:border-green-800";
      default:
        return "bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border-red-200 dark:border-red-800";
    }
  };

  const getTextColor = () => {
    switch (type) {
      case "error":
        return "text-red-800 dark:text-red-200";
      case "warning":
        return "text-yellow-800 dark:text-yellow-200";
      case "info":
        return "text-blue-800 dark:text-blue-200";
      case "success":
        return "text-green-800 dark:text-green-200";
      default:
        return "text-red-800 dark:text-red-200";
    }
  };

  const baseClasses = fullPage
    ? "fixed inset-0 flex items-center justify-center bg-white dark:bg-twitter-darker z-50"
    : "";

  return (
    <div className={`${baseClasses} ${className}`}>
      <div className={fullPage ? "max-w-md w-full mx-4" : "w-full"}>
        <div className={`rounded-xl border p-6 ${getBgColor()}`}>
          <div className="flex items-start">
            <div className="flex-shrink-0">{getIcon()}</div>

            <div className="ml-3 flex-1">
              <h3 className={`text-sm font-medium ${getTextColor()}`}>
                {type === "error" && "Error"}
                {type === "warning" && "Warning"}
                {type === "info" && "Information"}
                {type === "success" && "Success"}
              </h3>

              <div className={`mt-2 text-sm ${getTextColor()}`}>
                <p>{message || "Something went wrong. Please try again."}</p>
              </div>

              <div className="mt-4 flex space-x-3">
                {onRetry && (
                  <button
                    onClick={onRetry}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-twitter-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twitter-blue transition"
                  >
                    Try again
                  </button>
                )}

                {onClose && (
                  <button
                    onClick={onClose}
                    type="button"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 text-sm leading-4 font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-twitter-dark hover:bg-gray-50 dark:hover:bg-twitter-darker focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-twitter-blue transition"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>

            {onClose && !fullPage && (
              <button
                onClick={onClose}
                className="ml-auto p-1.5 rounded-lg hover:bg-black hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 transition"
              >
                <FiXCircle className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Error boundary component for catching React errors
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // You can log to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage
          type="error"
          message="Something went wrong. Please refresh the page."
          onRetry={() => window.location.reload()}
          fullPage
        />
      );
    }

    return this.props.children;
  }
}

// API Error Handler
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return {
      message: error.response.data?.message || "Server error occurred",
      status: error.response.status,
    };
  } else if (error.request) {
    // Request made but no response
    return {
      message: "Network error. Please check your connection.",
      status: 0,
    };
  } else {
    // Something else happened
    return {
      message: error.message || "An unexpected error occurred",
      status: 500,
    };
  }
};

// Error message variations for common scenarios
export const ErrorMessages = {
  NETWORK:
    "Unable to connect to the server. Please check your internet connection.",
  UNAUTHORIZED: "Your session has expired. Please login again.",
  FORBIDDEN: "You don't have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  SERVER: "Server error occurred. Please try again later.",
  TWEET_TOO_LONG: "Tweet cannot exceed 280 characters.",
  TWEET_EMPTY: "Tweet cannot be empty.",
  IMAGE_TOO_LARGE: "Image size should be less than 5MB.",
  INVALID_IMAGE: "Please select a valid image file (JPEG, PNG, GIF).",
  FOLLOW_ERROR: "Unable to follow/unfollow user. Please try again.",
  LIKE_ERROR: "Unable to like/unlike tweet. Please try again.",
  DELETE_ERROR: "Unable to delete tweet. Please try again.",
  PROFILE_UPDATE_ERROR: "Unable to update profile. Please try again.",
};

export default ErrorMessage;
