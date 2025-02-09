// components/common/TestCard.js
import React from 'react';

const TestCard = ({ testName, price, instructions, parameters, frequency, sampleReportLink }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-start">
      {/* Left Section: Test Details */}
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-800">{testName}</h3>
        <p className="text-sm text-gray-600 mt-2">
          <span className="font-semibold">Special Instruction:</span> {instructions}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Parameters covered:</span> {parameters}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          <span className="font-semibold">Report Frequency:</span> {frequency}
        </p>
        {sampleReportLink && (
          <a
            href={sampleReportLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 text-sm flex items-center mt-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            View sample report
          </a>
        )}
      </div>

      {/* Right Section: Actions and Price */}
      <div className="text-right">
        <p className="text-lg font-bold text-green-600">&#8377; {price}</p>
        <div className="flex items-center justify-end mt-2 space-x-2">
          <span className="text-sm text-green-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.75V5.25"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 5.25h4.5"
              />
            </svg>
            Home Collection
          </span>
          <span className="text-sm text-green-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15.75V5.25"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 5.25h4.5"
              />
            </svg>
            Lab Visit
          </span>
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-blue-700"
        >
          Add to cart
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Price applicable for Home Collection orders only.
        </p>
      </div>
    </div>
  );
};

export default TestCard;