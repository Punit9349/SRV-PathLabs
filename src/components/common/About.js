import React from 'react';
import { FaFlask, FaUserMd, FaShieldAlt, FaThumbsUp } from 'react-icons/fa';

const HealthcarePartner = () => {
  return (
    <section className="bg-white-200 rounded-xl md:rounded-2xl p-4 md:p-8 mx-auto my-4 md:mt-7 mb-4 container max-w-7xl px-4 sm:px-6 lg:px-8 shadow-md">
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">
          <span className="text-blue-600">SRV PathLabs</span> – Your Trusted Healthcare Partner
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          With over seven decades of excellence, we deliver precise diagnostic solutions through cutting-edge technology 
          and medical expertise, empowering your health decisions.
        </p>
      </div>

      <div className="bg-blue-50 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-8 flex flex-col md:flex-row items-start md:items-center">
        <FaFlask className="text-blue-600 text-2xl md:text-4xl mb-2 md:mb-0 md:mr-4 flex-shrink-0" />
        <div>
          <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-1 md:mb-2">15+ Years of Diagnostic Excellence</h3>
          <p className="text-xs md:text-sm text-gray-600">Pioneers in accurate results and timely delivery</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-10">
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-start">
            <FaUserMd className="text-blue-600 mt-1 mr-2 md:mr-3 text-sm md:text-base flex-shrink-0" />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Expert Medical Team</h3>
              <p className="text-xs md:text-sm text-gray-600">
                Board-certified <span className="text-blue-600 font-medium">doctors</span> and skilled technicians 
                ensuring precision in every test
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <FaShieldAlt className="text-blue-600 mt-1 mr-2 md:mr-3 text-sm md:text-base flex-shrink-0" />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Comprehensive Testing</h3>
              <p className="text-xs md:text-sm text-gray-600">
                From <span className="text-blue-600 font-medium">routine blood work</span> to advanced genetic testing
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          <div className="flex items-start">
            <FaThumbsUp className="text-blue-600 mt-1 mr-2 md:mr-3 text-sm md:text-base flex-shrink-0" />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Quality Assurance</h3>
              <p className="text-xs md:text-sm text-gray-600">ISO-certified labs with next-generation diagnostic equipment</p>
            </div>
          </div>

          <div className="flex items-start">
            <FaShieldAlt className="text-blue-600 mt-1 mr-2 md:mr-3 text-sm md:text-base flex-shrink-0" />
            <div>
              <h3 className="text-sm md:text-base font-semibold text-gray-900 mb-1 md:mb-2">Fast Results</h3>
              <p className="text-xs md:text-sm text-gray-600">Digital reports available within 24-48 hours for most tests</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <a href='/test-menu'>
        <button className="bg-blue-600 text-white text-sm md:text-base px-4 py-2 md:px-8 md:py-3 rounded-md md:rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 inline-flex items-center w-full md:w-auto justify-center">
          View Complete Test Menu
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        </a>
      </div>
    </section>
  );
};

export default HealthcarePartner;
