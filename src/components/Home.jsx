// ./components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl p-8 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-8">Welcome, {user.name}!</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/apply" className="flex flex-col items-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-6 transition duration-300">
          <span className="text-2xl font-bold">Apply</span>
        </Link>
        <Link to="/vote" className="flex flex-col items-center bg-purple-600 hover:bg-purple-700 text-white rounded-lg p-6 transition duration-300">
          <span className="text-2xl font-bold">Vote</span>
        </Link>
        <Link to="/results" className="flex flex-col items-center bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 transition duration-300">
          <span className="text-2xl font-bold">Results</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
