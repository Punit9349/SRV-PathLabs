import React from "react";

const TestsSection = () => {
  const labTests = [
    "Delhi","Uttar Pradesh","Bihar"
  ];

  const popularTests = [
    "Pregnancy Test", "Full Body Checkups", "Covid 19 Test", "Heart Test", "Kidney Test", 
    "Liver Test", "CBC Test", "Cholesterol Test", "HbA1c Test", "Hepatitis B Test", 
    "Kidney Function Test", "Liver Function Test", "Sugar Test", "Thyroid Test", 
    "Typhoid Test", "Uric Acid Test", "Vitamin B12 Test", "Vitamin D Test", 
    "Allergy Test", "Arthritis Test", "Cancer Test", "Bone And Joint", "Dengue Test", 
    "Diabetes Test", "Rheumatoid Test", "Tuberculosis Test", "Infertility Test", 
    "Diabetes Care", "Anemia Test", "Gastrointestinal", "Autoimmune Disorders", 
    "Fever Test",
  ];

  return (
    <div className="">
      {/* Lab Test At Home Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto mb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Lab Test At Home</h2>
        <div className="flex flex-wrap">
          {labTests.map((test, index) => (
            <p key={index} className="text-gray-600 text-sm mr-2 mb-2">
              {test}
              {index !== labTests.length - 1 && " |"}
            </p>
          ))}
        </div>
      </div>

      {/* Popular Tests Section */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Popular Tests</h2>
        <div className="flex flex-wrap">
          {popularTests.map((test, index) => (
            <p key={index} className="text-gray-600 text-sm mr-2 mb-2">
              {test}
              {index !== popularTests.length - 1 && " |"}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestsSection;
