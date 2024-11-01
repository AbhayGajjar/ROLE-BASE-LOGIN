"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const FormExample = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/v1/create",
        formData
      );
      console.log(response.data);

      // Show success toast
      toast.success("User registered successfully!");

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        age: "",
        password: "",
      });

      router.push("/");
    } catch (error) {
      console.error(error);

      // Show error toast
      toast.error("Failed to register user. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 bg-white shadow-md rounded-md max-w-md mx-auto mt-[15vh]"
    >
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className={cn(
            "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          )}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="email" className="mb-1 text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={cn(
            "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          )}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="age" className="mb-1 text-sm font-medium">
          Age
        </label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
          className={cn(
            "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          )}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="password" className="mb-1 text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className={cn(
            "border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          )}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default FormExample;
