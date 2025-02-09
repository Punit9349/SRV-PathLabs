import React from 'react';

const HealthScreeningBanner = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto my-6">
      <div className="flex items-center">
        <img
          src="image1.jpg"
          alt="Stomach Health Screening"
          className="w-1/3 object-cover"
        />
        <div className="p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore More</h2>
          <h3 className="text-3xl font-bold text-red-600 mb-4">ALL YOUR STOMACH</h3>
          <h3 className="text-3xl font-bold text-blue-600 mb-4">RELATED QUERIES ANSWERED</h3>
          <a href="#" className="text-white bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
            BOOK NOW
          </a>
        </div>
      </div>
    </div>
  );
};

export default HealthScreeningBanner;
