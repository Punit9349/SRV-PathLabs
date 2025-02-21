import { useState, useEffect } from "react";
import API_BASE_URL from './../../config';
import axios from "axios";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const host = API_BASE_URL;

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${host}/api/appointment/`);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;

    try {
      await axios.delete(`${host}/api/appointment/${id}`);
      setAppointments(appointments.filter((appt) => appt._id !== id));
      alert("Appointment deleted successfully.");
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Appointment Management</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.length === 0 ? (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">No appointments found.</p>
          </div>
        ) : (
          appointments.map((appt) => (
            <div key={appt._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <div>
                  <h3 className="font-semibold text-lg">{appt.name}</h3>
                  <p className="text-sm text-gray-600">{appt.city}</p>
                </div>

                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {appt.email || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> {appt.phone}
                  </p>
                  <p>
                    <span className="font-medium">Prescription:</span>{" "}
                    {appt.prescription ? (
                      <a
                        href={`${host}/uploads/appointment/${appt.prescription}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline inline-flex items-center"
                      >
                        <span>Download</span>
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                      </a>
                    ) : (
                      "No file"
                    )}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => deleteAppointment(appt._id)}
                    className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors text-sm"
                  >
                    Delete Appointment
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;

// import { useState, useEffect } from "react";
// import axios from "axios";

// const AppointmentManagement = () => {
//   const [appointments, setAppointments] = useState([]);
//   const host = "http://localhost:5000";

//   useEffect(() => {
//     fetchAppointments();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       const response = await axios.get(`${host}/api/appointment/`);
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     }
//   };

//   const deleteAppointment = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this appointment?")) return;

//     try {
//       await axios.delete(`${host}/api/appointment/${id}`);
//       setAppointments(appointments.filter((appt) => appt._id !== id));
//       alert("Appointment deleted successfully.");
//     } catch (error) {
//       console.error("Error deleting appointment:", error);
//       alert("Failed to delete appointment.");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Appointments</h2>
//       <div className="bg-white p-4 shadow-md rounded">
//         {appointments.length === 0 ? (
//           <p>No appointments found.</p>
//         ) : (
//           <table className="w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">Name</th>
//                 <th className="border p-2">Email</th>
//                 <th className="border p-2">Phone</th>
//                 <th className="border p-2">City</th>
//                 <th className="border p-2">Prescription</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {appointments.map((appt) => (
//                 <tr key={appt._id} className="border">
//                   <td className="p-2">{appt.name}</td>
//                   <td className="p-2">{appt.email || "N/A"}</td>
//                   <td className="p-2">{appt.phone}</td>
//                   <td className="p-2">{appt.city}</td>
//                   <td className="p-2">
//                     {appt.prescription ? (
//                       <a href={`${host}/uploads/appointment/${appt.prescription}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                         Download File
//                       </a>
//                     ) : (
//                       "No file"
//                     )}
//                   </td>
//                   <td className="p-2">
//                     <button onClick={() => deleteAppointment(appt._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AppointmentManagement;
