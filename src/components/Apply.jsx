// ./components/Apply.js
import React, { useState } from "react";
import axios from "axios";

const Apply = ({ user }) => {
  const [form, setForm] = useState({
    candidateName: user?.name || "",
    scholarNo: user?.scholarNo || "",
    manifesto: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/apply", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Application submission failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800">
      <h2 className="text-2xl font-bold text-center mb-6">Apply for CR Election</h2>
      {message && <p className="mb-4 text-center text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="">
          <label className="block  text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            
            name="candidateName"
            value={form.candidateName}
            disabled
            className="w-full px-3 py-2 border bg-white rounded bg-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Scholar Number</label>
          <input
            type="text"
            name="scholarNo"
            value={form.scholarNo}
            disabled
            className="w-full px-3 py-2 border bg-white rounded bg-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1  ">Manifesto</label>
          <textarea
            name="manifesto"
            value={form.manifesto}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 bg-white   border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-300">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default Apply;
