// // src/components/PaymentPage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const PaymentPage = () => {
//   const [patient, setPatient] = useState({});
//   const [cart, setCart] = useState(null);
//   const [transactionId, setTransactionId] = useState("");
//   const [paymentImage, setPaymentImage] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const patientId = localStorage.getItem("patientId");
//     if (!patientId) return;

//     // Fetch patient details
//     axios.get(`http://localhost:5000/api/patients/getPatientById/${patientId}`)
//       .then((res) => setPatient(res.data))
//       .catch((err) => console.error("Error fetching patient details:", err));

//     // Fetch cart details (expects { items, totalPrice })
//     axios.get(`http://localhost:5000/api/cart/${patientId}`, {
//       headers: { "auth-token": localStorage.getItem("token") },
//     })
//       .then((res) => setCart(res.data))
//       .catch((err) => console.error("Error fetching cart:", err));
//   }, []);

//   // const handleImageChange = (e) => {
//   //   console.log(e.target.files[0].name);
//   //   setPaymentImage(e.target.files[0]);
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const patientId = localStorage.getItem("patientId");
//     if (!cart) {
//       alert("Cart is empty");
//       return;
//     }
//     const orderData = new FormData();
//     orderData.append("patient", patientId);
//     // Append the cart items array as a JSON string
//     orderData.append("cartItems", JSON.stringify(cart.items));
//     orderData.append("totalAmount", cart.totalPrice);
//     orderData.append("transactionId", transactionId);
//     if (paymentImage) {
//       orderData.append("paymentImage", paymentImage);
//     }

//     try {
//       await axios.post("http://localhost:5000/api/orders/submit", orderData, 
//       // {
//     //     headers: { "Content-Type": "multipart/form-data" },
//     //   }
//     );
//       alert("Order submitted successfully!");
//       navigate("/order-success");
//     } catch (error) {
//       console.error("Error submitting order:", error);
//       alert("Failed to submit order");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Payment Details</h1>
//       <div className="flex flex-col lg:flex-row gap-6">
//         {/* Left Section: Patient & Cart Details */}
//         <div className="flex-1 bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
//           <div className="mb-4 border p-4 rounded">
//             <h3 className="font-bold">Patient Details:</h3>
//             <p><strong>Name:</strong> {patient.name}</p>
//             <p><strong>Phone:</strong> {patient.phone}</p>
//             <p><strong>Email:</strong> {patient.email || "N/A"}</p>
//           </div>
//           <div className="mb-4 border p-4 rounded">
//             <h3 className="font-bold">Cart Items:</h3>
//             {cart && cart.items && cart.items.length > 0 ? (
//               cart.items.map((item, index) => (
//                 <div key={index} className="border-b py-2">
//                   {item.test ? (
//                     <p>{item.test.name} (₹ {item.test.price}) x {item.quantity}</p>
//                   ) : item.program ? (
//                     <p>{item.program.name} (₹ {item.program.price})</p>
//                   ) : null}
//                 </div>
//               ))
//             ) : (
//               <p>No items in cart.</p>
//             )}
//           </div>
//           <div className="mb-4 border p-4 rounded">
//             <h3 className="font-bold">Total Amount: ₹ {cart ? cart.totalPrice : 0}</h3>
//           </div>
//         </div>
//         {/* Right Section: QR Code, Bank Details, and Payment Form */}
//         <div className="flex-1 bg-white shadow-md rounded-lg p-6">
//           <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
//           <div className="mb-6 text-center">
//             <img src="/qr-code.jpeg" alt="QR Code" className="w-48 h-72 mx-auto" />
//             <div className="mt-4">
//               <p className="font-bold">Bank Details:</p>
//               <p>Account Name: SRV PathLabs Pvt Ltd</p>
//               <p>Account No: 10143770879</p>
//               <p>IFSC: IDFB0020148</p>
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block font-medium">Transaction ID</label>
//               <input
//                 type="text"
//                 value={transactionId}
//                 onChange={(e) => setTransactionId(e.target.value)}
//                 className="w-full border p-2 rounded"
//                 required
//               />
//             </div>
//             <div>
//               <label className="block font-medium">Upload Payment Slip</label>
//               <input
//                 type="file"
//                 onChange={(e) => setPaymentImage(e.target.files[0])}
//                 className="w-full border p-2 rounded"
//                 // accept="image/*,application/pdf"
//               />
//             </div>
//             <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//               Submit Payment
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

// src/components/PaymentPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const [patient, setPatient] = useState({});
  const [cart, setCart] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [paymentImage, setPaymentImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const patientId = localStorage.getItem("patientId");
    if (!patientId) return;

    axios.get(`http://localhost:5000/api/patients/getPatientById/${patientId}`)
      .then((res) => setPatient(res.data))
      .catch((err) => console.error("Error fetching patient details:", err));

    axios.get(`http://localhost:5000/api/cart/${patientId}`, {
      headers: { "auth-token": localStorage.getItem("token") },
    })
      .then((res) => setCart(res.data))
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = localStorage.getItem("patientId");
    if (!cart) {
      alert("Cart is empty");
      return;
    }

    const orderData = new FormData();
    orderData.append("patient", patientId);
    orderData.append("cartItems", JSON.stringify(cart.items));
    orderData.append("totalAmount", cart.totalPrice);
    orderData.append("transactionId", transactionId);
    if (paymentImage) {
      orderData.append("paymentImage", paymentImage);
    }

    try {
      await axios.post("http://localhost:5000/api/orders/submit", orderData);
      
      // Clear cart after successful order submission
      await axios.delete(`http://localhost:5000/api/cart/clear/${patientId}`, {
        headers: { "auth-token": localStorage.getItem("token") },
      }); 
      
      alert("Order submitted successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Failed to submit order");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Payment Details</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="mb-4 border p-4 rounded">
            <h3 className="font-bold">Patient Details:</h3>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
            <p><strong>Email:</strong> {patient.email || "N/A"}</p>
          </div>
          <div className="mb-4 border p-4 rounded">
            <h3 className="font-bold">Cart Items:</h3>
            {cart && cart.items && cart.items.length > 0 ? (
              cart.items.map((item, index) => (
                <div key={index} className="border-b py-2">
                  {item.test ? (
                    <p>{item.test.name} (₹ {item.test.testOfferRate}) x {item.quantity}</p>
                  ) : item.program ? (
                    <p>{item.program.name} (₹ {item.program.price})</p>
                  ) : null}
                </div>
              ))
            ) : (
              <p>No items in cart.</p>
            )}
          </div>
          <div className="mb-4 border p-4 rounded">
            <h3 className="font-bold">Total Amount: ₹ {cart ? cart.totalPrice : 0}</h3>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Payment Information</h2>
          <div className="mb-6 text-center">
            <img src="/qr-code.jpeg" alt="QR Code" className="w-48 h-72 mx-auto" />
            <div className="mt-4">
              <p className="font-bold">Bank Details:</p>
              <p>Account Name: SRV PathLabs Pvt Ltd</p>
              <p>Account No: 10143770879</p>
              <p>IFSC: IDFB0020148</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Transaction ID</label>
              <input
                type="text"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Upload Payment Slip</label>
              <input
                type="file"
                onChange={(e) => setPaymentImage(e.target.files[0])}
                className="w-full border p-2 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Submit Payment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
