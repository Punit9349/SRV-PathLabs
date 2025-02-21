// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminSpecialPrograms = () => {
//   const [programs, setPrograms] = useState([]);
//   const [tests, setTests] = useState([]); // For storing available tests
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     includedTests: [],
//     price: "",
//     priceBeforeDiscount: "",
//     startDate: "",
//     endDate: "",
//     tags: "",
//     image: null,
//     isFeatured: false,
//   });
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const host = "http://localhost:5000";

//   // Fetch programs
//   const fetchPrograms = async () => {
//     const { data } = await axios.get(`${host}/api/programs/special-programs`);
//     setPrograms(data);
//   };

//   // Fetch available tests
//   const fetchTests = async () => {
//     const { data } = await axios.get(`${host}/api/tests/getAllTests`);
//     setTests(data);
//   };

//   useEffect(() => {
//     fetchPrograms();
//     fetchTests();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const handleMultiSelectChange = (e) => {
//     const options = e.target.options;
//     const selectedTests = [];
//     for (let i = 0; i < options.length; i++) {
//       if (options[i].selected) {
//         selectedTests.push(options[i].value);
//       }
//     }
//     setFormData({ ...formData, includedTests: selectedTests });
//   };

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     for (let key in formData) {
//       if (key === "includedTests") {
//         data.append(key, JSON.stringify(formData[key]));
//       } else {
//         data.append(key, formData[key]);
//       }
//     }

//     if (isEditing) {
//       await axios.put(`${host}/api/programs/special-programs/${editId}`, data);
//       setIsEditing(false);
//       setEditId(null);
//     } else {
//       await axios.post(`${host}/api/programs/special-programs`, data);
//     }

//     fetchPrograms();
//     setFormData({
//       name: "",
//       description: "",
//       includedTests: [],
//       price: "",
//       priceBeforeDiscount: "",
//       startDate: "",
//       endDate: "",
//       tags: "",
//       image: null,
//       isFeatured: false,
//     });
//   };

//   const handleEdit = (program) => {
//     setIsEditing(true);
//     setEditId(program._id);
//     setFormData({
//       name: program.name,
//       description: program.description,
//       includedTests: program.includedTests.map((test) => test._id), // Extract test IDs
//       price: program.price,
//       priceBeforeDiscount: program.priceBeforeDiscount,
//       startDate: program.startDate.split("T")[0],
//       endDate: program.endDate.split("T")[0],
//       tags: program.tags.join(", "),
//       image: null,
//       isFeatured: program.isFeatured,
//     });
//   };

//   const handleDelete = async (id) => {
//     await axios.delete(`${host}/api/programs/special-programs/${id}`);
//     fetchPrograms();
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h2 className="text-2xl font-bold mb-4">Manage Special Programs</h2>
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">
//             {isEditing ? "Edit Program" : "Add New Program"}
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <input
//               name="name"
//               placeholder="Program Name"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.name}
//               onChange={handleChange}
//             />
//             <textarea
//               name="description"
//               placeholder="Description"
//               className="w-full px-4 py-2 border rounded-lg"
//               rows={3}
//               value={formData.description}
//               onChange={handleChange}
//             />
//             <select
//               multiple
//               name="includedTests"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.includedTests}
//               onChange={handleMultiSelectChange}
//             >
//               {tests.map((test) => (
//                 <option key={test._id} value={test._id}>
//                   {test.name}
//                 </option>
//               ))}
//             </select>
//             <input
//               name="price"
//               type="number"
//               placeholder="Price"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.price}
//               onChange={handleChange}
//             />
//             <input
//               name="priceBeforeDiscount"
//               type="number"
//               placeholder="Price Before Discount"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.priceBeforeDiscount}
//               onChange={handleChange}
//             />
//             <input
//               name="startDate"
//               type="date"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.startDate}
//               onChange={handleChange}
//             />
//             <input
//               name="endDate"
//               type="date"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.endDate}
//               onChange={handleChange}
//             />
//             <input
//               name="tags"
//               placeholder="Tags (comma-separated)"
//               className="w-full px-4 py-2 border rounded-lg"
//               value={formData.tags}
//               onChange={handleChange}
//             />
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="w-full px-4 py-2 border rounded-lg"
//             />
//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
//             >
//               {isEditing ? "Update Program" : "Create Program"}
//             </button>
//           </form>
//         </div>
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h3 className="text-xl font-semibold mb-4">Existing Programs</h3>
//           <ul className="space-y-4">
//             {programs.map((program) => (
//               <li
//                 key={program._id}
//                 className="p-4 border rounded-lg bg-gray-50 shadow-sm"
//               >
//                 <h4 className="font-bold text-lg">{program.name}</h4>
//                 <p>{program.description}</p>
//                 <p>Price: ₹{program.price}</p>
//                 <p>
//                   Discount Price: ₹{program.priceBeforeDiscount || "N/A"}
//                 </p>
//                 <button
//                   onClick={() => handleEdit(program)}
//                   className="text-blue-500 underline mr-4"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(program._id)}
//                   className="text-red-500 underline"
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminSpecialPrograms;

import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from './../../config';

const AdminSpecialPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [tests, setTests] = useState([]); // For storing available tests
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    includedTests: [],
    price: "",
    priceBeforeDiscount: "",
    startDate: "",
    endDate: "",
    tags: "",
    image: null,
    isFeatured: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const host = API_BASE_URL;

  // Fetch programs
  const fetchPrograms = async () => {
    const { data } = await axios.get(`${host}/api/programs/special-programs`);
    setPrograms(data);
  };

  // Fetch available tests
  const fetchTests = async () => {
    const { data } = await axios.get(`${host}/api/tests/getAllTests`);
    setTests(data);
  };

  useEffect(() => {
    fetchPrograms();
    fetchTests();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleMultiSelectChange = (e) => {
    const options = e.target.options;
    const selectedTests = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedTests.push(options[i].value);
      }
    }
    setFormData({ ...formData, includedTests: selectedTests });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key === "includedTests") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }

    if (isEditing) {
      await axios.put(`${host}/api/programs/special-programs/${editId}`, data);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post(`${host}/api/programs/special-programs`, data);
    }

    fetchPrograms();
    setFormData({
      name: "",
      description: "",
      includedTests: [],
      price: "",
      priceBeforeDiscount: "",
      startDate: "",
      endDate: "",
      tags: "",
      image: null,
      isFeatured: false,
    });
  };

  const handleEdit = (program) => {
    setIsEditing(true);
    setEditId(program._id);
    setFormData({
      name: program.name,
      description: program.description,
      includedTests: program.includedTests.map((test) => test._id), // Extract test IDs
      price: program.price,
      priceBeforeDiscount: program.priceBeforeDiscount,
      startDate: program.startDate.split("T")[0],
      endDate: program.endDate.split("T")[0],
      tags: program.tags.join(", "),
      image: null,
      isFeatured: program.isFeatured,
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`${host}/api/programs/special-programs/${id}`);
    fetchPrograms();
  };


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Manage Special Programs</h2>
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">
              {isEditing ? "✏️ Edit Program" : "➕ Add New Program"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Name</label>
                  <input
                    name="name"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Included Tests</label>
                  <select
                    multiple
                    name="includedTests"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-48"
                    value={formData.includedTests}
                    onChange={handleMultiSelectChange}
                  >
                    {tests.map((test) => (
                      <option key={test._id} value={test._id} className="p-2 hover:bg-blue-50">
                        {test.name}
                      </option>
                    ))}
                  </select>
                  <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                    <input
                      name="price"
                      type="number"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
                    <input
                      name="priceBeforeDiscount"
                      type="number"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.priceBeforeDiscount}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input
                      name="startDate"
                      type="date"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.startDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input
                      name="endDate"
                      type="date"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.endDate}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <input
                    name="tags"
                    placeholder="Comma-separated tags"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Program Image</label>
                  <div className="mt-1 flex items-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                {isEditing ? "Update Program" : "Create Program"}
              </button>
            </form>
          </div>

          {/* Programs List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b">📋 Existing Programs</h3>
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program._id} className="group relative p-4 rounded-lg border border-gray-200 hover:border-blue-200 hover:bg-blue-50 transition-colors duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg text-gray-900 mb-1">{program.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{program.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                          ₹{program.price}
                        </span>
                        {program.priceBeforeDiscount && (
                          <span className="text-gray-500 line-through">
                            ₹{program.priceBeforeDiscount}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(program)}
                        className="text-blue-600 hover:text-blue-800 p-1.5 rounded-md hover:bg-blue-100"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(program._id)}
                        className="text-red-600 hover:text-red-800 p-1.5 rounded-md hover:bg-red-100"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSpecialPrograms;