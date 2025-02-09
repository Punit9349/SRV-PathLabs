// import React, { useEffect, useState } from "react";

// const SpecialProgramsCarousel = () => {
//   const items = [
//     { icon: "👶", title: "Pregnancy Packages" },
//     { icon: "🤧", title: "Allergy" },
//     { icon: "🧬", title: "Oncopro" },
//     { icon: "🩺", title: "Diabetic Care Program" },
//     { icon: "🧪", title: "Wellness Packages" },
//     { icon: "💉", title: "Vaccination" },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleItems, setVisibleItems] = useState(4);

//   // Automatically move the carousel every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       handleNext();
//     }, 3000);
//     return () => clearInterval(interval);
//   }, [currentIndex]);

//   // Handle responsiveness for number of visible items
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 900) setVisibleItems(4); // Desktop
//       else if (window.innerWidth >= 768) setVisibleItems(3); // Tablet
//       else setVisibleItems(1); // Mobile
//     };

//     handleResize(); // Initial check
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? items.length - visibleItems : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === items.length - visibleItems ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-screen mx-auto">
//       <h2 className="text-xl font-bold text-gray-800 mb-6">Special Programs</h2>

//       {/* Carousel Container */}
//       <div className="relative flex items-center">
//         {/* Left Arrow */}
//         <button
//           onClick={handlePrev}
//           className="absolute left-2 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-yellow-500 z-10"
//         >
//           &#9664;
//         </button>

//         {/* Items Wrapper */}
//         <div className="overflow-hidden w-screen px-12 mr-24"> {/* Added padding for balance */}
//           <div
//             className="flex transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(-${(currentIndex * 100) / visibleItems}%)`,
//               width: `${(items.length * 100) / visibleItems}`,
//             }}
//           >
//             {items.map((item, index) => (
//               <div
//                 key={index}
//                 className="flex-shrink-0 flex flex-col items-center space-y-2 text-center p-4"
//                 style={{
//                   width: `${30 / visibleItems}%`,
//                 }}
//               >
//                 <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center text-blue-600 text-3xl">
//                   {item.icon}
//                 </div>
//                 <p className="text-gray-800 font-medium">{item.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Right Arrow */}
//         <button
//           onClick={handleNext}
//           className="absolute right-2 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-yellow-500 z-10"
//         >
//           &#9654;
//         </button>
//       </div>

//       {/* Dots */}
//       <div className="mt-6 flex justify-center space-x-2">
//         {items.slice(0, items.length - visibleItems + 1).map((_, index) => (
//           <div
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               index === currentIndex ? "bg-blue-600" : "bg-gray-300"
//             }`}
//           ></div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SpecialProgramsCarousel;

import React, { useState, useEffect } from "react";

const SpecialProgramsCarousel = () => {
  const items = [
    { icon: "👶", title: "Pregnancy Packages" },
    { icon: "🤧", title: "Allergy" },
    { icon: "🧬", title: "Oncopro" },
    { icon: "🩺", title: "Diabetic Care Program" },
    { icon: "🧪", title: "Wellness Packages" },
    { icon: "💉", title: "Vaccination" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Determine how many items to show based on screen width
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) setItemsPerView(4); // Desktop
      else if (window.innerWidth >= 768) setItemsPerView(3); // Tablet
      else setItemsPerView(1); // Mobile
    };

    updateItemsPerView(); // Initial check
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically move to the next set of items
    }, 1300); // Change slides every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex, itemsPerView]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - itemsPerView : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - itemsPerView ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-[100%]">
      <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
        Special Programs
      </h2>

      {/* Carousel Container */}
      <div className="relative px-16">
        {/* Items Wrapper */}
        <div className="flex overflow-hidden">
          {items
            .slice(currentIndex, currentIndex + itemsPerView)
            .map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-2 flex-1"
              >
                <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center text-blue-600 text-3xl">
                  {item.icon}
                </div>
                <p className="text-gray-800 font-medium w-28">{item.title}</p>
              </div>
            ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-yellow-500"
        >
          &#9664;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-yellow-500"
        >
          &#9654;
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center space-x-2">
        {Array.from({ length: Math.ceil(items.length / itemsPerView) }).map(
          (_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === Math.floor(currentIndex / itemsPerView)
                  ? "bg-blue-600"
                  : "bg-gray-300"
              }`}
            ></div>
          )
        )}
      </div>
    </div>
  );
};

export default SpecialProgramsCarousel;

