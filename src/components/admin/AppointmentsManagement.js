import { useState, useEffect } from "react";
import axios from "axios";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const host = "http://localhost:5000";

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
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard - Appointments</h2>
      <div className="bg-white p-4 shadow-md rounded">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">City</th>
                <th className="border p-2">Prescription</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="border">
                  <td className="p-2">{appt.name}</td>
                  <td className="p-2">{appt.email || "N/A"}</td>
                  <td className="p-2">{appt.phone}</td>
                  <td className="p-2">{appt.city}</td>
                  <td className="p-2">
                    {appt.prescription ? (
                      <a href={`${host}/uploads/appointment/${appt.prescription}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        Download File
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td className="p-2">
                    <button onClick={() => deleteAppointment(appt._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;
