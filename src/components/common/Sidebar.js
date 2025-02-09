import React from 'react';

const Sidebar = () => {
  const services = [
    { label: 'Nearest Centre', icon: '📍' },
    { label: 'Book a Test', icon: '🧪' },
    { label: 'Upload Prescription', icon: '📄' },
    { label: 'Download Report', icon: '📥' },
  ];

  return (
    <div className="fixed right-0 top-24 max-w-20 bg-gray-200 p-2 border-l border-gray-300 flex flex-col justify-center items-center space-y-2">
      {services.map((service, index) => (
        <div key={index} className="flex flex-col items-center text-center">
          <div className="bg-yellow-100 text-blue-600 rounded-full p-2 text-lg">
            {service.icon}
          </div>
          <p className="text-xs font-semibold text-gray-700 mt-1">{service.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
