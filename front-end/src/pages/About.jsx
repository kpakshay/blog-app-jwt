import React from "react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        About This Blog
      </h1>

      <p className="text-lg text-gray-600 mb-4">
        Welcome to <span className="font-semibold">My Blog App</span> — a simple project
        built with React and Node.js to demonstrate authentication, authorization,
        protected routes, and CRUD operations.
      </p>

      <p className="text-lg text-gray-600 mb-4">
        Here you’ll find posts created by users, with secure login and signup
        powered by JSON Web Tokens (JWT). The goal is to show how modern web
        apps handle secure data and user interactions.
      </p>

      <div className="bg-gray-50 border border-gray-200 rounded-md p-5 mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Tech Stack</h2>
        <ul className="space-y-2 text-gray-600">
          <li>⚛️ React (Frontend)</li>
          <li>🟢 Node.js + Express (Backend)</li>
          <li>🗄️ MongoDB (Database)</li>
          <li>🔐 JWT Authentication</li>
        </ul>
      </div>

      <p className="text-center text-gray-500 italic">
        Built with ❤️ for learning and sharing knowledge.
      </p>
    </div>
  );
}
