import React from "react";
import sunset from "../../assets/sunset.png";  // Make sure the path is correct

const AuthLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen overflow-hidden flex">
      {/* Left side - Background Image */}
      <div
        className="w-1/2 h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${sunset})` }}  // Use the imported image
      ></div>

      {/* Right side - Gray background */}
      <div className="w-1/2 h-full bg-gray-800 flex justify-center items-center">
        {/* Auth Card */}
        <div className=" rounded-lg p-8 w-[400px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
