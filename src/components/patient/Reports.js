// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Reports = () => {
//   const [reports, setReports] = useState([]);
//   const patientId = localStorage.getItem('patientId');

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/patients/reports/${patientId}`);
//         console.log(response.data);
//         setReports(response.data);
//       } catch (error) {
//         console.error('Error fetching reports:', error);
//       }
//     };

//     fetchReports();
//   }, [patientId]);

//   return (
//     <div className="p-5">
//       <h2 className="text-2xl font-semibold mb-4">My Reports</h2>
//       {reports.length === 0 ? (
//         <p>No reports available</p>
//       ) : (
//         reports.map((report, index) => (
//           <div key={index} className="mb-4">
//             <p><strong>Test Name:</strong> {report.testName}</p>
//             <p><strong>Remark:</strong> {report.remark || 'No remarks'}</p>
//             <p><strong>Uploaded At:</strong> {new Date(report.uploadedAt).toLocaleDateString()}</p>
//             <a
//               href={`http://localhost:5000/uploads/reports/${report.filename}`}
//               download
//               className="text-blue-500 underline"
//             >
//               Download Report
//             </a>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Reports;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { DownloadIcon, Loader2 } from 'lucide-react';
import API_BASE_URL from '../../config';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const patientId = localStorage.getItem('patientId');
  const host=API_BASE_URL;

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          `${host}/api/patients/reports/${patientId}`
        );
        setReports(response.data);
      } catch (error) {
        setError('Failed to load reports. Please try again later.');
        console.error('Error fetching reports:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReports();
  }, [patientId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Medical Reports</h2>
      
      {reports.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">No reports available</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((report, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {report.testName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {format(new Date(report.uploadedAt), 'MMM dd, yyyy h:mm a')}
                  </p>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Remarks:</span>
                    <p className="text-gray-700 text-sm mt-1">
                      {report.remark || 'No remarks provided'}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href={`${host}/uploads/reports/${report.filename}`}
                    download
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  >
                    <DownloadIcon className="h-4 w-4 mr-2" />
                    Download Report
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;