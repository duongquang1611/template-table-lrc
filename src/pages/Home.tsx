import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import TailwindTest from '@/components/TailwindTest';
import ScssTest from '@/components/ScssTest';
import ColorTest from '@/components/ColorTest';

const Home = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Home Page</h1>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <p className="text-gray-600">
            This is the home page of our application. Here you can find various demos and features.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Styling Demo</h2>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Tailwind CSS Approach:</h3>
            <TailwindTest />
            <div className="mt-2 text-xs text-gray-500">
              <code>This component uses utility classes directly in JSX.</code>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">SCSS Module Approach:</h3>
            <ScssTest />
            <div className="mt-2 text-xs text-gray-500">
              <code>This component uses imported SCSS module classes.</code>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2 text-gray-700">Tailwind Color Palette Test:</h3>
            <ColorTest />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
