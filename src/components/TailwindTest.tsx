import React from 'react';

const TailwindTest = () => {
  return (
    <div className="p-4 m-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold text-blue-700 mb-2">Tailwind Test Component</h2>
      <p className="mt-2 text-gray-700">This component uses Tailwind CSS classes.</p>
      <div className="mt-4 flex space-x-2">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
          Button 1
        </button>
        <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
          Button 2
        </button>
      </div>
    </div>
  );
};

export default TailwindTest;
