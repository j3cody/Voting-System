// ./components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [form, setForm] = useState({
    scholarNo: "",
    name: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://voteapi.jatinpatidar.me/api/login", form);
      setUser({ ...res.data.user });

      localStorage.setItem("user", res.data.user);
      console.log(res);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8 text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Scholar Number</label>
          <input
            type="text"
            name="scholarNo"
            value={form.scholarNo}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <span className="text-green-600 font-medium cursor-pointer" onClick={() => navigate("/signup")}>
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
