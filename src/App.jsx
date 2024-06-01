import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function App() {
  return (
      <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="/assets/img/logoo.png" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
              Welcome to Your Inventory App
            </h2>
            <p className="mt-2 text-center text-sm text-gray-400">
              Manage your inventory efficiently and effectively
            </p>
          </div>
          <div className="rounded-lg shadow-md bg-gray-300 p-8 space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Real-time inventory tracking</li>
              <li>Detailed analytics and reporting</li>
              <li>Easy stock management</li>
              <li>User-friendly interface</li>
            </ul>
            <div className="mt-6 flex items-center">
            <Link to={"/login"} className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
              Login 
            </Link>
          </div>
          </div>
        </div>
      </div>
  );
}