import React from "react";

const QualitySection = () => {
  const qualityData = [
    {
      icon: "📋", // Replace with the actual icon/image source
      count: "600+",
      description: "Instruments used for real-time QC monitoring",
    },
    {
      icon: "🔄", // Replace with the actual icon/image source
      count: "50+",
      description: "Quality Checks & Processes on Every Sample",
    },
    {
      icon: "👥", // Replace with the actual icon/image source
      count: "15+",
      description: "Quality indicator monitored on daily basis",
    },
  ];

  return (
    <div className="rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Quality</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {qualityData.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
          >
            {/* Icon */}
            <div className="w-16 h-16 flex items-center justify-center bg-yellow-400 rounded-full text-blue-700 text-2xl">
              {item.icon}
            </div>
            {/* Text Content */}
            <div>
              <p className="text-blue-700 text-2xl font-bold">{item.count}</p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <a
          href="#"
          className="text-blue-700 font-medium hover:underline text-sm"
        >
          Know More
        </a>
      </div>
    </div>
  );
};

export default QualitySection;
