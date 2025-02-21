import React from 'react';
import Banner from '../components/common/Banner';
import ServicesBar from '../components/common/ServiceBar';
import Whyus from '../components/common/Whyus';
import QualitySection from '../components/common/QualitySection';
import About from '../components/common/About';
import TestsSection from '../components/common/TestsSection';
import Footer from '../components/common/Footer';
import CertificateSection from '../components/common/Certificates';

const Home = () => {
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
      </div>  */}

     

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
  )
}

export default Home;