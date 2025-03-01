import React from 'react';
import { Link } from 'react-router-dom';

const Whyus = () => {
  const stats = [
    { value: '1000+', label: 'Samples Collected', icon: '🌍' },
    { value: '700+', label: 'Total No. of Customers', icon: '👥' },
    { value: '8', label: 'Labs', icon: '🧪' },
    { value: '150+', label: 'Patient Service Centres', icon: '👤' },
    { value: '1,500+', label: 'Total No. of Tests and Panels', icon: '🧫' },
    { value: '150+', label: 'Pick-up Points', icon: '📍' },
  ];

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Why SRV PathLabs?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 rounded-lg"
          >
            <div className="text-4xl">{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <Link
          href="#"
          className="text-blue-600 font-semibold hover:underline"
        >
          Explore
        </Link>
      </div>
    </div>
  );
};

export default Whyus;