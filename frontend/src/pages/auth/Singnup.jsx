import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

   const navigate = useNavigate();

  // ✅ React Query mutation
  const mutation = useMutation({
    mutationFn: async (newUser) => {
      const res = await axios.post("http://localhost:3000/api/signup", newUser);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Signup Success:", data);
      alert("Signup successful ");
        // 👉 redirect to login page
      navigate("/signin");
    },
    onError: (error) => {
      console.error("Signup Error:", error);
      alert("Signup failed ");
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
   <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
  {/* Tabs */}
  <div className="flex justify-center mb-8 space-x-6">
    <span className="text-purple-900 font-bold border-b-2 border-purple-900 pb-1">
      REGISTER
    </span>
    <span className="text-gray-400">|</span>
    <a
      href="/signin"
      className="text-gray-500 font-semibold hover:text-purple-600 transition"
    >
      LOGIN
    </a>
  </div>

  {/* Sign Up Form */}
  <form onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full border-b border-gray-300 focus:border-purple-900 outline-none py-2 placeholder-gray-400"
      />
    </div>

    {/* Email */}
    <div>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border-b border-gray-300 focus:border-purple-900 outline-none py-2 placeholder-gray-400"
      />
    </div>

    {/* Password */}
    <div>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full border-b border-gray-300 focus:border-purple-900 outline-none py-2 placeholder-gray-400"
      />
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      disabled={mutation.isLoading}
      className="w-full bg-gray-200 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-300 transition disabled:opacity-50"
    >
      {mutation.isLoading ? "Signing up..." : "Submit"}
    </button>
  </form>
</div>

  );
};

export default Signup;
