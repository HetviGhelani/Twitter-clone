import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowLeft,
  FiFileText,
  FiCalendar,
  FiChevronRight,
  FiChevronDown,
  FiDownload,
  FiPrinter,
  FiShare2,
} from "react-icons/fi";
import toast from "react-hot-toast";

const TermsPage = () => {
  const [activeSection, setActiveSection] = useState("welcome");
  const [expandedSections, setExpandedSections] = useState({});
  const [fontSize, setFontSize] = useState("medium"); // small, medium, large

  const lastUpdated = "March 1, 2026";
  const effectiveDate = "March 15, 2026";
  const version = "2.1.0";

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
    const content = document.getElementById("terms-content").innerText;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Twitter-Clone-Terms-of-Service-${lastUpdated}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Terms of Service downloaded");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
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
      id: "welcome",
      title: "1. Welcome to Twitter Clone",
      icon: "👋",
      content: (
        <div className="space-y-4">
          <p className="font-medium">
            Welcome to Twitter Clone ("Company", "we", "our", "us")!
          </p>
          <p>
            These Terms of Service ("Terms", "ToS") govern your use of our
            website, mobile application, and services (collectively, the
            "Services"). By accessing or using our Services, you agree to be
            bound by these Terms. If you disagree with any part of the Terms,
            you may not access the Services.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>📋 Quick Summary:</strong> This is a legally binding
              agreement between you and Twitter Clone. Please read it carefully.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "eligibility",
      title: "2. Eligibility",
      icon: "✅",
      content: (
        <div className="space-y-4">
          <p>By using our Services, you represent and warrant that:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You are at least 13 years of age (or the minimum age in your
              country)
            </li>
            <li>
              You have the full power and authority to enter into this agreement
            </li>
            <li>
              You are not located in a country that is subject to a U.S.
              government embargo
            </li>
            <li>
              You have not been previously suspended or removed from our
              Services
            </li>
            <li>You will comply with all applicable laws and regulations</li>
          </ul>
        </div>
      ),
    },
    {
      id: "account",
      title: "3. Account Responsibilities",
      icon: "🔐",
      content: (
        <div className="space-y-4">
          <p>
            When you create an account with us, you must provide accurate,
            complete, and current information. Failure to do so constitutes a
            breach of the Terms, which may result in immediate termination of
            your account.
          </p>

          <h4 className="font-bold mt-4">3.1 Account Security</h4>
          <p>
            You are responsible for safeguarding the password that you use to
            access the Services and for any activities or actions under your
            password. We encourage you to use "strong" passwords (passwords that
            use a combination of upper and lower case letters, numbers, and
            symbols) with your account.
          </p>

          <h4 className="font-bold mt-4">3.2 Unauthorized Access</h4>
          <p>
            You must notify us immediately upon becoming aware of any breach of
            security or unauthorized use of your account. We will not be liable
            for any loss or damage arising from your failure to comply with this
            section.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900 dark:bg-opacity-20 p-4 rounded-lg">
            <p className="text-sm">
              <strong>⚠️ Important:</strong> We cannot and will not be liable
              for any loss or damage arising from your failure to comply with
              the above requirements.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "content",
      title: "4. User Content",
      icon: "📝",
      content: (
        <div className="space-y-4">
          <h4 className="font-bold">4.1 Ownership</h4>
          <p>
            You retain all rights to any content you submit, post, or display on
            or through our Services ("User Content"). You are solely responsible
            for your User Content and the consequences of posting or publishing
            it.
          </p>

          <h4 className="font-bold mt-4">4.2 License Grant</h4>
          <p>
            By posting User Content, you grant us a non-exclusive, worldwide,
            royalty-free, sub-licensable, transferable license to use,
            reproduce, modify, adapt, publish, and display such User Content in
            connection with providing the Services.
          </p>

          <h4 className="font-bold mt-4">4.3 Content Guidelines</h4>
          <p>You agree not to post User Content that:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Is illegal, harmful, threatening, abusive, harassing, defamatory
            </li>
            <li>Infringes on any intellectual property rights</li>
            <li>Contains hate speech or promotes discrimination</li>
            <li>Contains malware, viruses, or malicious code</li>
            <li>Is misleading, deceptive, or fraudulent</li>
            <li>Impersonates any person or entity</li>
          </ul>
        </div>
      ),
    },
    {
      id: "prohibited",
      title: "5. Prohibited Activities",
      icon: "🚫",
      content: (
        <div className="space-y-4">
          <p>
            You may not access or use the Services for any purpose other than
            that for which we make them available. The Services may not be used
            in connection with any commercial endeavors except those that are
            specifically endorsed or approved by us.
          </p>

          <h4 className="font-bold mt-4">As a user, you agree not to:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Harassment:</strong> Systematically retrieve data to
              create or compile any collection or database
            </li>
            <li>
              <strong>Spam:</strong> Engage in unauthorized framing of or
              linking to the Services
            </li>
            <li>
              <strong>Scraping:</strong> Use any meta tags or other hidden text
              using our name or trademarks
            </li>
            <li>
              <strong>Impersonation:</strong> Attempt to bypass any measures
              designed to prevent or restrict access
            </li>
            <li>
              <strong>Automation:</strong> Use automated scripts, bots, or
              scrapers
            </li>
            <li>
              <strong>Misinformation:</strong> Share false or misleading
              information
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "copyright",
      title: "6. Copyright Infringement",
      icon: "©️",
      content: (
        <div className="space-y-4">
          <p>
            We respect the intellectual property rights of others and expect our
            users to do the same. We will respond to notices of alleged
            copyright infringement that comply with applicable law and are
            properly provided to us.
          </p>

          <h4 className="font-bold mt-4">DMCA Notice</h4>
          <p>
            If you believe that any material available on or through the
            Services infringes upon any copyright you own or control, please
            immediately notify our Designated Copyright Agent:
          </p>

          <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg">
            <p className="font-mono text-sm">
              Copyright Agent
              <br />
              Twitter Clone, Inc.
              <br />
              123 Developer Street
              <br />
              San Francisco, CA 94105
              <br />
              Email: copyright@twitterclone.com
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "termination",
      title: "7. Termination",
      icon: "⛔",
      content: (
        <div className="space-y-4">
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms.
          </p>

          <h4 className="font-bold mt-4">Upon termination:</h4>
          <ul className="list-disc pl-6">
            <li>Your right to use the Services will immediately cease</li>
            <li>We may delete your account and all related information</li>
            <li>Certain provisions of the Terms will survive termination</li>
          </ul>

          <p className="mt-2">
            If you wish to terminate your account, you may simply discontinue
            using the Services or contact us to delete your account.
          </p>
        </div>
      ),
    },
    {
      id: "liability",
      title: "8. Limitation of Liability",
      icon: "⚖️",
      content: (
        <div className="space-y-4">
          <p>
            In no event shall Twitter Clone, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6">
            <li>Your use or inability to use the Services</li>
            <li>Any conduct or content of any third party on the Services</li>
            <li>Any content obtained from the Services</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "disclaimer",
      title: "9. Disclaimer of Warranties",
      icon: "⚠️",
      content: (
        <div className="space-y-4">
          <p>
            Your use of the Services is at your sole risk. The Services are
            provided on an "AS IS" and "AS AVAILABLE" basis. The Services are
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement
            or course of performance.
          </p>

          <p>
            Twitter Clone, its subsidiaries, affiliates, and its licensors do
            not warrant that:
          </p>
          <ul className="list-disc pl-6">
            <li>
              The Services will function uninterrupted, secure, or available at
              any particular time or location
            </li>
            <li>Any errors or defects will be corrected</li>
            <li>
              The results of using the Services will meet your requirements
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "10. Indemnification",
      icon: "🛡️",
      content: (
        <div className="space-y-4">
          <p>
            You agree to defend, indemnify and hold harmless Twitter Clone and
            its licensee and licensors, and their employees, contractors,
            agents, officers and directors, from and against any and all claims,
            damages, obligations, losses, liabilities, costs or debt, and
            expenses (including but not limited to attorney's fees), resulting
            from or arising out of:
          </p>
          <ul className="list-disc pl-6">
            <li>Your use and access of the Services</li>
            <li>Your violation of any term of these Terms</li>
            <li>
              Your violation of any third-party right, including without
              limitation any copyright, property, or privacy right
            </li>
            <li>
              Any claim that your User Content caused damage to a third party
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "changes",
      title: "11. Changes to Terms",
      icon: "🔄",
      content: (
        <div className="space-y-4">
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will try to
            provide at least 30 days' notice prior to any new terms taking
            effect. What constitutes a material change will be determined at our
            sole discretion.
          </p>

          <p>
            By continuing to access or use our Services after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            the Services.
          </p>
        </div>
      ),
    },
    {
      id: "governing",
      title: "12. Governing Law",
      icon: "🌐",
      content: (
        <div className="space-y-4">
          <p>
            These Terms shall be governed and construed in accordance with the
            laws of California, United States, without regard to its conflict of
            law provisions.
          </p>

          <p>
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </p>
        </div>
      ),
    },
    {
      id: "contact",
      title: "13. Contact Us",
      icon: "📧",
      content: (
        <div className="space-y-4">
          <p>If you have any questions about these Terms, please contact us:</p>

          <div className="bg-gray-100 dark:bg-twitter-dark p-4 rounded-lg space-y-2">
            <p>
              <strong>Email:</strong> legal@twitterclone.com
            </p>
            <p>
              <strong>Phone:</strong> +1 (555) 123-4567
            </p>
            <p>
              <strong>Address:</strong> 123 Developer Street, San Francisco, CA
              94105
            </p>
            <p>
              <strong>Hours:</strong> Monday-Friday, 9am-5pm PST
            </p>
          </div>

          <p className="text-sm text-gray-500">
            We aim to respond to all inquiries within 2-3 business days.
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
              <FiFileText className="h-6 w-6 text-twitter-blue" />
              <h1 className="text-xl font-bold">Terms of Service</h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Font Size Controls */}
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
            <h3 className="font-bold mb-4">Table of Contents</h3>
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

        {/* Terms Content */}
        <div id="terms-content" className="flex-1">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-twitter-blue to-purple-600 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-3xl font-bold mb-2">Terms of Service</h2>
            <div className="flex items-center space-x-4 text-sm opacity-90">
              <span className="flex items-center space-x-1">
                <FiCalendar className="h-4 w-4" />
                <span>Last updated: {lastUpdated}</span>
              </span>
              <span>•</span>
              <span>Effective: {effectiveDate}</span>
            </div>
            <p className="mt-4 max-w-2xl">
              Please read these terms carefully before using our platform. By
              using Twitter Clone, you agree to be bound by these terms.
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

          {/* Agreement Banner */}
          <div className="mt-8 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-2">
              By using Twitter Clone, you agree to these terms
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              If you have any questions or concerns, please don't hesitate to
              contact our support team.
            </p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-twitter-blue hover:underline">
                Read our Privacy Policy
              </Link>
              <Link to="/help" className="text-twitter-blue hover:underline">
                Visit Help Center
              </Link>
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

export default TermsPage;
