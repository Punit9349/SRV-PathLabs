// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/orders");
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const handleDelete = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
//       setOrders(orders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       alert("Failed to delete order");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300 shadow-md rounded">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Patient Name</th>
//               <th className="border p-2">Total Amount</th>
//               <th className="border p-2">Transaction ID</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border">
//                 <td className="p-2">{order.patient ? order.patient.name : "N/A"}</td>
//                 <td className="p-2">₹ {order.totalAmount}</td>
//                 <td className="p-2">{order.transactionId}</td>
//                 <td className="p-2">{order.status}</td>
//                 <td className="p-2">
//                   {order.paymentImage && (
//                     <a
//                       href={`http://localhost:5000/uploads/orders/${order.paymentImage}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline mr-2"
//                     >
//                       Download Payment Slip
//                     </a>
//                   )}
//                   <button
//                     onClick={() => handleDelete(order._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/orders");
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

//   const handleDelete = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
//       setOrders(orders.filter((order) => order._id !== orderId));
//     } catch (error) {
//       console.error("Error deleting order:", error);
//       alert("Failed to delete order");
//     }
//   };

//   const handleStatusChange = async (orderId, newStatus) => {
//     try {
//       await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
//       setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       alert("Failed to update order status");
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <table className="w-full border-collapse border border-gray-300 shadow-md rounded">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border p-2">Patient Name</th>
//               <th className="border p-2">Total Amount</th>
//               <th className="border p-2">Transaction ID</th>
//               <th className="border p-2">Status</th>
//               <th className="border p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order._id} className="border">
//                 <td className="p-2">{order.patient ? order.patient.name : "N/A"}</td>
//                 <td className="p-2">₹ {order.totalAmount}</td>
//                 <td className="p-2">{order.transactionId}</td>
//                 <td className="p-2">
//                   <select
//                     value={order.status}
//                     onChange={(e) => handleStatusChange(order._id, e.target.value)}
//                     className="border p-1 rounded"
//                   >
//                     <option value="Pending">Pending</option>
//                     <option value="Processing">Processing</option>
//                     <option value="Completed">Completed</option>
//                     <option value="Cancelled">Cancelled</option>
//                   </select>
//                 </td>
//                 <td className="p-2">
//                   {order.paymentImage && (
//                     <a
//                       href={`http://localhost:5000/uploads/orders/${order.paymentImage}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-blue-500 underline mr-2"
//                     >
//                       Download Payment Slip
//                     </a>
//                   )}
//                   <button
//                     onClick={() => handleDelete(order._id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminOrders;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/orders");
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId));
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status: newStatus });
      setOrders(orders.map(order => order._id === orderId ? { ...order, status: newStatus } : order));
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard - Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300 shadow-md rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Patient Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Transaction ID</th>
              <th className="border p-2">Order Items</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border">
                <td className="p-2">{order.patient ? order.patient.name : "N/A"}</td>
                <td className="p-2">{order.patient ? order.patient.phone : "N/A"}</td>
                <td className="p-2">₹ {order.totalAmount}</td>
                <td className="p-2">{order.transactionId}</td>
                <td className="p-2">
                  <ul>
                    {order.cartItems.map((item, index) => (
                      <li key={index}>{item.test ? item.test.name : item.program ? item.program.name : "Unknown Item"}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="p-2">
                  {order.paymentImage && (
                    <a
                      href={`http://localhost:5000/uploads/orders/${order.paymentImage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline mr-2"
                    >
                      Download Payment Slip
                    </a>
                  )}
                  <button
                    onClick={() => handleDelete(order._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
