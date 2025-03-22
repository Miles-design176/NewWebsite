import React from "react";
import { useLocation } from "wouter";

const DownloadPage: React.FC = () => {
  const [, setLocation] = useLocation(); // Wouter uses setLocation for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white text-center p-6">
      <h1 className="text-4xl font-bold text-[#FF8D29] mb-4">Not Finished Yet</h1>
      <p className="text-gray-300 mb-6">This page is still under construction. Check back later!</p>
      <button
        onClick={() => setLocation("/flipperzero")} // Navigate back to home or previous page
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 transition rounded-md text-white font-medium"
      >
        Return to Previous Page
      </button>
    </div>
  );
};

export default DownloadPage;
