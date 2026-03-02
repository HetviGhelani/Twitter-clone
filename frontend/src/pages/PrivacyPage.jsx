import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiShield,
  FiCalendar,
  FiChevronRight,
  FiChevronDown,
  FiDownload,
  FiPrinter,
  FiShare2,
  FiLock,
  FiEye,
  FiDatabase,
  FiAlertCircle,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiInfo,
  FiSettings,
  FiToggleRight,
} from "react-icons/fi"; // Removed FiCookie
import toast from "react-hot-toast";

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const [expandedSections, setExpandedSections] = useState({});
  const [fontSize, setFontSize] = useState("medium");
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  const lastUpdated = "March 1, 2026";
  const effectiveDate = "March 15, 2026";
  const version = "3.0.0";

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = document.getElementById("privacy-content").innerText;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Twitter-Clone-Privacy-Policy-${lastUpdated}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Privacy Policy downloaded");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const handleCookieChange = (type) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
    toast.success(`Cookie preferences updated`);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "small":
        return "text-sm";
      case "large":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      icon: "📋",
      content: (
        <div className="space-y-4">
          <p className="font-medium">
            Welcome to Twitter Clone's Privacy Policy
          </p>
          <p>
            Your privacy is important to us. It is Twitter Clone's policy to
            respect your privacy regarding any information we may collect from
            you across our website and other sites we own and operate.
          </p>
          <p>
            This Privacy Policy explains what information we collect, why we
            collect it, how we use it, and your rights regarding your
            information. By using our Services, you agree to the collection and
            use of information in accordance with this policy.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm flex items-start space-x-2">
              <FiShield className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Our Commitment:</strong> We are committed to protecting
                your privacy and being transparent about our data practices.
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "collection",
      title: "2. Information We Collect",
      icon: "📊",
      content: (
        <div className="space-y-4">
          <h4 className="font-bold">2.1 Information You Provide</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> When you register, we
              collect your name, email address, username, and password
            </li>
            <li>
              <strong>Profile Information:</strong> Bio, profile picture,
              location, website, and any other information you add to your
              profile
            </li>
            <li>
              <strong>Content:</strong> Tweets, messages, photos, and other
              content you post
            </li>
            <li>
              <strong>Communications:</strong> When you contact us, we collect
              your messages and any other information you provide
            </li>
          </ul>

          <h4 className="font-bold mt-4">
            2.2 Information Collected Automatically
          </h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Usage Data:</strong> How you interact with our Services,
              including the features you use, the content you view, and your
              actions
            </li>
            <li>
              <strong>Device Information:</strong> IP address, browser type,
              operating system, device identifiers, and mobile network
              information
            </li>
            <li>
              <strong>Location Data:</strong> General location based on IP
              address (you can disable precise location in your device settings)
            </li>
            <li>
              <strong>Cookies:</strong> We use cookies and similar technologies
              to collect information
            </li>
          </ul>

          <h4 className="font-bold mt-4">2.3 Information from Third Parties</h4>
          <ul className="list-disc pl-6">
            <li>
              If you choose to link your account with third-party services, we
              may receive information from those services
            </li>
            <li>
              We may receive information about you from other users (e.g., when
              they mention you or share your content)
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "usage",
      title: "3. How We Use Your Information",
      icon: "⚙️",
      content: (
        <div className="space-y-4">
          <p>We use the information we collect for various purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>To Provide and Maintain Services:</strong> Create and
              manage your account, process your content, and enable
              communication between users
            </li>
            <li>
              <strong>To Improve Services:</strong> Analyze usage patterns, fix
              bugs, and develop new features
            </li>
            <li>
              <strong>To Personalize Experience:</strong> Customize content and
              recommendations based on your interests
            </li>
            <li>
              <strong>To Communicate:</strong> Send you updates, security
              alerts, and support messages
            </li>
            <li>
              <strong>To Ensure Safety:</strong> Detect and prevent fraud, spam,
              and abuse
            </li>
            <li>
              <strong>To Comply with Law:</strong> Fulfill legal obligations and
              enforce our Terms of Service
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "sharing",
      title: "4. How We Share Your Information",
      icon: "🤝",
      content: (
        <div className="space-y-4">
          <p>We may share your information in the following situations:</p>

          <h4 className="font-bold mt-2">4.1 With Your Consent</h4>
          <p>
            We will share your information when you explicitly direct us to do
            so.
          </p>

          <h4 className="font-bold mt-4">4.2 Public Information</h4>
          <p>
            Your profile information and tweets are public by default and can be
            seen by anyone. Think carefully before sharing personal information
            publicly.
          </p>

          <h4 className="font-bold mt-4">4.3 Service Providers</h4>
          <p>
            We may share information with third-party vendors who help us
            operate our Services (e.g., hosting, analytics, customer support).
            These providers are bound by confidentiality agreements.
          </p>

          <h4 className="font-bold mt-4">4.4 Legal Requirements</h4>
          <p>
            We may disclose information if required by law, court order, or
            government request, or to protect our rights, property, or safety.
          </p>

          <h4 className="font-bold mt-4">4.5 Business Transfers</h4>
          <p>
            In the event of a merger, acquisition, or sale of assets, your
            information may be transferred as part of the transaction.
          </p>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "5. Cookies & Tracking Technologies",
      icon: "🍪",
      content: (
        <div className="space-y-4">
          <p>
            We use cookies and similar tracking technologies to track activity
            on our Services and hold certain information. Cookies are files with
            small amount of data which may include an anonymous unique
            identifier.
          </p>

          <h4 className="font-bold mt-4">Types of Cookies We Use:</h4>

          <div className="space-y-3 mt-2">
            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-twitter-dark rounded-lg">
              <div>
                <p className="font-bold">Necessary Cookies</p>
                <p className="text-sm text-gray-500">
                  Essential for the website to function properly
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookiePreferences.necessary}
                onChange={() => handleCookieChange("necessary")}
                className="h-5 w-5 text-twitter-blue rounded"
                disabled
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-twitter-dark rounded-lg">
              <div>
                <p className="font-bold">Functional Cookies</p>
                <p className="text-sm text-gray-500">
                  Remember your preferences and settings
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookiePreferences.functional}
                onChange={() => handleCookieChange("functional")}
                className="h-5 w-5 text-twitter-blue rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-twitter-dark rounded-lg">
              <div>
                <p className="font-bold">Analytics Cookies</p>
                <p className="text-sm text-gray-500">
                  Help us understand how visitors use our site
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookiePreferences.analytics}
                onChange={() => handleCookieChange("analytics")}
                className="h-5 w-5 text-twitter-blue rounded"
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-twitter-dark rounded-lg">
              <div>
                <p className="font-bold">Marketing Cookies</p>
                <p className="text-sm text-gray-500">
                  Used to deliver relevant advertisements
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookiePreferences.marketing}
                onChange={() => handleCookieChange("marketing")}
                className="h-5 w-5 text-twitter-blue rounded"
              />
            </div>
          </div>

          <button className="mt-2 text-twitter-blue text-sm hover:underline">
            Save Cookie Preferences
          </button>
        </div>
      ),
    },
    {
      id: "rights",
      title: "6. Your Rights & Choices",
      icon: "⚖️",
      content: (
        <div className="space-y-4">
          <p>
            Depending on your location, you may have certain rights regarding
            your personal information:
          </p>

          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Access:</strong> Request a copy of the information we hold
              about you
            </li>
            <li>
              <strong>Correction:</strong> Update or correct inaccurate
              information
            </li>
            <li>
              <strong>Deletion:</strong> Request deletion of your information
              (subject to legal requirements)
            </li>
            <li>
              <strong>Restriction:</strong> Limit how we use your information
            </li>
            <li>
              <strong>Portability:</strong> Receive your information in a
              structured, commonly used format
            </li>
            <li>
              <strong>Objection:</strong> Object to certain processing
              activities
            </li>
            <li>
              <strong>Withdraw Consent:</strong> Withdraw consent at any time
              (doesn't affect prior processing)
            </li>
          </ul>

          <p className="mt-4">
            To exercise these rights, please contact us using the information in
            Section 11.
          </p>
        </div>
      ),
    },
    {
      id: "security",
      title: "7. Data Security",
      icon: "🔒",
      content: (
        <div className="space-y-4">
          <p>
            We implement appropriate technical and organizational measures to
            protect your information:
          </p>

          <ul className="list-disc pl-6">
            <li>Encryption of data in transit (SSL/TLS)</li>
            <li>Encryption of sensitive data at rest</li>
            <li>Regular security assessments and audits</li>
            <li>Access controls and authentication requirements</li>
            <li>Employee training on data protection</li>
          </ul>

          <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-lg mt-2">
            <p className="text-sm flex items-start space-x-2">
              <FiAlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Please Note:</strong> No method of transmission over the
                Internet or electronic storage is 100% secure. While we strive
                to protect your information, we cannot guarantee absolute
                security.
              </span>
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "retention",
      title: "8. Data Retention",
      icon: "⏱️",
      content: (
        <div className="space-y-4">
          <p>
            We retain your information for as long as your account is active or
            as needed to provide you Services. We may retain certain information
            even after you close your account if necessary to:
          </p>

          <ul className="list-disc pl-6">
            <li>Comply with legal obligations</li>
            <li>Resolve disputes</li>
            <li>Enforce our agreements</li>
            <li>Protect against fraud and abuse</li>
          </ul>

          <p>
            When we no longer need your information, we will securely delete or
            anonymize it.
          </p>
        </div>
      ),
    },
    {
      id: "children",
      title: "9. Children's Privacy",
      icon: "🧒",
      content: (
        <div className="space-y-4">
          <p>
            Our Services are not intended for children under 13. We do not
            knowingly collect personal information from children under 13. If
            you are a parent or guardian and believe your child has provided us
            with personal information, please contact us.
          </p>

          <p>
            If we become aware that we have collected personal information from
            a child under 13 without verification of parental consent, we will
            take steps to delete that information.
          </p>
        </div>
      ),
    },
    {
      id: "international",
      title: "10. International Data Transfers",
      icon: "🌍",
      content: (
        <div className="space-y-4">
          <p>
            Your information may be transferred to and processed in countries
            other than your own. These countries may have data protection laws
            different from your country.
          </p>

          <p>
            When we transfer information outside of the European Economic Area
            (EEA), we ensure appropriate safeguards are in place, such as:
          </p>

          <ul className="list-disc pl-6">
            <li>
              Standard Contractual Clauses approved by the European Commission
            </li>
            <li>Binding Corporate Rules</li>
            <li>
              Certification under privacy frameworks (e.g., EU-US Data Privacy
              Framework)
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "contact",
      title: "11. Contact Us",
      icon: "📞",
      content: (
        <div className="space-y-4">
          <p>
            If you have questions or concerns about this Privacy Policy or our
            data practices, please contact our Data Protection Officer:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg">
              <FiMail className="h-5 w-5 text-twitter-blue mb-2" />
              <h4 className="font-bold">Email</h4>
              <p className="text-sm">privacy@twitterclone.com</p>
              <p className="text-xs text-gray-500">Response within 48 hours</p>
            </div>

            <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg">
              <FiPhone className="h-5 w-5 text-twitter-blue mb-2" />
              <h4 className="font-bold">Phone</h4>
              <p className="text-sm">+1 (555) 987-6543</p>
              <p className="text-xs text-gray-500">Mon-Fri, 9am-5pm PST</p>
            </div>

            <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg">
              <FiMapPin className="h-5 w-5 text-twitter-blue mb-2" />
              <h4 className="font-bold">Mail</h4>
              <p className="text-sm">
                123 Developer Street
                <br />
                San Francisco, CA 94105
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg">
              <FiGlobe className="h-5 w-5 text-twitter-blue mb-2" />
              <h4 className="font-bold">Data Protection Officer</h4>
              <p className="text-sm">dpo@twitterclone.com</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "updates",
      title: "12. Updates to This Policy",
      icon: "🔄",
      content: (
        <div className="space-y-4">
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page
            and updating the "Last Updated" date.
          </p>

          <p>
            For material changes, we will provide more prominent notice (e.g.,
            email notification or a banner on our website). We encourage you to
            review this Privacy Policy periodically.
          </p>

          <p>
            Your continued use of our Services after any changes indicates your
            acceptance of the updated Privacy Policy.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-twitter-darker">
      {/* Header */}
      <div className="sticky top-0 bg-white dark:bg-twitter-darker border-b border-gray-200 dark:border-gray-800 p-4 z-10">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full p-2 transition"
            >
              <FiArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex items-center space-x-2">
              <FiShield className="h-6 w-6 text-twitter-blue" />
              <h1 className="text-xl font-bold">Privacy Policy</h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="px-3 py-1.5 bg-gray-100 dark:bg-twitter-dark rounded-lg text-sm"
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>

            <button
              onClick={handlePrint}
              className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full transition"
              title="Print"
            >
              <FiPrinter className="h-5 w-5" />
            </button>

            <button
              onClick={handleDownload}
              className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full transition"
              title="Download"
            >
              <FiDownload className="h-5 w-5" />
            </button>

            <button
              onClick={handleShare}
              className="p-2 hover:bg-gray-100 dark:hover:bg-twitter-dark rounded-full transition"
              title="Share"
            >
              <FiShare2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 flex gap-8">
        {/* Table of Contents Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-gray-50 dark:bg-twitter-dark rounded-2xl p-4">
            <h3 className="font-bold mb-4">Quick Links</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveSection(section.id);
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeSection === section.id
                      ? "bg-twitter-blue text-white"
                      : "hover:bg-gray-200 dark:hover:bg-twitter-darker"
                  }`}
                >
                  <span className="mr-2">{section.icon}</span>
                  {section.title.split(" ").slice(1).join(" ")}
                </button>
              ))}
            </nav>

            {/* Version Info */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500">Version: {version}</p>
              <p className="text-xs text-gray-500">
                Last Updated: {lastUpdated}
              </p>
              <p className="text-xs text-gray-500">
                Effective: {effectiveDate}
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Content */}
        <div id="privacy-content" className="flex-1">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-green-500 to-twitter-blue rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Privacy Policy</h2>
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <span className="flex items-center space-x-1">
                <FiCalendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </span>
              <span>•</span>
              <span>Effective: {effectiveDate}</span>
            </div>
            <p className="mt-4 max-w-2xl">
              We respect your privacy and are committed to protecting your
              personal data. This privacy policy explains how we handle your
              information.
            </p>
          </div>

          {/* Sections */}
          <div className={`space-y-6 ${getFontSizeClass()}`}>
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white dark:bg-twitter-dark rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-twitter-darker transition"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{section.icon}</span>
                    <h3 className="text-xl font-bold">{section.title}</h3>
                  </div>
                  {expandedSections[section.id] ? (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {/* Section Content */}
                {expandedSections[section.id] && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      {section.content}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-lg text-center">
              <FiShield className="h-8 w-8 mx-auto text-twitter-blue mb-2" />
              <p className="font-bold text-sm">GDPR Compliant</p>
            </div>
            <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-lg text-center">
              <FiLock className="h-8 w-8 mx-auto text-twitter-blue mb-2" />
              <p className="font-bold text-sm">256-bit Encryption</p>
            </div>
            <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-lg text-center">
              <FiEye className="h-8 w-8 mx-auto text-twitter-blue mb-2" />
              <p className="font-bold text-sm">CCPA Compliant</p>
            </div>
            <div className="bg-gray-50 dark:bg-twitter-dark p-4 rounded-lg text-center">
              <FiDatabase className="h-8 w-8 mx-auto text-twitter-blue mb-2" />
              <p className="font-bold text-sm">Data Protection</p>
            </div>
          </div>

          {/* Cookie Consent Notice - Updated without FiCookie */}
          <div className="mt-8 bg-gray-100 dark:bg-twitter-dark rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <div className="bg-twitter-blue bg-opacity-10 p-3 rounded-full">
                <FiSettings className="h-6 w-6 text-twitter-blue" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">Cookie Preferences</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  We use cookies to enhance your browsing experience and analyze
                  our traffic. You can customize your cookie preferences below.
                </p>
                <button className="bg-twitter-blue text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600">
                  Manage Cookies
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .sticky,
          button,
          nav,
          .bg-gradient-to-r {
            display: none !important;
          }
          body {
            background: white;
            color: black;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPage;
