import React, { useState } from "react";
import { BrowserRouter,Router,NavLink } from "react-router-dom";
export default function AddHR() {
  const [formData, setFormData] = useState({
    hr_name: "",
    company_name: "",
    email: "",
    password: "",
    phone: ""
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/hr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("HR Added Successfully ✅");
        setFormData({ hr_name: "", company_name: "", email: "", password: "", phone: "" });
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.message);
      }
    } catch (err) {
      alert("Failed to connect to server ❌");
      console.error(err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Add HR</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="hr_name"
            placeholder="Enter HR Name"
            className="form-control mb-3"
            value={formData.hr_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="company_name"
            placeholder="Enter Company Name"
            className="form-control mb-3"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="form-control mb-3"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-primary w-100">
            Add HR
          </button>
        </form>
      </div>
    </div>
  );
}
