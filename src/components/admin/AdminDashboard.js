import React, { useState, useEffect } from 'react';
import ReportManagement from "./ReportManagement";
import ProgramManagement from "./ProgramManagement";
import AppointmentManagement from './AppointmentsManagement';
import OrdersManagement from './OrdersManagement';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('patients'); // Default tab
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    name: '',
    description: '',
    instructions: '',
    price: '',
    category: '',
    location: '',
    parameters: '',
    frequency: '',
    available: true,
    homeCollection: true,
    labVisit: true,
  });
  const [editMode, setEditMode] = useState(false); // Track if editing a test
  const [editTestId, setEditTestId] = useState(null); // Store the ID of the test being edited
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token_admin");
  // Fetch Patients and Tests on Mount
  useEffect(() => {
    fetchPatients();
    fetchTests();
  }, []);

  // Fetch Patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients/getAllPatients',{
        headers: {
          "auth-token": token,
        }, 
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  // Fetch Tests
  const fetchTests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tests/getAllTests');
      setTests(response.data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  };

  // Handle New Test Input Changes
  const handleTestInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTest({
      ...newTest,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Create or Update Test
  const handleSaveTest = async () => {
    try {
      if (editMode) {
        await axios.put(`http://localhost:5000/api/tests/editTest/${editTestId}`, newTest, {
          headers: {
            "auth-token": token,
          }, 
        });
      } else {
        await axios.post('http://localhost:5000/api/tests/addTest', newTest, {
          headers: {
            "auth-token": token,
          }, 
        });
      }
      fetchTests(); // Refresh test list
      setNewTest({
        name: '',
        description: '',
        instructions: '',
        price: '',
        category: '',
        location: '',
        parameters: '',
        frequency: '',
        available: true,
        homeCollection: true,
        labVisit: true,
      }); // Reset form
      setEditMode(false); // Exit edit mode
      setEditTestId(null);
    } catch (error) {
      console.error(`Error ${editMode ? 'updating' : 'creating'} test:`, error);
    }
  };

  // Edit Test
  const handleEditTest = (test) => {
    setNewTest({
      name: test.name,
      description: test.description,
      instructions: test.instructions,
      price: test.price,
      category: test.category,
      location: test.location,
      parameters: test.parameters,
      frequency: test.frequency,
      available: test.available,
      homeCollection: test.homeCollection,
      labVisit: test.labVisit,
    });
    setEditMode(true);
    setEditTestId(test._id);
  };

  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tests/deleteTest/${testId}`, {
        headers: {
          "auth-token": token,
        }, 
      });
      // setMessage("Test deleted successfully!");
      setTests(tests.filter((test) => test._id !== testId));
    } catch (error) {
      // setMessage("Error deleting test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 w-[99%]">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {message && (
        <div className="mb-4 p-2 text-center text-white rounded bg-blue-500">
          {message}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex space-x-4 my-4">
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('patients')}
        >
          Patient Management
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTab === 'tests' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
          onClick={() => setActiveTab('tests')}
        >
          Test Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "reports" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("reports")}
        >
          Reports Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "programs" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("programs")}
        >
          Programs Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "appointments" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("appointments")}
        >
          Appointments Management
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("orders")}
        >
          Orders Management
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'patients' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Patient Management</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2">ID</th>
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Phone</th>
                  <th className="border border-gray-200 p-2">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) => (
                  <tr key={patient._id}>
                    <td className="border border-gray-200 p-2">{patient._id}</td>
                    <td className="border border-gray-200 p-2">{patient.name}</td>
                    <td className="border border-gray-200 p-2">{patient.phone}</td>
                    <td className="border border-gray-200 p-2">{patient.email || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "reports" && (
          <section>
            <ReportManagement/>
          </section>
        )}

        {activeTab === "programs" && (
          <section>
            <ProgramManagement/>
          </section>
        )}

        {activeTab === "appointments" && (
          <section>
            <AppointmentManagement/>
          </section>
        )}

        {activeTab === "orders" && (
          <section>
            <OrdersManagement/>
          </section>
        )}

        {activeTab === 'tests' && (
          <div>
            <h2 className="text-lg font-bold mb-4">Test Management</h2>

            {/* Test Creation/Editing Form */}
            <div className="mb-6">
              <h3 className="text-md font-bold mb-2">{editMode ? 'Edit Test' : 'Create New Test'}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Test Name"
                  value={newTest.name}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={newTest.description}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="instructions"
                  placeholder="Instructions"
                  value={newTest.instructions}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={newTest.price}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="category"
                  placeholder="Category"
                  value={newTest.category}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={newTest.location}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="parameters"
                  placeholder="Parameters (comma-separated)"
                  value={newTest.parameters}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="frequency"
                  placeholder="Frequency"
                  value={newTest.frequency}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="available"
                    checked={newTest.available}
                    onChange={handleTestInputChange}
                  />
                  <span>Available</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="homeCollection"
                    checked={newTest.homeCollection}
                    onChange={handleTestInputChange}
                  />
                  <span>Home Collection</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="labVisit"
                    checked={newTest.labVisit}
                    onChange={handleTestInputChange}
                  />
                  <span>Lab Visit</span>
                </label>
              </div>
              <button
                onClick={handleSaveTest}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {editMode ? 'Update Test' : 'Create Test'}
              </button>
            </div>

            {/* Test List */}
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 p-2">ID</th>
                  <th className="border border-gray-200 p-2">Name</th>
                  <th className="border border-gray-200 p-2">Price</th>
                  <th className="border border-gray-200 p-2">Parameters</th>
                  <th className="border border-gray-200 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tests.map((test) => (
                  <tr key={test._id}>
                    <td className="border border-gray-200 p-2">{test._id}</td>
                    <td className="border border-gray-200 p-2">{test.name}</td>
                    <td className="border border-gray-200 p-2">₹{test.price}</td>
                    <td className="border border-gray-200 p-2">{test.parameters}</td>
                    <td className="border border-gray-200 p-2">
                      <button
                        onClick={() => handleEditTest(test)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
                      >
                        Edit
                      </button>
                      <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
