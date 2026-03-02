import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { FiSend, FiPaperclip, FiSmile } from "react-icons/fi";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import toast from "react-hot-toast";

const MessageThread = ({ conversation, onMessageSent }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useAuth();

  const otherUser =
    conversation?.recipients?.find((r) => r._id !== user._id) ||
    conversation?.sender;

  useEffect(() => {
    if (conversation) {
      loadMessages();
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/messages/conversation/${otherUser._id}`);
      setMessages(response.data.data);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const response = await api.post("/messages", {
        recipientId: otherUser._id,
        content: newMessage,
      });

      setNewMessage("");
      onMessageSent?.(response.data.data);
    } catch (error) {
      toast.error("Failed to send message");
    }
  };

  if (!conversation) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800 p-4 z-10">
        <Link
          to={`/${otherUser.username}`}
          className="flex items-center space-x-3"
        >
          <img
            src={otherUser.profilePicture || "https://via.placeholder.com/40"}
            alt={otherUser.name}
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="font-bold">{otherUser.name}</p>
            <p className="text-sm text-gray-500">@{otherUser.username}</p>
          </div>
        </Link>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-twitter-blue"></div>
          </div>
        ) : (
          messages.map((message, index) => {
            const isMe = message.sender._id === user._id;
            const showAvatar =
              index === 0 ||
              messages[index - 1].sender._id !== message.sender._id;

            return (
              <div
                key={message._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex max-w-[70%] ${isMe ? "flex-row-reverse" : "flex-row"} items-end space-x-2`}
                >
                  {!isMe && showAvatar && (
                    <img
                      src={
                        message.sender.profilePicture ||
                        "https://via.placeholder.com/32"
                      }
                      alt={message.sender.name}
                      className="h-8 w-8 rounded-full flex-shrink-0"
                    />
                  )}
                  {!isMe && !showAvatar && <div className="w-8"></div>}

                  <div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isMe
                          ? "bg-twitter-blue text-white rounded-br-none"
                          : "bg-gray-100 dark:bg-twitter-dark text-gray-800 dark:text-gray-200 rounded-bl-none"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p
                      className={`text-xs text-gray-500 mt-1 ${isMe ? "text-right" : "text-left"}`}
                    >
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="sticky bottom-0 bg-white dark:bg-twitter-darker border-t border-gray-200 dark:border-gray-800 p-4"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-twitter-blue hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
          >
            <FiPaperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-twitter-blue hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full"
          >
            <FiSmile className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Start a new message"
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-twitter-blue text-white rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageThread;

