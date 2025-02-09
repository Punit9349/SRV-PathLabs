// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Cart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [inCart, setInCart] = useState({});
//   const navigate = useNavigate();

//   // Fetch cart items from the backend
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const storedInCart = JSON.parse(localStorage.getItem("inCart")) || {};
//       setInCart(storedInCart);
//       const patientId = localStorage.getItem("patientId"); // Get patient ID from localStorage
//       if (!patientId) {
//         console.error("Patient ID is not available in localStorage.");
//         return;
//       }

//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/cart/${patientId}`
//         );
//         const cart = response.data; // Cart object
//         setCartItems(cart.items);
//         setTotalPrice(cart.totalPrice);
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   // Remove item from the cart
//   const handleRemove = async (testId,price) => {
//     const patientId = localStorage.getItem("patientId");
//     const token = localStorage.getItem("token");
//     if (!patientId) {
//       console.error("Patient ID is not available in localStorage.");
//       return;
//     }

//     try {
//       await axios.put(
//         "http://localhost:5000/api/cart/remove", {patientId,testId,price},  
//         {
//           headers: {
//             "auth-token": token,
//           },
//         }
//       );
//       const updatedCart = cartItems.filter((item) => item.test._id !== testId);
//       setCartItems(updatedCart);

//       // Recalculate total price
//       const updatedTotalPrice = updatedCart.reduce(
//         (sum, item) => sum + item.test.price * item.quantity,
//         0
//       );
//       setTotalPrice(updatedTotalPrice);

//        // Update inCart in localStorage
//        const updatedInCart = { ...inCart };
//        delete updatedInCart[testId];
//        setInCart(updatedInCart);
//        localStorage.setItem("inCart", JSON.stringify(updatedInCart));
//     } catch (error) {
//       console.error("Error removing item:", error);
//     }
//   };

//   // Navigate to add more tests
//   const handleAddTests = () => {
//     navigate("/test-menu");
//   };

//   // Navigate to proceed or add patient
//   const handleProceed = () => {
//     navigate("/patient-details");
//   };

//   return (
//     <div className="flex flex-col md:flex-row justify-between p-5">
//       {/* Left Section: Cart Items */}
//       <div className="flex-1 bg-white shadow-md rounded-lg p-5 mr-5">
//         <h2 className="text-xl font-semibold mb-4">Tests Added</h2>
//         {cartItems.map((item) => (
//           <div
//             key={item.test._id}
//             className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-3"
//           >
//             <div>
//               <h3 className="font-semibold text-lg">{item.test.name}</h3>
//               <p className="text-gray-600 text-sm">
//                 {item.test.parameters} Parameter(s) Covered
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 {item.test.preparation || "No special preparation required"}
//               </p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Quantity: {item.quantity}
//               </p>
//             </div>
//             <div className="text-right">
//               <p className="text-green-600 font-bold text-lg">
//                 ₹ {item.test.price}
//               </p>
//               <button
//                 className="text-red-500 mt-2 flex items-center"
//                 onClick={() => handleRemove(item.test._id, item.test.price)}
//               >
//                 {/* <span className="material-icons">delete</span>  */}
//                 Remove
//               </button>
//             </div>
//           </div>
//         ))}
//         <button
//           className="bg-blue-600 text-white px-4 py-2 rounded mt-5"
//           onClick={handleAddTests}
//         >
//           + Add More Tests
//         </button>
//       </div>

//       {/* Right Section: Summary */}
//       <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-5">
//         <h2 className="text-xl font-semibold mb-4">Amount to be Paid</h2>
//         <div className="flex justify-between mb-3">
//           <p>Total Price</p>
//           <p>₹ {totalPrice.toFixed(2)}</p>
//         </div>
//         <button
//           className="bg-blue-600 text-white w-full py-2 rounded mt-4"
//           onClick={handleProceed}
//         >
//           Proceed
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartPrograms, setCartPrograms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [inCart, setInCart] = useState({});
  const navigate = useNavigate();

  const token= localStorage.getItem('token');

  useEffect(() => {
    const fetchCartItems = async () => {
      // const storedInCart = JSON.parse(localStorage.getItem("inCart")) || {};
      // setInCart(storedInCart);
      const patientId = localStorage.getItem("patientId");
      if (!patientId) {
        console.error("Patient ID is not available in localStorage.");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/cart/${patientId}`);
        const cart = response.data;
        const items = cart.items || [];
        
        setCartItems(items.filter(item => item.test));
        setCartPrograms(items.filter(item => item.program));
        setTotalPrice(cart.totalPrice);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveTest = async (testId, price) => {
    const patientId = localStorage.getItem("patientId");
    const token = localStorage.getItem("token");
    if (!patientId) return;

    try {
      await axios.put("http://localhost:5000/api/cart/remove", { patientId, testId, price }, {
        headers: { "auth-token": token },
      });
      const updatedCart = cartItems.filter((item) => item.test._id !== testId);
      setCartItems(updatedCart);
      updateTotalPrice(updatedCart, cartPrograms);
      // updateLocalStorage(testId);
    } catch (error) {
      console.error("Error removing test:", error);
    }
  };

  const handleRemoveProgram = async (programId, price) => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) return;

    try {
      await axios.put("http://localhost:5000/api/cart/remove", { patientId, programId, price }, {
        headers: { "auth-token": token },
      });
      const updatedPrograms = cartPrograms.filter((item) => item.program._id !== programId);
      setCartPrograms(updatedPrograms);
      updateTotalPrice(cartItems, updatedPrograms);
    } catch (error) {
      console.error("Error removing program:", error);
    }
  };

  const updateTotalPrice = (tests, programs) => {
    const total = tests.reduce((sum, item) => sum + item.test.price, 0) +
                  programs.reduce((sum, item) => sum + item.program.price, 0);
    setTotalPrice(total);
  };

  // const updateLocalStorage = (testId) => {
  //   const updatedInCart = { ...inCart };
  //   delete updatedInCart[testId];
  //   setInCart(updatedInCart);
  //   localStorage.setItem("inCart", JSON.stringify(updatedInCart));
  // };

  const handleAddTests = () => navigate("/test-menu");
  const handleProceed = () => navigate("/payments");

  return (
    <div className="flex flex-col md:flex-row justify-between p-5">
      {/* Left Section: Cart Items */}
      <div className="flex-1 bg-white shadow-md rounded-lg p-5 mr-5">
        <h2 className="text-xl font-semibold mb-4">Tests & Programs Added</h2>

        {/* Display Tests */}
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-3">
            <div>
              <h3 className="font-semibold text-lg">{item.test.name}</h3>
              <p className="text-gray-600 text-sm">{item.test.parameters} Parameter(s) Covered</p>
              <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold text-lg">₹ {item.test.price}</p>
              <button className="text-red-500 mt-2" onClick={() => handleRemoveTest(item.test._id, item.test.price)}>Remove</button>
            </div>
          </div>
        ))}

        {/* Display Special Programs */}
        {cartPrograms.map((item) => (
          <div key={item._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg mb-3">
            <div>
              <h3 className="font-semibold text-lg">{item.program.name}</h3>
              <p className="text-gray-600 text-sm">{item.program.description}</p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold text-lg">₹ {item.program.price}</p>
              <button className="text-red-500 mt-2" onClick={() => handleRemoveProgram(item.program._id, item.program.price)}>Remove</button>
            </div>
          </div>
        ))}

        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-5" onClick={handleAddTests}>+ Add More Tests</button>
      </div>

      {/* Right Section: Summary */}
      <div className="w-full md:w-1/3 bg-white shadow-md rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-4">Amount to be Paid</h2>
        <div className="flex justify-between mb-3">
          <p>Total Price</p>
          <p>₹ {totalPrice.toFixed(2)}</p>
        </div>
        <button className="bg-blue-600 text-white w-full py-2 rounded mt-4" onClick={handleProceed}>Proceed</button>
      </div>
    </div>
  );
};

export default Cart;
