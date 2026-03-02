import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiHelpCircle,
  FiSearch,
  FiMail,
  FiMessageCircle,
  FiBook,
  FiVideo,
  FiUsers,
  FiShield,
} from "react-icons/fi";

const HelpPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const helpTopics = [
    {
      title: "Getting Started",
      description: "New to Twitter Clone? Learn the basics",
      icon: FiBook,
      articles: 12,
    },
    {
      title: "Account Settings",
      description: "Manage your account and privacy",
      icon: FiUsers,
      articles: 8,
    },
    {
      title: "Troubleshooting",
      description: "Fix common issues",
      icon: FiHelpCircle,
      articles: 15,
    },
    {
      title: "Safety Center",
      description: "Stay safe on Twitter Clone",
      icon: FiShield,
      articles: 10,
    },
    {
      title: "Video Tutorials",
      description: "Watch step-by-step guides",
      icon: FiVideo,
      articles: 6,
    },
    {
      title: "Contact Us",
      description: "Get in touch with our support team",
      icon: FiMessageCircle,
      articles: 4,
    },
  ];

  const faqs = [
    {
      question: "How do I change my profile picture?",
      answer:
        'Go to your profile, click on your current profile picture, and select "Upload new photo". Make sure the image is under 5MB.',
    },
    {
      question: "Why can't I post a tweet?",
      answer:
        "Tweets are limited to 280 characters. Make sure your tweet is within this limit and that you have a stable internet connection.",
    },
    {
      question: "How do I delete a tweet?",
      answer:
        'Click on the three dots menu on your tweet and select "Delete". This action cannot be undone.',
    },
    {
      question: "How do I report inappropriate content?",
      answer:
        'Click on the three dots menu on any tweet and select "Report". Our team will review it within 24 hours.',
    },
    {
      question: "How do I reset my password?",
      answer:
        'Go to the login page and click "Forgot password". Follow the instructions sent to your email.',
    },
    {
      question: "How do I enable dark mode?",
      answer: "Go to Settings > Display and toggle the dark mode option.",
    },
  ];

  const filteredTopics = helpTopics.filter(
    (topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white dark:bg-twitter-darker">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800 p-4 z-10">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2 transition"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <FiHelpCircle className="h-6 w-6 text-twitter-blue" />
              <h1 className="text-xl font-bold">Help Center</h1>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-80">
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-twitter-dark rounded-full focus:outline-none focus:ring-2 focus:ring-twitter-blue dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How can we help you?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Search our help center or browse topics below
          </p>
        </div>

        {/* Help Topics Grid */}
        {!searchQuery && (
          <>
            <h3 className="text-2xl font-bold mb-6">Browse by Topic</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {helpTopics.map((topic, index) => {
                const Icon = topic.icon;
                return (
                  <div
                    key={index}
                    className="p-6 border border-gray-200 dark:border-gray-700 rounded-2xl hover:shadow-lg transition cursor-pointer group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-twitter-blue bg-opacity-10 rounded-xl group-hover:bg-twitter-blue group-hover:text-white transition">
                        <Icon className="h-6 w-6 text-twitter-blue group-hover:text-white" />
                      </div>
                      <span className="text-sm text-gray-500">
                        {topic.articles} articles
                      </span>
                    </div>
                    <h4 className="font-bold text-lg mb-2">{topic.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {topic.description}
                    </p>
                    <button className="mt-4 text-twitter-blue text-sm font-medium hover:underline">
                      View articles →
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-r from-twitter-blue to-purple-600 rounded-2xl p-8 text-white mb-12">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Still need help?</h3>
                  <p className="opacity-90">
                    Can't find what you're looking for? Contact our support team
                  </p>
                </div>
                <button className="bg-white text-twitter-blue px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition flex items-center space-x-2">
                  <FiMail className="h-5 w-5" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {searchQuery &&
        (filteredTopics.length > 0 || filteredFaqs.length > 0) ? (
          <div className="space-y-8">
            {filteredTopics.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Topics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTopics.map((topic, index) => {
                    const Icon = topic.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-twitter-dark"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="h-5 w-5 text-twitter-blue" />
                          <div>
                            <h4 className="font-bold">{topic.title}</h4>
                            <p className="text-sm text-gray-500">
                              {topic.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {filteredFaqs.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-twitter-dark"
                    >
                      <h4 className="font-bold mb-2">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-16">
            <FiHelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">No results found</h3>
            <p className="text-gray-500">
              We couldn't find any articles matching "{searchQuery}"
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-twitter-blue hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : null}

        {/* FAQ Section */}
        {!searchQuery && (
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Frequently Asked Questions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.slice(0, 4).map((faq, index) => (
                <div
                  key={index}
                  className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-twitter-dark"
                >
                  <h4 className="font-bold mb-2">{faq.question}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-6">
              <button className="text-twitter-blue font-bold hover:underline">
                View all FAQs →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpPage;
