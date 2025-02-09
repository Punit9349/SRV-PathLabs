import React from "react";

const CertificateSection = () => {
  // Certificates data
  const certificates = [
    {
      name: "",
      pdfUrl: "C1.pdf", // Update with your PDF URLs
      thumbnail: "c1.png", // Optional: Add thumbnails
    },
    {
      name: "",
      pdfUrl: "/c2.pdf",
      thumbnail: "/c2.png",
    },
    {
      name: "Certificate of Accreditation",
      pdfUrl: "/c3.pdf",
      thumbnail: "/c3.png",
    },
    {
      name: "Certificate of Incorporation",
      pdfUrl: "/Certificate of Incorporation.pdf",
      thumbnail: "c4.png",
    },
    {
      name: "UDYAM Registration Certificate",
      pdfUrl: "/MSME SRV.pdf",
      thumbnail: "/c4.png",
    },
    {
      name: "QAS-BC-Entry Level-00024",
      pdfUrl: "/C6.pdf",
      thumbnail: "/c3.png",
    },
  ];

  return (
    <div className="p-10 w-fit">
      <div className="text-center mb-12">
      <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gray-900">
              SRV PATHLAB Certifications
            </span>
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Accredited certifications and quality assurance documents
          </p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center text-center"
          >
            {cert.thumbnail ? (
              <img
                src={cert.thumbnail}
                alt={`${cert.name} Thumbnail`}
                className="w-full h-full object-cover mb-4 rounded"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 mb-4 flex items-center justify-center rounded">
                <span className="text-gray-500">No Preview Available</span>
              </div>
            )}
            <h3 className="text-lg font-semibold">{cert.name}</h3>
            <div className="mt-4">
              <a
                href={cert.pdfUrl}
                view
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                View Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificateSection;
