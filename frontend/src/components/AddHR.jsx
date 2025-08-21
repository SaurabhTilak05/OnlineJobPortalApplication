import React, { useState } from "react";

import AddJObService  from "../service/addjobserv";
export default function AddHR() {
  const [formData, setFormData] = useState({
    hr_name: "",
    company_name: "",
    email: "",
    phone: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
 // handle form submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Call backend via service
    await AddJObService.AddHR(formData);

    // Notify success & email sent
    alert(`HR Added Successfully ✅\nEmail sent to ${formData.email}`);

    // Reset form
    setFormData({
      hr_name: "",
      company_name: "",
      email: "",
      phone: "",
    });
  } catch (err) {
    console.error("Error adding HR:", err);
    alert("Failed to add HR ❌");
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
            type="text"
            name="phone"
            placeholder="Enter Phone Number"
            className="form-control mb-3"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            Add HR
          </button>
        </form>
      </div>
    </div>
  );
}
