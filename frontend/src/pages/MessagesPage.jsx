import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FiSearch, FiSend, FiMoreHorizontal } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const MessagesPage = () => {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      user: {
        username: "johndoe",
        name: "John Doe",
        profilePicture: null,
        isOnline: true,
      },
      lastMessage: {
        content: "Hey, how are you?",
        createdAt: new Date(),
        isRead: false,
      },
      unreadCount: 2,
    },
    {
      id: 2,
      user: {
        username: "janedoe",
        name: "Jane Doe",
        profilePicture: null,
        isOnline: false,
      },
      lastMessage: {
        content: "See you tomorrow!",
        createdAt: new Date(Date.now() - 1000 * 60 * 30),
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: 3,
      user: {
        username: "bobsmith",
        name: "Bob Smith",
        profilePicture: null,
        isOnline: true,
      },
      lastMessage: {
        content: "Thanks for the help",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      id: 4,
      user: {
        username: "alicewonder",
        name: "Alice Wonder",
        profilePicture: null,
        isOnline: false,
      },
      lastMessage: {
        content: "Did you see the game last night?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
        isRead: true,
      },
      unreadCount: 0,
    },
  ];

  // Mock messages for selected chat
  const mockMessages = [
    {
      id: 1,
      sender: "johndoe",
      content: "Hey, how are you?",
      createdAt: new Date(Date.now() - 1000 * 60 * 60),
      isMe: false,
    },
    {
      id: 2,
      sender: "currentUser",
      content: "I'm good, thanks! How about you?",
      createdAt: new Date(Date.now() - 1000 * 60 * 30),
      isMe: true,
    },
    {
      id: 3,
      sender: "johndoe",
      content: "Doing great! Want to grab coffee later?",
      createdAt: new Date(Date.now() - 1000 * 60 * 10),
      isMe: false,
    },
  ];

  const conversations = mockConversations.filter(
    (conv) =>
      conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    console.log("Sending message:", messageInput);
    setMessageInput("");
  };

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Messages</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please login to see your messages
        </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex">
      {/* Conversations List */}
      <div
        className={`${selectedChat ? "hidden md:block" : "block"} md:w-4/12 border-r border-gray-200 dark:border-gray-800 h-full flex flex-col`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-twitter-darker p-4 border-b dark:border-gray-800">
          <h1 className="text-xl font-bold dark:text-white">Messages</h1>

          {/* Search */}
          <div className="mt-2 relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages"
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue dark:text-white"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No conversations found
            </div>
          ) : (
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv)}
                className={`p-4 border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-twitter-dark cursor-pointer transition ${
                  selectedChat?.id === conv.id
                    ? "bg-gray-50 dark:bg-twitter-dark"
                    : ""
                }`}
              >
                <div className="flex space-x-3">
                  <div className="relative">
                    <img
                      src={
                        conv.user.profilePicture ||
                        "https://via.placeholder.com/48"
                      }
                      alt={conv.user.name}
                      className="h-12 w-12 rounded-full"
                    />
                    {conv.user.isOnline && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-twitter-darker"></span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold truncate dark:text-white">
                        {conv.user.name}
                      </h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDistanceToNow(
                          new Date(conv.lastMessage.createdAt),
                          { addSuffix: true },
                        )}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {conv.lastMessage.content}
                    </p>

                    {conv.unreadCount > 0 && (
                      <span className="inline-block mt-1 px-2 py-1 bg-twitter-blue text-white text-xs rounded-full">
                        {conv.unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`${selectedChat ? "block" : "hidden"} md:block md:w-8/12 h-full flex flex-col`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="sticky top-0 bg-white dark:bg-twitter-darker p-4 border-b dark:border-gray-800 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="md:hidden mr-2 dark:text-white"
                >
                  ←
                </button>
                <img
                  src={
                    selectedChat.user.profilePicture ||
                    "https://via.placeholder.com/40"
                  }
                  alt={selectedChat.user.name}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <Link
                    to={`/${selectedChat.user.username}`}
                    className="font-bold hover:underline dark:text-white"
                  >
                    {selectedChat.user.name}
                  </Link>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {selectedChat.user.isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full">
                <FiMoreHorizontal className="h-5 w-5 dark:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {mockMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  {!msg.isMe && (
                    <img
                      src={
                        selectedChat.user.profilePicture ||
                        "https://via.placeholder.com/32"
                      }
                      alt={selectedChat.user.name}
                      className="h-8 w-8 rounded-full mr-2 self-end"
                    />
                  )}
                  <div
                    className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2 ${
                      msg.isMe
                        ? "bg-twitter-blue text-white rounded-br-none"
                        : "bg-gray-100 dark:bg-twitter-dark text-gray-800 dark:text-gray-200 rounded-bl-none"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <p
                      className={`text-xs mt-1 ${msg.isMe ? "text-blue-100" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {formatDistanceToNow(new Date(msg.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t dark:border-gray-800"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Start a new message"
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue dark:text-white"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="p-2 bg-twitter-blue text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiSend className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-2 dark:text-white">
                Your messages
              </h3>
              <p className="mb-4">
                Send private photos and messages to a friend
              </p>
              <button className="bg-twitter-blue text-white px-6 py-3 rounded-full font-bold hover:bg-blue-600">
                Start a conversation
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;
