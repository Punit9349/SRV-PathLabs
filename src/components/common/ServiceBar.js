// import React from 'react';

// const ServicesBar = () => {
//   const services = [
//     { label: 'Nearest Centre', icon: '📍' },
//     { label: 'Book a Test', icon: '🧪' },
//     { label: 'Test Menu', icon: '📋' },
//     { label: 'Download Report', icon: '📥' },
//     { label: 'Upload Prescription', icon: '📄' },
//   ];

//   return (
//     <div className="bg-blue-800 pt-12 pb-16">
//       <div className="flex justify-center items-center">
//         {services.map((service, index) => (
//           <div key={index} className="flex items-center mx-3">
//             <div className="flex flex-col items-center text-white">
//               <div className="bg-yellow-50 text-green-600 rounded-full p-9 mb-2 text-5xl">
//                 {service.icon}
//               </div>
//               <p className="text-lg font-semibold">{service.label}</p>
//             </div>
//             {index < services.length - 1 && (
//               <div className="w-px h-28 bg-white mx-4"></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesBar;


// import React from "react";

// const ServicesBar = () => {
//   const services = [
//     { label: "Nearest Centre", icon: "📍" },
//     { label: "Book a Test", icon: "🧪" },
//     { label: "Special Programs", icon: "📋" },
//     { label: "Download Report", icon: "📥" },
//     { label: "Upload Prescription", icon: "📄" },
//   ];

//   return (
//     <div className="bg-blue-800 pt-8 pb-12">
//       <div className="flex flex-wrap justify-center items-center gap-8 px-4 md:flex-nowrap">
//         {services.map((service, index) => (
//           <div key={index} className="flex flex-col items-center text-white">
//             <div className="bg-yellow-50 text-green-600 rounded-full p-6 md:p-9 mb-2 text-4xl md:text-5xl">
//               {service.icon}
//             </div>
//             <p className="text-sm md:text-lg font-semibold text-center">
//               {service.label}
//             </p>
//             {/* Divider for larger screens */}
//             {/* {index < services.length - 1 && (
//               <div className="hidden md:block w-px h-20 bg-white mx-4"></div>
//             )} */}
//           </div>
//         ))}
//       </div>
//       {/* Divider for mobile screens */}
//       {/* <div className="block md:hidden w-full h-px bg-white mt-8"></div> */}
//     </div>
//   );
// };

// export default ServicesBar;

import React from "react";

const ServicesBar = () => {
  const services = [
    { label: "Book a Test", icon: "🧪", link: "/test-menu" },
    { label: "My Orders", icon: "📋", link: "/my-orders" },
    { label: "Download Report", icon: "📥", link: "/download-reports" },
    { label: "Upload Prescription", icon: "📄", link: "/make-an-appointment" },
    { label: "Special Programs", icon: "📍", link: "/special-programs" },
  ];

  return (
    <div className="w-full overflow-x-hidden bg-gradient-to-br from-teal-700 to-emerald-800 py-12 px-4">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              className="group relative flex flex-col items-center text-white"
            >
              {/* Main Card */}
              <div className="flex w-full max-w-[90%] flex-col items-center rounded-xl bg-white/10 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg md:p-4">
                {/* Icon Container */}
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl text-teal-700 shadow-md transition-transform duration-300 group-hover:scale-110 md:h-14 md:w-14 md:text-3xl">
                  {service.icon}
                </div>
                
                {/* Label */}
                <p className="text-center text-xs font-medium md:text-sm">
                  {service.label}
                  <span className="block h-[1px] w-0 bg-amber-300 transition-all duration-300 group-hover:w-full" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesBar;
