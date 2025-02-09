import React, { useState } from 'react';
import axios from 'axios';

const ReportManagement = () => {
  const [patientId, setPatientId] = useState('');
  const [testName, setTestName] = useState('');
  const [file, setFile] = useState(null);
  const [remark, setRemark] = useState('');
  const [success, setSuccess] = useState('');
  const token=localStorage.getItem('token_admin');
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !patientId || !testName) {
      alert('Please provide all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('report', file);
    formData.append('remark', remark);
    formData.append('testName', testName);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reports/upload-report/${patientId}`,
        formData,{
          headers: {
            "auth-token": token,
          }, 
        }
      );
      setSuccess('Report uploaded successfully!');
      setFile(null);
      setRemark('');
      setTestName('');
      setPatientId('');
    } catch (error) {
      console.error('Error uploading report:', error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-semibold mb-4">Upload Report</h2>
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label className="block text-sm font-medium">Patient ID</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Test Name</label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Select File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="border rounded w-full p-2"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Remarks</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="border rounded w-full p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
      {success && <p className="text-green-500 mt-3">{success}</p>}
    </div>
  );
};

export default ReportManagement;
