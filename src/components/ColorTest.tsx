import React from 'react';

const ColorTest = () => {
  return (
    <div className="p-6 rounded-lg bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Tailwind Color Test</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-red-500 text-white rounded">Red</div>
        <div className="p-4 bg-blue-500 text-white rounded">Blue</div>
        <div className="p-4 bg-green-500 text-white rounded">Green</div>
        <div className="p-4 bg-yellow-500 text-white rounded">Yellow</div>
        <div className="p-4 bg-purple-500 text-white rounded">Purple</div>
        <div className="p-4 bg-pink-500 text-white rounded">Pink</div>
        <div className="p-4 bg-indigo-500 text-white rounded">Indigo</div>
        <div className="p-4 bg-gray-500 text-white rounded">Gray</div>
      </div>
    </div>
  );
};

export default ColorTest;
