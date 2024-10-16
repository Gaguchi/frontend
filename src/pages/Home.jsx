// src/pages/Home.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Georgia Content Creator</h1>
      <p className="mb-6">Generate personalized content effortlessly.</p>
      <div>
        <Link to="/register" className="px-4 py-2 bg-blue-500 text-white rounded mr-2">
          Register
        </Link>
        <Link to="/login" className="px-4 py-2 bg-green-500 text-white rounded">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
