import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">
          Oops! The page you're looking for does not exist.
        </p>
        <p className="mt-2 text-md text-gray-500">
          You might want to go back to the <Link to="/" className="text-blue-500 hover:underline">Home page</Link>.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
