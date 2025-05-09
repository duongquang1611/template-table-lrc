import MainLayout from '@/layouts/MainLayout';
import React from 'react';

const Profile = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center space-x-6">
            <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-4xl text-gray-500">👤</span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">User Name</h2>
              <p className="text-gray-600">user@example.com</p>
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Member since:</span> January 2024
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Role:</span> Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
