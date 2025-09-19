import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Components/Navbar";

const Layout = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Navbar on top */}
      <Navbar />

      {/* Page content below */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
