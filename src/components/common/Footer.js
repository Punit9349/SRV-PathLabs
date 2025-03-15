// import React from "react";

// const Footer = () => {
//   return (
//     <div className="bg-yellow-400 py-16 px-28 mt-12">
//       <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//         {/* Patients Section */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">PATIENTS</h3>
//           <ul className="space-y-2">
//             <li>Book a Test</li>
//             <li>Nearest Centre</li>
//             <li>Download Report</li>
//             <li>Download App</li>
//             <li>Promotions & Discounts</li>
//             <li>Special Programs</li>
//           </ul>
//         </div>

//         {/* Doctors Section */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">DOCTORS</h3>
//           <ul className="space-y-2">
//             <li>Test Menu</li>
//             <li>Our Labs</li>
//             <li>Events</li>
//             <li>Quality</li>
//             <li>Resource Center</li>
//             <li>Our Departments</li>
//           </ul>
//         </div>

//         {/* Business Partnership Section */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">BUSINESS PARTNERSHIP</h3>
//           <ul className="space-y-2">
//             <li>Partner With Us</li>
//             <li>Become a Vendor</li>
//             <li>Corporate Tie-up</li>
//             {/* <li>International Partnership</li> */}
//             <li>Corporate Covid Testing</li>
//           </ul>
//         </div>

//         {/* About Us Section */}
//         <div>
//           <h3 className="font-bold text-lg mb-4">ABOUT US</h3>
//           <ul className="space-y-2">
//             <li>Our Journey</li>
//             <li>Vision, Mission & Values</li>
//             <li>Our Team</li>
//             <li>Our Network</li>
//             <li>Logistics Strength</li>
//             {/* <li>CSR</li>
//             <li>Career</li> */}
//           </ul>
//         </div>

//         {/* Investors Section */}
//         {/* <div>
//           <h3 className="font-bold text-lg mb-4">INVESTORS</h3>
//           <ul className="space-y-2">
//             <li>Financials</li>
//             <li>Investors Information</li>
//             <li>Corporate Governance</li>
//             <li>Smart ODR</li>
//             <li>SEBI Scores</li>
//           </ul>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-yellow-400 py-16 px-28 mt-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Patients Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">PATIENTS</h3>
          <ul className="space-y-2">
            <li><Link to="/test-menu">Book a Test</Link></li>
            <li><Link to="/locations">Nearest Centre</Link></li>
            <li><Link to="/download-reports">Download Report</Link></li>
            <li><Link to="/special-programs">Special Programs</Link></li>
          </ul>
        </div>

        {/* Doctors Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">DOCTORS</h3>
          <ul className="space-y-2">
            <li><Link to="/test-menu">Test Menu</Link></li>
            <li><Link to="/locations">Our Labs</Link></li>
            <li><Link to="/">Events</Link></li>
            <li><Link to="/">Quality</Link></li>
            <li><Link to="/">Our Departments</Link></li>
          </ul>
        </div>

        {/* Business Partnership Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">BUSINESS PARTNERSHIP</h3>
          <ul className="space-y-2">
            <li><Link to="/">Partner With Us</Link></li>
            <li><Link to="/">Become a Vendor</Link></li>
            <li><Link to="/">Corporate Tie-up</Link></li>
            <li><Link to="/">Corporate Covid Testing</Link></li>
          </ul>
        </div>

        {/* About Us Section */}
        <div>
          <h3 className="font-bold text-lg mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            <li><Link to="/">Our Journey</Link></li>
            <li><Link to="/">Vision, Mission & Values</Link></li>
            <li><Link to="/">Our Team</Link></li>
            <li><Link to="/">Our Network</Link></li>
            <li><Link to="/">Logistics Strength</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;

