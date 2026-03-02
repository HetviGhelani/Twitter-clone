// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   timeout: 10000, // 10 seconds timeout
// });

// // Request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     console.log("Making request to:", config.url, config.data); // Debug log
//     return config;
//   },
//   (error) => {
//     console.error("Request error:", error);
//     return Promise.reject(error);
//   },
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => {
//     console.log("Response received:", response.data); // Debug log
//     return response;
//   },
//   (error) => {
//     console.error("Response error:", {
//       url: error.config?.url,
//       method: error.config?.method,
//       data: error.config?.data,
//       status: error.response?.status,
//       statusText: error.response?.statusText,
//       data: error.response?.data,
//     });

//     if (error.code === "ECONNABORTED") {
//       console.error("Request timeout");
//       return Promise.reject(new Error("Request timeout. Please try again."));
//     }

//     if (!error.response) {
//       console.error("Network error - backend might be down");
//       return Promise.reject(
//         new Error("Network error. Please check if backend is running."),
//       );
//     }

//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   },
// );

// export default api;

import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Making request to:", config.url, config.data);
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.data);
    return response;
  },
  (error) => {
    console.error("Response error:", {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data,
      status: error.response?.status,
      statusText: error.response?.statusText,
      responseData: error.response?.data, // Changed from 'data' to 'responseData' to avoid duplicate key
    });

    if (error.code === "ECONNABORTED") {
      console.error("Request timeout");
      return Promise.reject(new Error("Request timeout. Please try again."));
    }

    if (!error.response) {
      console.error("Network error - backend might be down");
      return Promise.reject(
        new Error("Network error. Please check if backend is running."),
      );
    }

    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default api;
