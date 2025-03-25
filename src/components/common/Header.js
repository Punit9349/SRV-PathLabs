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
              <>
              <button
                onClick={handleLogout}
                className="px-3 py-2 lg:px-3 lg:py-2.5 bg-red-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
              <a href="http://154.61.173.119:8090/pages/login.aspx" className="px-1.5 py-2 lg:px-4 lg:py-2.5 bg-blue-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
                 LIS Login
              </a>
              </>
            ) : (
              <>
              <a
                href="/register"
                className="px-1.5 py-2 lg:px-4 lg:py-2.5 bg-blue-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </a>
              <a href="http://154.61.173.119:8090/pages/login.aspx" className="px-1.5 py-2 lg:px-4 lg:py-2.5 bg-blue-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
                  LIS Login
              </a>
              </>
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
              <>
              <button
                onClick={handleLogout}
                className="block w-full px-3 py-2.5 mx-1 mt-4 bg-red-600 text-white text-center text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                Logout
              </button>
              <a href="http://154.61.173.119:8090/pages/login.aspx" className="block w-full px-3 py-2.5 mx-1 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200s">
                  LIS Login
              </a>
              </>
            ) : (
              <>
              <a
                href="/register"
                className="block w-full px-3 py-2.5 mx-1 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Login
              </a>
              <a href="http://154.61.173.119:8090/pages/login.aspx" className="block w-full px-3 py-2.5 mx-1 mt-4 bg-blue-600 text-white text-center text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200">
              LIS Login
          </a>
          </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
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
//               className="h-9 sm:h-9 md:h-10 lg:h-12 transition-all duration-200 hover:opacity-80"
//             />
//           </a>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4">
//             <a
//               href="/test-menu"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-2 py-1"
//             >
//               Test Menu
//             </a>
//             <a
//               href="/special-programs"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/contact"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
//             >
//               Contact Us
//             </a>
//             <a
//               href="/locations"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm lg:text-base font-medium px-1 py-1"
//             >
//               Appointment
//             </a>
//           </nav>

//           {/* Desktop Right Section */}
//           <div className="hidden md:flex md:items-center md:space-x-3 lg:space-x-4">
//             <a href="/cart" className="p-2 hover:bg-gray-100 rounded-full">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-5 w-5 lg:h-6 lg:w-6 hover:scale-110 transition-transform"
//               />
//             </a>

//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-3 py-2 lg:px-4 lg:py-2.5 bg-red-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <div 
//                 className="relative group"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <button className="px-3 py-2 lg:px-4 lg:py-2.5 bg-blue-600 text-white text-sm lg:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center gap-1">
//                   Patient Login
//                   <svg
//                     className="w-4 h-4 transition-transform duration-200"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {/* Dropdown Menu */}
//                 <div className={`absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ${isHovered ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'}`}>
//                   <div className="py-1">
//                     <a
//                       href="/register"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Patient Login
//                     </a>
//                     <a
//                       href="http://154.61.173.119:8090/pages/login.aspx"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       LIS Login
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="flex md:hidden items-center space-x-3">
//             <a href="/cart" className="p-1">
//               <img
//                 src="cart.png"
//                 alt="Cart Icon"
//                 className="h-6 w-6 hover:scale-110 transition-transform"
//               />
//             </a>
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
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
//         <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden pb-4`}>
//           <div className="pt-2 space-y-1">
//             <a
//               href="/test-menu"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
//             >
//               Test Menu
//             </a>
//             <a
//               href="/special-programs"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
//             >
//               Special Programs
//             </a>
//             <a
//               href="/contact"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
//             >
//               Contact Us
//             </a>
//             <a
//               href="/locations"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
//             >
//               Locations
//             </a>
//             <a
//               href="/make-an-appointment"
//               className="block px-3 py-2 text-gray-700 hover:bg-gray-50"
//             >
//               Appointment
//             </a>

//             {isLoggedIn ? (
//               <>
//               <button
//                 onClick={handleLogout}
//                 className="w-full px-3 py-2.5 mt-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
//               >
//                 Logout
//               </button>
//               <a
//                   href="http://154.61.173.119:8090/pages/login.aspx"
//                   className="block px-3 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
//                 >
//                   LIS Login
//                 </a>
//               </>
              
//             ) : (
//               <div className="space-y-2 mt-2">
//                 <a
//                   href="/register"
//                   className="block px-3 py-2.5 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
//                 >
//                   Patient Login
//                 </a>
//                 <a
//                   href="http://154.61.173.119:8090/pages/login.aspx"
//                   className="block px-3 py-2.5 text-white bg-gray-600 hover:bg-gray-700 rounded-md transition-colors"
//                 >
//                   LIS Login
//                 </a>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;