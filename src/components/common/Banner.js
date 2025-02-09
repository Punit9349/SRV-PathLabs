import React, { useState, useEffect } from "react";

const Banner = () => {
  const images = [
    "b4.jpg",
    "b1.jpg",
    "b7.jpg",
  ];

  return (
    <div>
      <BannerCarousel images={images} />
    </div>
  );
};


const BannerCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move to the next image, loop back to the start if at the end
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images]);

  return (
    <div className="relative w-full overflow-hidden h-28 sm:h-40 md:h-56 lg:h-80">
      {/* Wrapper for sliding animation */}
      <div
        className="absolute inset-0 flex transition-transform duration-1000"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Banner ${index + 1}`}
            className="w-full object-cover flex-shrink-0 h-28 sm:h-40 md:h-56 lg:h-80"
          />
        ))}
      </div>

      {/* Optional: Dots for navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
