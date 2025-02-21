import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminAuth from "../components/patient/Login";
import { useNavigate } from "react-router-dom";

const TestMenu = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const host = "http://localhost:5000"; // Update if needed
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/tests/getAllTests");
        setTests(response.data);
      } catch (err) {
        setError("Failed to fetch tests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        const patientId = localStorage.getItem("patientId");
        if (!token || !patientId) return;

        const { data } = await axios.get(`${host}/api/cart/${patientId}`);
        setCart(data?.items || []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
      }
    };

    fetchTests();
    fetchCart();
  }, []);

  const isInCart = (testId) => cart.some((item) => item.test?._id === testId);

  const handleAddToCart = async (test) => {
    if (!isLoggedIn) {
      setShowPopup(true);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");

      const response = await axios.post("http://localhost:5000/api/cart/add", {
        patientId,
        testId:test._id,
        price:test.testOfferRate,
      }, {
        headers: { "auth-token": token },
      });

      setCart([...cart, { test }]); // Update UI instantly
    } catch (err) {
      console.error("Error adding to cart:", err.response?.data || err.message);
    }
  };

  const handleRemoveFromCart = async (test) => {
    try {
      const token = localStorage.getItem("token");
      const patientId = localStorage.getItem("patientId");

      const response = await axios.put("http://localhost:5000/api/cart/remove", {
        patientId: patientId,
        testId: test._id,
        price:test.price,
      }, {
        headers: { "auth-token": token },
      });

      // setCart(response.data.items);
      setCart(cart.filter((item) => item.test?._id !== test._id));
    } catch (err) {
      console.error("Error removing from cart:", err.response?.data || err.message);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowPopup(false);
    navigate("/register");
  };

  const filteredTests = tests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 p-5">
      <h1 className="text-2xl font-semibold mb-5">Available Tests</h1>
      <input
        type="text"
        placeholder="Search by test name"
        className="w-full p-3 border border-gray-300 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
      {filteredTests.map((test) => (
  <div key={test._id} className="bg-white shadow-md p-4 rounded-lg">
    <h3 className="font-semibold text-lg">{test.name}</h3>
    <div className="mb-2">
      <span className="text-sm text-gray-500">{test.departmentName}</span>
      <span className="text-xs text-gray-400 ml-2">#{test.testCode}</span>
    </div>
    <p className="text-gray-600 text-sm">{test.description}</p>
    <p className="text-gray-600 text-sm">{test.instructions}</p>
    
    <div className="price-container mt-2">
      <span className="line-through text-gray-400 mr-2">₹{test.testMrp}</span>
      <span className="text-xl font-bold text-red-600">₹{test.testOfferRate}</span>
    </div>

    <div className="flex items-center space-x-2 mt-2">
      {test.homeCollection && <p className="text-green-600 text-sm">✔ Home Collection</p>}
      {test.labVisit && <p className="text-green-600 text-sm">✔ Lab Visit</p>}
    </div>

    <div className="mt-4">
      {isInCart(test._id) ? (
        <button onClick={() => handleRemoveFromCart(test)} className="bg-red-500 text-white px-4 py-2 rounded">
          Remove
        </button>
      ) : (
        test.available ? (
          <button onClick={() => handleAddToCart(test)} className="bg-blue-600 text-white px-4 py-2 rounded">
            Add to cart
          </button>
        ) : (
          <button disabled className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed">
            Out of Stock
          </button>
        )
      )}
    </div>
  </div>
))}
{filteredTests.length === 0 && <p className="text-center text-gray-600">No tests found.</p>}
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-80 relative">
            <button className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800" onClick={() => setShowPopup(false)}>&times;</button>
            <div className="p-1">
              <AdminAuth onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestMenu;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const TestMenu = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch tests and set initial cart state
//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/tests/getAllTests");
//         const fetchedTests = response.data;

//         // Retrieve inCart state from localStorage and merge with fetched tests
//         const savedCart = JSON.parse(localStorage.getItem("inCart")) || {};
//         const updatedTests = fetchedTests.map((test) => ({
//           ...test,
//           inCart: savedCart[test._id] || false,
//         }));

//         setTests(updatedTests);
//       } catch (err) {
//         setError("Failed to fetch tests. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, []);

//   // Update localStorage with the latest cart state
//   const updateLocalStorageCart = (updatedTests) => {
//     const cartState = updatedTests.reduce((acc, test) => {
//       acc[test._id] = test.inCart;
//       return acc;
//     }, {});
//     localStorage.setItem("inCart", JSON.stringify(cartState));
//   };

//   // Add to cart functionality
//   const handleAddToCart = async (testId, price) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("User is not authenticated");
//       const patientId = localStorage.getItem("patientId");

//       await axios.post(
//         "http://localhost:5000/api/cart/add",
//         { testId, quantity: 1, patientId, price },
//         {
//           headers: {
//             "auth-token": token,
//           },
//         }
//       );

//       // Update state and localStorage
//       const updatedTests = tests.map((test) =>
//         test._id === testId ? { ...test, inCart: true } : test
//       );
//       setTests(updatedTests);
//       updateLocalStorageCart(updatedTests);
//     } catch (err) {
//       console.error("Error adding to cart:", err.response?.data || err.message);
//     }
//   };

//   // Remove from cart functionality
//   const handleRemoveFromCart = async (testId, price) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) throw new Error("User is not authenticated");

//       const patientId = localStorage.getItem("patientId");

//       await axios.put(
//         "http://localhost:5000/api/cart/remove",
//         { patientId, testId, price },
//         {
//           headers: {
//             "auth-token": token,
//           },
//         }
//       );

//       // Update state and localStorage
//       const updatedTests = tests.map((test) =>
//         test._id === testId ? { ...test, inCart: false } : test
//       );
//       setTests(updatedTests);
//       updateLocalStorageCart(updatedTests);
//     } catch (err) {
//       console.error("Error removing from cart:", err.response?.data || err.message);
//     }
//   };

//   // Filter tests based on the search term
//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="text-center text-lg">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-gray-100 p-5">
//       <h1 className="text-2xl font-semibold mb-5">Available Tests</h1>

//       {/* Search Bar */}
//       <div className="mb-5">
//         <input
//           type="text"
//           placeholder="Search by test name"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredTests.map((test) => (
//           <div
//             key={test._id}
//             className="bg-white shadow-md p-4 rounded-lg flex flex-col items-start"
//           >
//             <h3 className="font-semibold text-lg">{test.name}</h3>
//             <p className="text-gray-600 text-sm">
//               {test.parameters} Parameter(s) Covered
//             </p>
//             <p className="text-xl font-bold mt-2">₹ {test.price}</p>
//             <div className="flex items-center space-x-2 mt-2">
//               {test.homeCollection && (
//                 <p className="text-green-600 text-sm">✔ Home Collection</p>
//               )}
//               {test.labVisit && (
//                 <p className="text-green-600 text-sm">✔ Lab Visit</p>
//               )}
//             </div>
//             <div className="flex items-center justify-between w-full mt-4">
//               {test.inCart ? (
//                 <button
//                   onClick={() => handleRemoveFromCart(test._id, test.price)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleAddToCart(test._id, test.price)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Add to cart
//                 </button>
//               )}
//               <label className="flex items-center text-sm">
//                 <input type="checkbox" className="mr-2" />
//                 Compare
//               </label>
//               <a href="#more" className="text-blue-600 text-sm">
//                 Know More
//               </a>
//             </div>
//           </div>
//         ))}

//         {filteredTests.length === 0 && (
//           <p className="text-center text-gray-600">No tests found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TestMenu;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminAuth from "../components/patient/Login";
// import {useNavigate } from "react-router-dom";

// const TestMenu = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPopup, setShowPopup] = useState(false); // State for the login/signup popup
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Check login status
//   const navigate = useNavigate();

//   // Fetch tests and set initial cart state
//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/tests/getAllTests");
//         const fetchedTests = response.data;

//         // Retrieve inCart state from localStorage and merge with fetched tests
//         const savedCart = JSON.parse(localStorage.getItem("inCart")) || {};
//         const updatedTests = fetchedTests.map((test) => ({
//           ...test,
//           inCart: savedCart[test._id] || false,
//         }));

//         setTests(updatedTests);
//       } catch (err) {
//         setError("Failed to fetch tests. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTests();
//   }, []);
  

//   // Update localStorage with the latest cart state
//   const updateLocalStorageCart = (updatedTests) => {
//     const cartState = updatedTests.reduce((acc, test) => {
//       acc[test._id] = test.inCart;
//       return acc;
//     }, {});
//     localStorage.setItem("inCart", JSON.stringify(cartState));
//   };

//   // Add to cart functionality
//   const handleAddToCart = async (testId, price) => {
//     if (!isLoggedIn) {
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const patientId = localStorage.getItem("patientId");

//       await axios.post(
//         "http://localhost:5000/api/cart/add",
//         { testId, quantity: 1, patientId, price },
//         {
//           headers: {
//             "auth-token": token,
//           },
//         }
//       );

//       // Update state and localStorage
//       const updatedTests = tests.map((test) =>
//         test._id === testId ? { ...test, inCart: true } : test
//       );
//       setTests(updatedTests);
//       updateLocalStorageCart(updatedTests);
//     } catch (err) {
//       console.error("Error adding to cart:", err.response?.data || err.message);
//     }
//   };

//   // Remove from cart functionality
//   const handleRemoveFromCart = async (testId, price) => {
//     try {
//       const token = localStorage.getItem("token");
//       const patientId = localStorage.getItem("patientId");

//       await axios.put(
//         "http://localhost:5000/api/cart/remove",
//         { patientId, testId, price },
//         {
//           headers: {
//             "auth-token": token,
//           },
//         }
//       );

//       // Update state and localStorage
//       const updatedTests = tests.map((test) =>
//         test._id === testId ? { ...test, inCart: false } : test
//       );
//       setTests(updatedTests);
//       updateLocalStorageCart(updatedTests);
//     } catch (err) {
//       console.error("Error removing from cart:", err.response?.data || err.message);
//     }
//   };

//   // Handle successful login or signup
//   const handleAuthSuccess = () => {
//     setIsLoggedIn(true);
//     setShowPopup(false);
//     navigate("/register");
//   };

//   // Filter tests based on the search term
//   const filteredTests = tests.filter((test) =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <div className="text-center text-lg">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>;
//   }

//   return (
//     <div className="bg-gray-100 p-5">
//       <h1 className="text-2xl font-semibold mb-5">Available Tests</h1>

//       {/* Search Bar */}
//       <div className="mb-5">
//         <input
//           type="text"
//           placeholder="Search by test name"
//           className="w-full p-3 border border-gray-300 rounded-lg"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {filteredTests.map((test) => (
//           <div
//             key={test._id}
//             className="bg-white shadow-md p-4 rounded-lg flex flex-col items-start"
//           >
//             <h3 className="font-semibold text-lg">{test.name}</h3>
//             <p className="text-gray-600 text-sm">
//               {test.parameters} Parameter(s) Covered
//             </p>
//             <p className="text-xl font-bold mt-2">₹ {test.price}</p>
//             <div className="flex items-center space-x-2 mt-2">
//               {test.homeCollection && (
//                 <p className="text-green-600 text-sm">✔ Home Collection</p>
//               )}
//               {test.labVisit && (
//                 <p className="text-green-600 text-sm">✔ Lab Visit</p>
//               )}
//             </div>
//             <div className="flex items-center justify-between w-full mt-4">
//               {test.inCart ? (
//                 <button
//                   onClick={() => handleRemoveFromCart(test._id, test.price)}
//                   className="bg-red-500 text-white px-4 py-2 rounded"
//                 >
//                   Remove
//                 </button>
//               ) : (
//                 <button
//                   onClick={() => handleAddToCart(test._id, test.price)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Add to cart
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}

//         {filteredTests.length === 0 && (
//           <p className="text-center text-gray-600">No tests found.</p>
//         )}
//       </div>

//       {/* Popup for login/signup */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-80 relative">
//             <button
//               className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800"
//               onClick={() => setShowPopup(false)}
//             >
//               &times;
//             </button>
//             <div className="p-1">
//               <AdminAuth onAuthSuccess={handleAuthSuccess} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestMenu;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import AdminAuth from "../components/patient/Login";
// import { useNavigate } from "react-router-dom";

// const TestMenu = () => {
//   const [tests, setTests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchTests = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("http://localhost:5000/api/tests/getAllTests");
//         setTests(response.data);
//       } catch (err) {
//         setError("Failed to fetch tests. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchTests();
//   }, []);

//   const handleAddToCart = async (testId, price) => {
//     if (!isLoggedIn) {
//       setShowPopup(true);
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const patientId = localStorage.getItem("patientId");

//       await axios.post("http://localhost:5000/api/cart/add", { testId, quantity: 1, patientId, price }, {
//         headers: { "auth-token": token }
//       });
//       setTests(tests.map(test => (test._id === testId ? { ...test, inCart: true } : test)));
//     } catch (err) {
//       console.error("Error adding to cart:", err.response?.data || err.message);
//     }
//   };

//   const handleRemoveFromCart = async (testId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const patientId = localStorage.getItem("patientId");

//       await axios.put("http://localhost:5000/api/cart/remove", { patientId, testId }, {
//         headers: { "auth-token": token }
//       });
//       setTests(tests.map(test => (test._id === testId ? { ...test, inCart: false } : test)));
//     } catch (err) {
//       console.error("Error removing from cart:", err.response?.data || err.message);
//     }
//   };

//   const handleAuthSuccess = () => {
//     setIsLoggedIn(true);
//     setShowPopup(false);
//     navigate("/register");
//   };

//   const filteredTests = tests.filter(test =>
//     test.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) return <div className="text-center text-lg">Loading...</div>;
//   if (error) return <div className="text-center text-red-500">{error}</div>;

//   return (
//     <div className="bg-gray-100 p-5">
//       <h1 className="text-2xl font-semibold mb-5">Available Tests</h1>
//       <input
//         type="text"
//         placeholder="Search by test name"
//         className="w-full p-3 border border-gray-300 rounded-lg"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
//         {filteredTests.map((test) => (
//           <div key={test._id} className="bg-white shadow-md p-4 rounded-lg">
//             <h3 className="font-semibold text-lg">{test.name}</h3>
//             <p className="text-gray-600 text-sm">{test.description}</p>
//             <p className="text-gray-600 text-sm">{test.instructions}</p>
//             {/* <p className="text-gray-600 text-sm">Category: {test.category || "N/A"}</p> */}
//             {/* <p className="text-gray-600 text-sm">Location: {test.location || "N/A"}</p> */}
//             {/* <p className="text-gray-600 text-sm">Frequency: {test.frequency || "N/A"}</p> */}
//             <p className="text-xl font-bold mt-2">₹ {test.price}</p>
//             <div className="flex items-center space-x-2 mt-2">
//               {test.homeCollection && <p className="text-green-600 text-sm">✔ Home Collection</p>}
//               {test.labVisit && <p className="text-green-600 text-sm">✔ Lab Visit</p>}
//             </div>
//             <div className="mt-4">
//               {test.inCart ? (
//                 <button onClick={() => handleRemoveFromCart(test._id)} className="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
//               ) : (
//                 <button onClick={() => handleAddToCart(test._id, test.price)} className="bg-blue-600 text-white px-4 py-2 rounded">Add to cart</button>
//               )}
//             </div>
//           </div>
//         ))}
//         {filteredTests.length === 0 && <p className="text-center text-gray-600">No tests found.</p>}
//       </div>
//       {showPopup && (
//         <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-80 relative">
//             <button className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-800" onClick={() => setShowPopup(false)}>&times;</button>
//             <div className="p-1">
//               <AdminAuth onAuthSuccess={handleAuthSuccess} />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestMenu;

