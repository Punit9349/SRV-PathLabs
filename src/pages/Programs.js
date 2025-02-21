import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const SpecialPrograms = () => {
  const [programs, setPrograms] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(null);
  const host = API_BASE_URL; // Update if needed
  const patientId = localStorage.getItem("patientId"); 
  const token=localStorage.getItem("token");


  useEffect(() => {
    const fetchPrograms = async () => {
      const { data } = await axios.get(`${host}/api/programs/special-programs`);
      setPrograms(data);
    };

    const fetchCart = async () => {
      try {
        const { data } = await axios.get(`${host}/api/cart/${patientId}`);
        setCart(data?.items || []);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchPrograms();
    fetchCart();
  }, []);

  const addToCart = async (program) => {
    if (loading) return;
    setLoading(program._id);

    try {
      await axios.post(`${host}/api/cart/add`, {
        patientId,
        programId: program._id,
        price: program.price,
      }
      , {
        headers: { "auth-token": token }
      });

      setCart([...cart, { program }]); // Update UI instantly
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setLoading(null);
    }
  };

  const removeFromCart = async (programId) => {
    if (loading) return;
    setLoading(programId);

    try {
      await axios.put(`${host}/api/cart/remove`, {
        patientId,
        programId,
        price: programs.find((p) => p._id === programId)?.price || 0,
      }, {
        headers: { "auth-token": token },
      });

      setCart(cart.filter((item) => item.program?._id !== programId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Special Programs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => {
          const inCart = cart.some((item) => item.program?._id === program._id);

          return (
            <div
              key={program._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
            >
              {program.image && (
                <img
                  src={`${host}/${program.image}`}
                  alt={program.name}
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-4 space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {program.name}
                </h2>
                <p className="text-gray-600 text-sm">{program.description}</p>

                <div className="text-lg font-semibold text-green-600">
                  ₹{program.price}
                  {program.priceBeforeDiscount && (
                    <span className="text-sm text-gray-500 line-through ml-2">
                      ₹{program.priceBeforeDiscount}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-500">
                  Valid from {new Date(program.startDate).toLocaleDateString()} to{" "}
                  {new Date(program.endDate).toLocaleDateString()}
                </p>

                <div>
                  <h4 className="font-medium text-gray-700">Included Tests:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {program.includedTests.map((test) => (
                      <li key={test._id}>{test.name}</li>
                    ))}
                  </ul>
                </div>

                {program.tags && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {program.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {program.isFeatured && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded inline-block">
                    Featured
                  </span>
                )}

                {/* Add/Remove from Cart Button */}
                <button
                  onClick={() =>
                    inCart ? removeFromCart(program._id) : addToCart(program)
                  }
                  className={`w-full py-2 rounded-md font-bold mt-4 transition ${
                    inCart
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  } ${loading === program._id ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={loading === program._id}
                >
                  {loading === program._id
                    ? "Processing..."
                    : inCart
                    ? "Remove from Cart"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialPrograms;
