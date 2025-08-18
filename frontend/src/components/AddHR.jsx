import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HRRegistration() {
  const [formData, setFormData] = useState({
    hr_name: "",
    company_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Just log for now; connect to backend API later
    console.log("HR Form submitted:", formData);

    // Example POST to backend:
    /*
    fetch("/api/hr", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Success:", data))
      .catch((err) => console.error("Error:", err));
    */
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4"> Add HR </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">HR Name</label>
            <input
              type="text"
              name="hr_name"
              className="form-control"
              required
              placeholder="Enter HR name"
              value={formData.hr_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Company Name</label>
            <input
              type="text"
              name="company_name"
              className="form-control"
              required
              placeholder="Enter company name"
              value={formData.company_name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              required
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              required
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register HR
          </button>
        </form>
      </div>
    </div>
  );
}
