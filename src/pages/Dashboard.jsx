// src/pages/Dashboard.jsx

import React, { useEffect, useState } from 'react';
import API from '../api/axios'; // Import the Axios instance
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const [contents, setContents] = useState([]);
  const [contentType, setContentType] = useState('social_media');
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const response = await API.get('content/');
        setContents(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchContents();
  }, []);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post('content/', {
        content_type: contentType,
        prompt: prompt,
      });
      setContents([response.data, ...contents]);
      setPrompt('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
          Logout
        </button>
      </header>

      <form onSubmit={handleGenerate} className="mb-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl mb-2">Generate New Content</h2>
        <div className="mb-4">
          <label className="block mb-1">Content Type</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="social_media">Social Media Post</option>
            <option value="blog">Blog Post</option>
            <option value="product_description">Product Description</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Prompt</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Generate
        </button>
      </form>

      <div>
        <h2 className="text-2xl mb-4">Your Contents</h2>
        {contents.length === 0 ? (
          <p>No content generated yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contents.map((content) => (
              <div key={content.id} className="bg-white p-4 rounded shadow">
                <h3 className="text-lg font-semibold">
                  {content.content_type.replace('_', ' ').toUpperCase()}
                </h3>
                <p className="text-gray-700 mt-2">{content.generated_content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Created at: {new Date(content.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
