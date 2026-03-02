import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import RightSidebar from "./RightSidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-twitter-darker">
      {/* Main Container - Matches Twitter's exact layout */}
      <div className="flex justify-center">
        <div className="flex w-full max-w-7xl px-4">
          {/* Left Sidebar - Fixed width */}
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <div className="fixed w-64">
              <Sidebar />
            </div>
          </div>

          {/* Main Content - Center column */}
          <main className="flex-1 max-w-2xl border-x border-gray-200 dark:border-gray-800 min-h-screen">
            <Outlet />
          </main>

          {/* Right Sidebar - Fixed width */}
          <div className="w-96 flex-shrink-0 hidden xl:block">
            <div className="fixed w-96">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
