import React from "react";

const RunningLineContact = () => {
  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden w-fit">
      <div className="whitespace-nowrap overflow-hidden relative">
        <div className="animate-marquee inline-block w-[99%]">
          <span className="mx-8">📞 Contact: +91 93107-40740, +91 11 3501 2529</span>
          <span className="mx-8">📧 Email: srvpathlabspvtltd9@gmail.com</span>
          <span className="mx-8">🏢 Address: B-2/28A, Yamuna Vihar, Near Bhajanpura Petrol Pump</span>
        </div>
        <div className="animate-marquee inline-block w-full absolute top-0 left-full">
          <span className="mx-8">📞 Contact: +91 93107 40740, +91 11 3501 2529</span>
          <span className="mx-8">📧 Email: srvpathlabspvtltd9@gmail.com</span>
          <span className="mx-8">🏢 Address: B-2/28A, Yamuna Vihar, Near Bhajanpura Petrol Pump</span>
        </div>
      </div>
    </div>
  );
};

export default RunningLineContact;