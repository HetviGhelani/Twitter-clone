import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/Layout/Layout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";
import SingleTweetPage from "./pages/SingleTweetPage";
import NotificationsPage from "./pages/NotificationsPage";
import MessagesPage from "./pages/MessagesPage";
import BookmarksPage from "./pages/BookmarksPage";
import ListsPage from "./pages/ListsPage";
import MorePage from "./pages/MorePage";
import HashtagPage from "./pages/HashtagPage";
import FollowersPage from "./pages/FollowersPage";
import FollowingPage from "./pages/FollowingPage";
import SettingsPage from "./pages/SettingsPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import HelpPage from "./pages/HelpPage";

// Loading component with better styling
const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen bg-white dark:bg-twitter-darker">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700 border-t-twitter-blue mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">
        Loading your Twitter clone...
      </p>
    </div>
  </div>
);

// Error boundary component for route errors
const ErrorElement = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-twitter-darker">
    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
      404
    </h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">Page not found</p>
    <button
      onClick={() => (window.location.href = "/")}
      className="bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600 transition"
    >
      Go Home
    </button>
  </div>
);

// Private Route wrapper with better handling
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route wrapper (redirects to home if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/help" element={<HelpPage />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {/* Main Routes */}
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route path="lists" element={<ListsPage />} />
        <Route path="more" element={<MorePage />} />

        {/* Profile Routes */}
        <Route path=":username" element={<ProfilePage />} />
        <Route
          path=":username/with_replies"
          element={<ProfilePage tab="replies" />}
        />
        <Route path=":username/media" element={<ProfilePage tab="media" />} />
        <Route path=":username/likes" element={<ProfilePage tab="likes" />} />

        {/* Follow Routes */}
        <Route path=":username/followers" element={<FollowersPage />} />
        <Route path=":username/following" element={<FollowingPage />} />
        <Route
          path=":username/followers_you_follow"
          element={<FollowersPage mutual />}
        />

        {/* Tweet Routes */}
        <Route path="tweet/:id" element={<SingleTweetPage />} />
        <Route
          path="tweet/:id/analytics"
          element={<SingleTweetPage tab="analytics" />}
        />
        <Route
          path="tweet/:id/retweeters"
          element={<SingleTweetPage tab="retweeters" />}
        />
        <Route
          path="tweet/:id/likers"
          element={<SingleTweetPage tab="likers" />}
        />

        {/* Hashtag Routes */}
        <Route path="hashtag/:tag" element={<HashtagPage />} />
        <Route
          path="hashtag/:tag/photo"
          element={<HashtagPage filter="media" />}
        />
        <Route
          path="hashtag/:tag/latest"
          element={<HashtagPage filter="latest" />}
        />
        <Route
          path="hashtag/:tag/people"
          element={<HashtagPage filter="people" />}
        />

        {/* List Routes */}
        <Route path="lists" element={<ListsPage />} />
        <Route path="lists/:listId" element={<ListsPage view="detail" />} />
        <Route
          path="lists/:listId/members"
          element={<ListsPage view="members" />}
        />
        <Route
          path="lists/:listId/members/add"
          element={<ListsPage view="addMembers" />}
        />
        <Route
          path="lists/:listId/subscribers"
          element={<ListsPage view="subscribers" />}
        />
        <Route path="lists/:listId/edit" element={<ListsPage view="edit" />} />
        <Route path="lists/discover" element={<ListsPage view="discover" />} />
        <Route
          path="lists/discover/new"
          element={<ListsPage view="create" />}
        />

        {/* Message Routes */}
        <Route path="messages" element={<MessagesPage />} />
        <Route
          path="messages/:conversationId"
          element={<MessagesPage view="conversation" />}
        />
        <Route
          path="messages/:conversationId/info"
          element={<MessagesPage view="info" />}
        />
        <Route
          path="messages/requests"
          element={<MessagesPage view="requests" />}
        />
        <Route
          path="messages/settings"
          element={<MessagesPage view="settings" />}
        />
        <Route path="messages/new" element={<MessagesPage view="new" />} />
        <Route
          path="messages/new/group"
          element={<MessagesPage view="newGroup" />}
        />
        <Route
          path="messages/new/:username"
          element={<MessagesPage view="newDM" />}
        />

        {/* Notification Routes */}
        <Route path="notifications" element={<NotificationsPage />} />
        <Route
          path="notifications/mentions"
          element={<NotificationsPage filter="mentions" />}
        />
        <Route
          path="notifications/likes"
          element={<NotificationsPage filter="likes" />}
        />
        <Route
          path="notifications/retweets"
          element={<NotificationsPage filter="retweets" />}
        />
        <Route
          path="notifications/follows"
          element={<NotificationsPage filter="follows" />}
        />
        <Route
          path="notifications/all"
          element={<NotificationsPage filter="all" />}
        />

        {/* Settings Routes */}
        <Route path="settings" element={<SettingsPage />} />
        <Route
          path="settings/profile"
          element={<SettingsPage tab="profile" />}
        />
        <Route
          path="settings/account"
          element={<SettingsPage tab="account" />}
        />
        <Route
          path="settings/privacy"
          element={<SettingsPage tab="privacy" />}
        />
        <Route
          path="settings/security"
          element={<SettingsPage tab="security" />}
        />
        <Route
          path="settings/notifications"
          element={<SettingsPage tab="notifications" />}
        />
        <Route
          path="settings/accessibility"
          element={<SettingsPage tab="accessibility" />}
        />
        <Route path="settings/data" element={<SettingsPage tab="data" />} />
        <Route path="settings/apps" element={<SettingsPage tab="apps" />} />
        <Route path="settings/help" element={<SettingsPage tab="help" />} />
        <Route
          path="settings/feedback"
          element={<SettingsPage tab="feedback" />}
        />
        <Route path="settings/about" element={<SettingsPage tab="about" />} />
        <Route
          path="settings/account/deactivate"
          element={<SettingsPage tab="deactivate" />}
        />
        <Route
          path="settings/account/delete"
          element={<SettingsPage tab="delete" />}
        />
        <Route
          path="settings/privacy/audience"
          element={<SettingsPage tab="audience" />}
        />
        <Route
          path="settings/privacy/tags"
          element={<SettingsPage tab="tags" />}
        />
        <Route
          path="settings/privacy/location"
          element={<SettingsPage tab="location" />}
        />
        <Route
          path="settings/security/login"
          element={<SettingsPage tab="login" />}
        />
        <Route
          path="settings/security/2fa"
          element={<SettingsPage tab="2fa" />}
        />
        <Route
          path="settings/security/password"
          element={<SettingsPage tab="password" />}
        />
        <Route
          path="settings/security/devices"
          element={<SettingsPage tab="devices" />}
        />
        <Route
          path="settings/security/sessions"
          element={<SettingsPage tab="sessions" />}
        />
        <Route
          path="settings/notifications/filters"
          element={<SettingsPage tab="filters" />}
        />
        <Route
          path="settings/notifications/preferences"
          element={<SettingsPage tab="preferences" />}
        />
        <Route
          path="settings/accessibility/display"
          element={<SettingsPage tab="display" />}
        />
        <Route
          path="settings/accessibility/keyboard"
          element={<SettingsPage tab="keyboard" />}
        />
        <Route
          path="settings/accessibility/vision"
          element={<SettingsPage tab="vision" />}
        />
        <Route
          path="settings/accessibility/hearing"
          element={<SettingsPage tab="hearing" />}
        />
        <Route
          path="settings/accessibility/mobility"
          element={<SettingsPage tab="mobility" />}
        />
        <Route
          path="settings/data/download"
          element={<SettingsPage tab="download" />}
        />
        <Route
          path="settings/data/offline"
          element={<SettingsPage tab="offline" />}
        />
        <Route
          path="settings/data/cache"
          element={<SettingsPage tab="cache" />}
        />
        <Route
          path="settings/apps/connected"
          element={<SettingsPage tab="connected" />}
        />
        <Route
          path="settings/apps/sessions"
          element={<SettingsPage tab="sessions" />}
        />
        <Route
          path="settings/apps/revoked"
          element={<SettingsPage tab="revoked" />}
        />
      </Route>

      {/* 404 - Catch all unmatched routes */}
      <Route path="*" element={<ErrorElement />} />
    </Routes>
  );
}

export default App;
