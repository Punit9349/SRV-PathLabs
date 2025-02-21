import React, { useState, useEffect } from 'react';
import ReportManagement from "./ReportManagement";
import ProgramManagement from "./ProgramManagement";
import AppointmentManagement from './AppointmentsManagement';
import OrdersManagement from './OrdersManagement';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import API_BASE_URL from './../../config';

const AdminDashboard = () => {
  let navigate=useNavigate();
  // const host = "http://82.29.160.72:5000";
  const host=API_BASE_URL;
  const [activeTab, setActiveTab] = useState('patients'); // Default tab
  const [patients, setPatients] = useState([]);
  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({
    deptId: '',
    itemId: '',
    name: '',
    testCode: '',
    departmentName: '',
    testMrp: '',
    testOfferRate: '',
    available: true,
    // name: '',
    // description: '',
    // instructions: '',
    // price: '',
    // category: '',
    // location: '',
    // parameters: '',
    // frequency: '',
    // homeCollection: true,
    // labVisit: true,
  });
  const [editMode, setEditMode] = useState(false); // Track if editing a test
  const [editTestId, setEditTestId] = useState(null); // Store the ID of the test being edited
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token_admin");
  // Fetch Patients and Tests on Mount

  useEffect(() => {
    if (!token) {
      navigate('/Admin-Login'); // Redirect to admin login if no token
    }
  }, [token, navigate]); 

  useEffect(() => {
    if (token) {
      fetchPatients();
      fetchTests();
    }
  }, []);

  // Fetch Patients
  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${host}/api/patients/getAllPatients`,{
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
      const response = await axios.get(`${host}/api/tests/getAllTests`);
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
        await axios.put(`${host}/api/tests/editTest/${editTestId}`, newTest, {
          headers: {
            "auth-token": token,
          }, 
        });
      } else {
        await axios.post(`${host}/api/tests/addTest`, newTest, {
          headers: {
            "auth-token": token,
          }, 
        });
      }
      fetchTests(); // Refresh test list
      setNewTest({
        deptId: '',
        itemId: '',
        name: '',
        testCode: '',
        departmentName: '',
        testMrp: '',
        testOfferRate: '',
        available: true,
        // name: '',
        // description: '',
        // instructions: '',
        // price: '',
        // category: '',
        // location: '',
        // parameters: '',
        // frequency: '',
        // available: true,
        // homeCollection: true,
        // labVisit: true,
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
      deptId: test.deptId,
      itemId: test.itemId,
      name: test.name,
      testCode: test.testCode,
      departmentName: test.departmentName,
      testMrp: test.testMrp,
      testOfferRate: test.testOfferRate,
      available: test.available,
      // name: test.name,
      // description: test.description,
      // instructions: test.instructions,
      // price: test.price,
      // category: test.category,
      // location: test.location,
      // parameters: test.parameters,
      // frequency: test.frequency,
      // available: test.available,
      // homeCollection: test.homeCollection,
      // labVisit: test.labVisit,
    });
    setEditMode(true);
    setEditTestId(test._id);
  };

  const handleDeleteTest = async (testId) => {
    try {
      await axios.delete(`${host}/api/tests/deleteTest/${testId}`, {
        headers: {
          "auth-token": token,
        }, 
      });
      setMessage("Test deleted successfully!");
      setTests(tests.filter((test) => test._id !== testId));
    } catch (error) {
      setMessage("Error deleting test.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 w-full overflow-x-hidden">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>

      {/* Tab Navigation - Modified for responsive layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 my-4">
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('patients')}
        >
          Patient Management
        </button>
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'tests' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('tests')}
        >
          Test Management
        </button>
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'reports' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
        </button>
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'programs' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('programs')}
        >
          Programs
        </button>
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'appointments' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('appointments')}
        >
          Appointments
        </button>
        <button
          className={`px-2 py-1.5 md:px-4 md:py-2 rounded-md text-sm md:text-base ${
            activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-300'
          } whitespace-nowrap`}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
      </div>

        {/* Content */}
        <div className="bg-white p-6 rounded-lg shadow-md">
        {activeTab === 'patients' && (
         <div>
         <h2 className="text-lg font-bold mb-4">Patient Management</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {patients.map((patient) => (
             <div key={patient._id} className="bg-white rounded-lg shadow-md p-4">
               <div className="space-y-2">
                 <p className="text-sm font-semibold">ID: 
                   <span className="font-normal block truncate">{patient._id}</span>
                 </p>
                 <p className="text-sm font-semibold">Name: 
                   <span className="font-normal">{patient.name}</span>
                 </p>
                 <p className="text-sm font-semibold">Phone: 
                   <span className="font-normal">{patient.phone}</span>
                 </p>
                 <p className="text-sm font-semibold">Email: 
                   <span className="font-normal block truncate">{patient.email || 'N/A'}</span>
                 </p>
               </div>
             </div>
           ))}
         </div>
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
                  name="deptId"
                  placeholder="Department ID"
                  value={newTest.deptId}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="itemId"
                  placeholder="Item ID"
                  value={newTest.itemId}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
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
                  name="testCode"
                  placeholder="Test Code"
                  value={newTest.testCode}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Department Name"
                  value={newTest.departmentName}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  name="testMrp"
                  placeholder="MRP"
                  value={newTest.testMrp}
                  onChange={handleTestInputChange}
                  className="border border-gray-300 p-2 rounded-md"
                />
                <input
                  type="number"
                  name="testOfferRate"
                  placeholder="Offer Rate"
                  value={newTest.testOfferRate}
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
              </div>
              <button
                onClick={handleSaveTest}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                {editMode ? 'Update Test' : 'Create Test'}
              </button>
            </div>

            {/* Test List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {tests.map((test) => (
              <div key={test._id} className="bg-white rounded-lg shadow-md p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">{test.name}</h3>
                  <p className="text-sm">
                    <span className="font-semibold">Test Code:</span> {test.testCode}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">MRP:</span> ₹{test.testMrp}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Offer Rate:</span> ₹{test.testOfferRate}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Department:</span> {test.departmentName}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => handleEditTest(test)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTest(test._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            </div>

          </div>
        )}
      </div>

    </div>
  );

  // return (
  //   <div className="min-h-screen bg-gray-100 p-6 w-[99%]">
  //     {/* Header */}
  //     <div className="bg-blue-600 text-white p-4 rounded-lg shadow-md">
  //       <h1 className="text-xl font-bold">Admin Dashboard</h1>
  //     </div>

  //     {message && (
  //       <div className="mb-4 p-2 text-center text-white rounded bg-blue-500">
  //         {message}
  //       </div>
  //     )}

  //     {/* Tab Navigation */}
  //     <div className="flex space-x-4 my-4">
  //       <button
  //         className={`px-4 py-2 rounded-md ${activeTab === 'patients' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
  //         onClick={() => setActiveTab('patients')}
  //       >
  //         Patient Management
  //       </button>
  //       <button
  //         className={`px-4 py-2 rounded-md ${activeTab === 'tests' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
  //         onClick={() => setActiveTab('tests')}
  //       >
  //         Test Management
  //       </button>
  //       <button
  //         className={`px-4 py-2 rounded ${
  //           activeTab === "reports" ? "bg-blue-500 text-white" : "bg-gray-200"
  //         }`}
  //         onClick={() => setActiveTab("reports")}
  //       >
  //         Reports Management
  //       </button>
  //       <button
  //         className={`px-4 py-2 rounded ${
  //           activeTab === "programs" ? "bg-blue-500 text-white" : "bg-gray-200"
  //         }`}
  //         onClick={() => setActiveTab("programs")}
  //       >
  //         Programs Management
  //       </button>
  //       <button
  //         className={`px-4 py-2 rounded ${
  //           activeTab === "appointments" ? "bg-blue-500 text-white" : "bg-gray-200"
  //         }`}
  //         onClick={() => setActiveTab("appointments")}
  //       >
  //         Appointments Management
  //       </button>
  //       <button
  //         className={`px-4 py-2 rounded ${
  //           activeTab === "orders" ? "bg-blue-500 text-white" : "bg-gray-200"
  //         }`}
  //         onClick={() => setActiveTab("orders")}
  //       >
  //         Orders Management
  //       </button>
  //     </div>

  //     {/* Content */}
  //     <div className="bg-white p-6 rounded-lg shadow-md">
  //       {activeTab === 'patients' && (
  //         <div>
  //           <h2 className="text-lg font-bold mb-4">Patient Management</h2>
  //           <table className="w-full border-collapse border border-gray-200">
  //             <thead>
  //               <tr>
  //                 <th className="border border-gray-200 p-2">ID</th>
  //                 <th className="border border-gray-200 p-2">Name</th>
  //                 <th className="border border-gray-200 p-2">Phone</th>
  //                 <th className="border border-gray-200 p-2">Email</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {patients.map((patient) => (
  //                 <tr key={patient._id}>
  //                   <td className="border border-gray-200 p-2">{patient._id}</td>
  //                   <td className="border border-gray-200 p-2">{patient.name}</td>
  //                   <td className="border border-gray-200 p-2">{patient.phone}</td>
  //                   <td className="border border-gray-200 p-2">{patient.email || 'N/A'}</td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       )}

  //       {activeTab === "reports" && (
  //         <section>
  //           <ReportManagement/>
  //         </section>
  //       )}

  //       {activeTab === "programs" && (
  //         <section>
  //           <ProgramManagement/>
  //         </section>
  //       )}

  //       {activeTab === "appointments" && (
  //         <section>
  //           <AppointmentManagement/>
  //         </section>
  //       )}

  //       {activeTab === "orders" && (
  //         <section>
  //           <OrdersManagement/>
  //         </section>
  //       )}

  //       {activeTab === 'tests' && (
  //         <div>
  //           <h2 className="text-lg font-bold mb-4">Test Management</h2>

  //           {/* Test Creation/Editing Form */}
  //           <div className="mb-6">
  //             <h3 className="text-md font-bold mb-2">{editMode ? 'Edit Test' : 'Create New Test'}</h3>
  //             <div className="grid grid-cols-2 gap-4">
  //               <input
  //                 type="text"
  //                 name="name"
  //                 placeholder="Test Name"
  //                 value={newTest.name}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="description"
  //                 placeholder="Description"
  //                 value={newTest.description}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="instructions"
  //                 placeholder="Instructions"
  //                 value={newTest.instructions}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="number"
  //                 name="price"
  //                 placeholder="Price"
  //                 value={newTest.price}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="category"
  //                 placeholder="Category"
  //                 value={newTest.category}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="location"
  //                 placeholder="Location"
  //                 value={newTest.location}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="parameters"
  //                 placeholder="Parameters (comma-separated)"
  //                 value={newTest.parameters}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <input
  //                 type="text"
  //                 name="frequency"
  //                 placeholder="Frequency"
  //                 value={newTest.frequency}
  //                 onChange={handleTestInputChange}
  //                 className="border border-gray-300 p-2 rounded-md"
  //               />
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="checkbox"
  //                   name="available"
  //                   checked={newTest.available}
  //                   onChange={handleTestInputChange}
  //                 />
  //                 <span>Available</span>
  //               </label>
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="checkbox"
  //                   name="homeCollection"
  //                   checked={newTest.homeCollection}
  //                   onChange={handleTestInputChange}
  //                 />
  //                 <span>Home Collection</span>
  //               </label>
  //               <label className="flex items-center space-x-2">
  //                 <input
  //                   type="checkbox"
  //                   name="labVisit"
  //                   checked={newTest.labVisit}
  //                   onChange={handleTestInputChange}
  //                 />
  //                 <span>Lab Visit</span>
  //               </label>
  //             </div>
  //             <button
  //               onClick={handleSaveTest}
  //               className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
  //             >
  //               {editMode ? 'Update Test' : 'Create Test'}
  //             </button>
  //           </div>

  //           {/* Test List */}
  //           <table className="w-full border-collapse border border-gray-200">
  //             <thead>
  //               <tr>
  //                 <th className="border border-gray-200 p-2">ID</th>
  //                 <th className="border border-gray-200 p-2">Name</th>
  //                 <th className="border border-gray-200 p-2">Price</th>
  //                 <th className="border border-gray-200 p-2">Parameters</th>
  //                 <th className="border border-gray-200 p-2">Actions</th>
  //               </tr>
  //             </thead>
  //             <tbody>
  //               {tests.map((test) => (
  //                 <tr key={test._id}>
  //                   <td className="border border-gray-200 p-2">{test._id}</td>
  //                   <td className="border border-gray-200 p-2">{test.name}</td>
  //                   <td className="border border-gray-200 p-2">₹{test.price}</td>
  //                   <td className="border border-gray-200 p-2">{test.parameters}</td>
  //                   <td className="border border-gray-200 p-2">
  //                     <button
  //                       onClick={() => handleEditTest(test)}
  //                       className="bg-yellow-500 text-white px-2 py-1 rounded-md mr-2"
  //                     >
  //                       Edit
  //                     </button>
  //                     <button
  //                     onClick={() => handleDeleteTest(test._id)}
  //                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
  //                   >
  //                     Delete
  //                   </button>
  //                   </td>
  //                 </tr>
  //               ))}
  //             </tbody>
  //           </table>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default AdminDashboard;
