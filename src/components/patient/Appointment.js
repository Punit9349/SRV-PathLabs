import { useState } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    prescription: null,
  });

  const host = "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, prescription: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("city", formData.city);
    if (formData.prescription) {
      data.append("prescription", formData.prescription);
    }

    try {
         await axios.post(`${host}/api/appointment/`, data, 
          //{
      //   headers: { "Content-Type": "multipart/form-data" },
      // }
       );
      alert("Your details have been submitted successfully! Someone from team will soon contact with you");
      setFormData({ name: "", email: "", phone: "", city: "", prescription: null });
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Failed to submit appointment.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Make an Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow-md rounded">
        <div>
          <label className="block text-sm font-semibold">Patient Name*</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email (Optional)</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Phone Number*</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">City*</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label className="block text-sm font-semibold">Attach Prescription (Max: 2MB)</label>
          <input type="file" onChange={handleFileChange} className="w-full border p-2 rounded" />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
