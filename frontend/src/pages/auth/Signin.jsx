import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // 👈 import navigation hook

const Signin = () => {
  const navigate = useNavigate(); // 👈 setup navigate hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ React Query mutation for signin
  const mutation = useMutation({
    mutationFn: async (user) => {
      const res = await axios.post("http://localhost:3000/api/signin", user);
      return res.data;
    },
    onSuccess: (data) => {
      console.log("Signin Success:", data);
      alert("Login successful 🎉");

      // 👉 redirect to test page after success
      navigate("/test-edit");
    },
    onError: (error) => {
      console.error("Signin Error:", error);
      alert("Login failed ❌");
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
    <a
      href="/signup"
      className="text-gray-500 font-semibold hover:text-purple-600 transition"
    >
      REGISTER
    </a>
    <span className="text-gray-400">|</span>
    <span className="text-purple-900 font-bold border-b-2 border-purple-900 pb-1">
      LOGIN
    </span>
  </div>

  {/* Sign In Form */}
  <form onSubmit={handleSubmit} className="space-y-6">
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
      {mutation.isLoading ? "Signing in..." : "Submit"}
    </button>
  </form>
</div>

  );
};

export default Signin;
