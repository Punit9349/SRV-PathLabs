import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import Lottie from "lottie-react";
// import medicalAnimation from "../assets/medical-animation.json"; // Add your animation file

const AdminAuth = () => {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
            if (isLogin) {
              // Login API call
              const response = await axios.post(`http://localhost:5000/api/patients/login`, {
                phone: formData.phone,
                password: formData.password,
              });
              
              if(response.data.success){
                localStorage.setItem('token', response.data.authToken);
                localStorage.setItem('patientId', response.data.id);
              }
      
              setMessage(response.data.message || "Login successful!");
              navigate("/test-menu");
            } else {
              // Signup API call
              const response = await axios.post(`http://localhost:5000/api/patients/register`, formData);
              setMessage(response.data.message || "Signup successful!");
              if(response.data.success){
                localStorage.setItem('token', response.data.authToken);
                localStorage.setItem('patientId', response.data.id);
              }
              navigate("/test-menu");
            }
          } catch (error) {
            setMessage(
              error.response?.data?.message || "Something went wrong. Please try again."
            );
          }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden max-w-4xl w-full"
      >
        {/* Animation Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-500 to-green-500 p-8 hidden md:block">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          >
            {/* <Lottie 
              animationData={medicalAnimation} 
              className="h-64" 
            /> */}
          </motion.div>
          <h3 className="text-white text-xl font-bold text-center mt-4">
            Welcome to HealthLab Pro
          </h3>
          <p className="text-white/90 text-center mt-2">
            Your Trusted Diagnostic Partner
          </p>
        </div>

        {/* Form Section */}
        <div className="md:w-1/2 p-8 w-full">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
              {isLogin ? "Welcome Back!" : "Create Account"}
            </h2>

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-6 p-3 rounded-lg text-sm ${
                  message.includes("successful") 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-1"
                >
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </motion.div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="+91 9876543210"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors shadow-md"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "New to HealthLab?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  {isLogin ? "Create account" : "Sign in here"}
                </button>
              </p>
            </div>

            {!isLogin && (
              <p className="mt-4 text-xs text-gray-500 text-center">
                By creating an account, you agree to our <br />
                <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
              </p>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminAuth;


// import React, { useState } from "react";
// import axios from "axios";
// import {useNavigate} from 'react-router-dom'

// const AdminAuth = () => {
//   let navigate=useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     try {
//       if (isLogin) {
//         // Login API call
//         const response = await axios.post(`http://localhost:5000/api/patients/login`, {
//           phone: formData.phone,
//           password: formData.password,
//         });
        
//         if(response.data.success){
//           localStorage.setItem('token', response.data.authToken);
//           localStorage.setItem('patientId', response.data.id);
//         }

//         setMessage(response.data.message || "Login successful!");
//         navigate("/test-menu");
//       } else {
//         // Signup API call
//         const response = await axios.post(`http://localhost:5000/api/patients/register`, formData);
//         setMessage(response.data.message || "Signup successful!");
//         if(response.data.success){
//           localStorage.setItem('token', response.data.authToken);
//           localStorage.setItem('patientId', response.data.id);
//         }
//         navigate("/test-menu");
//       }
//     } catch (error) {
//       setMessage(
//         error.response?.data?.message || "Something went wrong. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-auto bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">
//           {isLogin ? "Patient Login" : "Patient Signup"}
//         </h2>
//         {message && (
//           <div
//             className={`mb-4 p-2 text-center text-sm text-white rounded ${
//               message.includes("successful") ? "bg-green-500" : "bg-red-500"
//             }`}
//           >
//             {message}
//           </div>
//         )}
//         <form onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div className="mb-4">
//               <label
//                 htmlFor="name"
//                 className="block text-gray-700 font-semibold mb-2"
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required={!isLogin}
//               />
//             </div>
//           )}
//           <div className="mb-4">
//             <label
//               htmlFor="phone"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="password"
//               className="block text-gray-700 font-semibold mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             {isLogin ? "Login" : "Signup"}
//           </button>
//         </form>
//         <p className="text-center text-sm text-gray-600 mt-4">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="text-blue-500 font-semibold focus:outline-none"
//           >
//             {isLogin ? "Signup here" : "Login here"}
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AdminAuth;
