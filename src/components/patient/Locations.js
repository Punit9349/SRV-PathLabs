import React, { useState } from 'react';

const Locations = () => {
  const locations = [
    {
      name: "Main Lab",
      city: "Delhi",
      address: "B-2/28A, Yamuna Vihar",
      nearby: "Near Bhajanpura Petrol Pump",
      googleMapsLink: "https://www.google.com/maps/place//@28.7026843,77.2506015,15z/data=!4m6!1m5!3m4!2zMjjCsDQyJzA5LjYiTiA3N8KwMTYnMDguNiJF!8m2!3d28.7026667!4d77.2690556?hl=en&entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      timings: "08:00 AM - 08:00 PM",
      weekdays: "Monday - Sunday",
      phone: "+91 9310740740",
      services: "Pathology, Laboratory"
    },
    {
      name: "Branch Lab1",
      city: "Delhi",
      address: "A-218, Street No.-8A, South Gamri",
      nearby: "",
      googleMapsLink: "https://goo.gl/maps/example2",
      timings: "09:00 AM - 07:00 PM",
      weekdays: "Monday - Saturday",
      phone: "+91-9876543210",
      services: "Pathology, Laboratory"
    },
    {
      name: "Branch Lab 2",
      city: "Sitamarhi(Bihar)",
      address: "Hospital Road, Madhesra Niwas",
      nearby: "",
      googleMapsLink: "https://maps.app.goo.gl/CnqrnGd46VSqa9Zg8",
      timings: "10:00 AM - 06:00 PM",
      weekdays: "Monday - Friday",
      phone: "+91-1122334455",
      services: "Pathology, Laboratory"
    },
  ];

  const [searchCity, setSearchCity] = useState("");

  const filteredLocations = locations.filter((location) =>
    location.city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by city name"
            className="w-full p-3 border border-gray-300 rounded-lg"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
          />
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg flex flex-col justify-between"
            >
              {/* Top Section */}
              <div>
                <h2 className="text-lg font-semibold text-blue-800 flex items-center">
                  <span className="mr-2">🔬</span> {location.name} - {location.city}
                </h2>
                <p className="text-gray-600">
                  {location.timings} | {location.weekdays}
                </p>
                <p className="mt-2 text-sm text-gray-800">
                  <strong>Address:</strong> {location.address}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Nearby:</strong> {location.nearby}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Phone:</strong> {location.phone}
                </p>
                <p className="text-sm text-gray-800">
                  <strong>Services:</strong> {location.services}
                </p>
              </div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center mt-4">
                <a
                  href={location.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Locate
                </a>
                {/* <button className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700">
                  View
                </button> */}
              </div>
            </div>
          ))}

          {filteredLocations.length === 0 && (
            <p className="text-center text-gray-600">No locations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;