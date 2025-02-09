// import React from "react";

// const Header = () => {
//   return (
//     <header className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
//       <a href="/">
//       <img
//         src="logo.png" // Replace with the actual logo path
//         alt="Dr Lal PathLabs Logo"
//         className="h-12"
//       />
//       </a>

//       {/* Navigation Links */}
//       <nav className="flex space-x-6 text-gray-700">
//         <a href="/test-menu" className="hover:underline">
//           Book a Test
//         </a>
//         <a href="/login" className="hover:underline">
//           Admin 
//         </a>
//         <a href="/patients/reports" className="hover:underline">
//           Download Report
//         </a>
//         <a href="#" className="hover:underline">
//           Special Programs
//         </a>
//         <a href="#" className="hover:underline">
//           Make an appointment
//         </a>
//       </nav>

//       {/* Right Section */}
//       <div className="flex items-center space-x-3">
//         <a href="/cart">
//          <img
//          src="cart.png"
//          alt="SRV PathLabs Logo"
//          className="h-7"
//          />
//         </a>
//         <a
//           href="/register"
//           className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//         >
//           Login
//         </a>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React from "react";

// const Header = () => {
//   return (
//     <header className="flex flex-wrap items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
//       <a href="/">
//         <img
//           src="logo.png" // Replace with the actual logo path
//           alt="Dr Lal PathLabs Logo"
//           className="h-12"
//         />
//       </a>

//       {/* Navigation Links */}
//       <nav className="hidden md:flex space-x-6 text-gray-700">
//         <a href="/test-menu" className="hover:underline">
//           Book a Test
//         </a>
//         <a href="/login" className="hover:underline">
//           Admin
//         </a>
//         <a href="/download-reports" className="hover:underline">
//           Download Report
//         </a>
//         <a href="/locations" className="hover:underline">
//           Locations
//         </a>
//         <a href="#" className="hover:underline">
//           Make an appointment
//         </a>
//       </nav>

//       {/* Right Section */}
//       <div className="hidden md:flex items-center space-x-3">
//         <a href="/cart">
//           <img
//             src="cart.png"
//             alt="Cart Icon"
//             className="h-7"
//           />
//         </a>
//         <a
//           href="/register"
//           className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//         >
//           Login
//         </a>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden flex items-center">
//         <button
//           className="p-2 focus:outline-none"
//           id="menu-toggle"
//           onClick={() => {
//             const menu = document.getElementById("mobile-menu");
//             if (menu.classList.contains("hidden")) {
//               menu.classList.remove("hidden");
//             } else {
//               menu.classList.add("hidden");
//             }
//           }}
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             ></path>
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Navigation Menu */}
//       <nav
//         id="mobile-menu"
//         className="hidden w-full mt-4 md:hidden text-gray-700 flex flex-col space-y-4"
//       >
//         <a href="/test-menu" className="hover:underline">
//           Book a Test
//         </a>
//         <a href="/login" className="hover:underline">
//           Admin
//         </a>
//         <a href="/download-reports" className="hover:underline">
//           Download Report
//         </a>
//         <a href="/locations" className="hover:underline">
//           Locations
//         </a>
//         <a href="#" className="hover:underline">
//           Make an appointment
//         </a>
//         <div className="flex items-center space-x-3">
//           <a href="/cart">
//             <img
//               src="cart.png"
//               alt="Cart Icon"
//               className="h-7"
//             />
//           </a>
//           <a
//             href="/register"
//             className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
//           >
//             Login
//           </a>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

// import React, { useState } from "react";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <header className="bg-white shadow-md py-2">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <a href="/" className="flex-shrink-0">
//             <img
//               src="logo.png"
//               alt="Dr Lal PathLabs Logo"
//               className="h-10 md:h-12 transition-all duration-200 hover:opacity-80"
//             />
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:items-center md:space-x-8">
//             <a
//               href="/test-menu"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Book a Test
//             </a>
//             <a
//               href="/special-programs"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/download-reports"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Download Report
//             </a>
//             <a
//               href="/locations"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Make an appointment
//             </a>
//           </nav>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex md:items-center md:space-x-6">
//             <a href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-6 w-6 hover:scale-110 transition-transform"
//               />
//             </a>
//             <a
//               href="/register"
//               className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
//             >
//               Login
//             </a>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center space-x-4">
//             <a href="/cart" className="p-2">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-6 w-6 hover:scale-110 transition-transform"
//               />
//             </a>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               aria-expanded={isMenuOpen}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div
//           className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4`}
//           id="mobile-menu"
//         >
//           <div className="pt-2 space-y-1">
//             <a
//               href="/test-menu"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Book a Test
//             </a>
//             <a
//               href="/special-programs"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/download-reports"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Download Report
//             </a>
//             <a
//               href="/locations"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Make an appointment
//             </a>
//             <a
//               href="/register"
//               className="block px-3 py-2.5 mx-3 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
//             >
//               Login
//             </a>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useEffect } from "react";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     // Check if the user is logged in (i.e., patientId and token exist)
//     const token = localStorage.getItem("token");
//     const patientId = localStorage.getItem("patientId");
//     setIsLoggedIn(!!token && !!patientId);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("patientId");
//     setIsLoggedIn(false);
//   };

//   return (
//     <header className="bg-white shadow-md py-2">
//       <div className="mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <a href="/" className="flex-shrink-0">
//             <img
//               src="logo.png"
//               alt="SRV PathLabs Logo"
//               className="h-10 md:h-12 transition-all duration-200 hover:opacity-80"
//             />
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:items-center md:space-x-5">
//             <a
//               href="/test-menu"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Book a Test
//             </a>
//             <a
//               href="/special-programs"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/download-reports"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Download Report
//             </a>
//             <a
//               href="/locations"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
//             >
//               Make an appointment
//             </a>
//           </nav>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex md:items-center md:space-x-4">
//             <a href="/cart" className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-6 w-6 hover:scale-110 transition-transform"
//               />
//             </a>

//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <a
//                 href="/register"
//                 className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Login
//               </a>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center space-x-4">
//             <a href="/cart" className="p-2">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-6 w-6 hover:scale-110 transition-transform"
//               />
//             </a>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
//               aria-expanded={isMenuOpen}
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         <div
//           className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4`}
//           id="mobile-menu"
//         >
//           <div className="pt-2 space-y-1">
//             <a
//               href="/test-menu"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Book a Test
//             </a>
//             <a
//               href="/special-programs"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/download-reports"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Download Report
//             </a>
//             <a
//               href="/locations"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
//             >
//               Make an appointment
//             </a>

//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="block w-full px-3 py-2.5 mx-3 mt-4 bg-red-600 text-white text-center text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <a
//                 href="/register"
//                 className="block w-full px-3 py-2.5 mx-3 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
//               >
//                 Login
//               </a>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const patientId = localStorage.getItem("patientId");
    setIsLoggedIn(!!token && !!patientId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("patientId");
    setIsLoggedIn(false);
  };

  return (
    <header className="bg-white shadow-md py-2">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <img
              src="logo.png"
              alt="SRV PathLabs Logo"
              className="h-9 sm:h-9 md:h-10 lg:h-12 transition-all duration-200 hover:opacity-80"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4">
            <a
              href="/test-menu"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-2 py-1"
            >
              Test Menu
            </a>
            <a
              href="/special-programs"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
            >
              Special Programs
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
            >
              Contact Us
            </a>
            <a
              href="/locations"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1 "
            >
              Locations
            </a>
            <a
              href="/make-an-appointment"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1 "
            >
              Appointment
            </a>
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4">
            <a href="/cart" className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
              <img
                src="cart.png"
                alt="Cart Icon"
                className="h-5 w-5 lg:h-6 lg:w-6 hover:scale-110 transition-transform"
              />
            </a>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-3 py-2 lg:px-3 lg:py-2.5 bg-red-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <a
                href="/register"
                className="px-3 py-2 lg:px-4 lg:py-2.5 bg-blue-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            <a href="/cart" className="p-1 flex-shrink-0">
              <img
                src="cart.png"
                alt="Cart Icon"
                className="h-6 w-6 hover:scale-110 transition-transform"
              />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMenuOpen}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-4`}
          id="mobile-menu"
        >
          <div className="pt-2 space-y-1">
            <a
              href="/test-menu"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Test Menu
            </a>
            <a
              href="/special-programs"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Special Programs
            </a>
            <a
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Contact Us
            </a>
            <a
              href="/locations"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Locations
            </a>
            <a
              href="/make-an-appointment"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
            >
              Make an appointment
            </a>

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2.5 mx-3 mt-4 bg-red-600 text-white text-center text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <a
                href="/register"
                className="block w-full px-3 py-2.5 mx-3 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;