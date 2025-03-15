// import React from 'react';
// import Banner from '../components/common/Banner';
// import ServicesBar from '../components/common/ServiceBar';
// import Whyus from '../components/common/Whyus';
// import QualitySection from '../components/common/QualitySection';
// import About from '../components/common/About';
// import TestsSection from '../components/common/TestsSection';
// import Footer from '../components/common/Footer';
// import CertificateSection from '../components/common/Certificates';

// const Home = () => {
//   return (
//     <div className='flex flex-col'>
//       <div className=''>
//         <Banner/>
//       </div> 
      
//       <div className=''>
//       <ServicesBar/>
//       </div>

//       <div className='px-7'>
//       <About/>
//       </div>

//       <div className='px-7'>
//       <Whyus/>
//       </div>

//       {/* <div className='px-7 py-1'>
//       <SpecialPrograms/>
//       </div>  */}

     

//       <div className='px-7 py-1'>
//       <QualitySection/>
//       </div>


//       <div className=' py-1 px-3'>
//       <CertificateSection/>
//       </div> 


//       <div className='px-7 py-1'>
//       <TestsSection/>
//       </div>

//       <div className='pt-1'>
//       <Footer/>
//       </div>
//     </div>
//   )
// }

// export default Home;

import React, { useState, useEffect } from 'react';
import Banner from '../components/common/Banner';
import ServicesBar from '../components/common/ServiceBar';
import Whyus from '../components/common/Whyus';
import QualitySection from '../components/common/QualitySection';
import SpecialPrograms from '../components/common/SpecialPrograms';
import About from '../components/common/About';
import TestsSection from '../components/common/TestsSection';
import Footer from '../components/common/Footer';
import CertificateSection from '../components/common/Certificates';

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
      <img 
        src="/back1.jpg" 
        alt="Loading..." 
        className="w-full h-full opacity-50 animate-[fade_1s_ease-in-out]"
      />
    </div>
  );
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='flex flex-col'>
      <div className=''>
        <Banner/>
      </div> 
      
      <div className=''>
      <ServicesBar/>
      </div>

      <div className='px-7'>
      <About/>
      </div>

      <div className='px-7'>
      <Whyus/>
      </div>

      {/* <div className='px-7 py-1'>
      <SpecialPrograms/>
      </div>   */}

     

      <div className='px-7 py-1'>
      <QualitySection/>
      </div>


      <div className=' py-1 px-3'>
      <CertificateSection/>
      </div> 


      <div className='px-7 py-1'>
      <TestsSection/>
      </div>

      <div className='pt-1'>
      <Footer/>
      </div>
    </div>
  );
};

export default Home;