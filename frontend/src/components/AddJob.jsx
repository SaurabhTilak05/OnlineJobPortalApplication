import React, { useState } from "react";
import AddJObService from "../service/addjobserv.js";

export default function AddJob() {
  const [formData, setFormData] = useState({
    hr_id: "",
    title: "",
    company: "",
    opening: "",
    experience_required: "",
    location: "",
    package: "",
    skills_required: "",
    description: "",
    deadline: "",
  });

  const [msg, setMsg] = useState("");

  const addingjob = () => {
    let promise = AddJObService.addJob(formData);
    promise
      .then((result) => {
        setMsg(result.data.message);
        setFormData({
          hr_id: "",
          title: "",
          company: "",
          opening: "",
          experience_required: "",
          location: "",
          package: "",
          skills_required: "",
          description: "",
          deadline: "",
        });
      })
      .catch((err) => {
        setMsg("❌ Failed to save job. Try again!");
        console.error(err);
      });
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 rounded-4 p-4">
        {/* Title */}
        <h2 className="text-center text-primary fw-bold mb-4">
          📝 Post a New Job
        </h2>

        {/* Success/Error Message */}
        {msg && (
          <div className="alert alert-info text-center fw-semibold">{msg}</div>
        )}

        {/* Form Layout */}
        <div className="row g-3">
          {/* HR ID */}
          <div className="col-md-6">
            <label className="form-label">HR ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.hr_id}
              onChange={(e) =>
                setFormData({ ...formData, hr_id: e.target.value })
              }
              placeholder="Enter HR ID"
            />
          </div>

          {/* Job Title */}
          <div className="col-md-6">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-control"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter Job Title"
            />
          </div>

          {/* Company */}
          <div className="col-md-6">
            <label className="form-label">Company</label>
            <input
              type="text"
              className="form-control"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              placeholder="Enter Company Name"
            />
          </div>

          {/* Openings */}
          <div className="col-md-6">
            <label className="form-label">Openings</label>
            <input
              type="number"
              className="form-control"
              value={formData.opening}
              onChange={(e) =>
                setFormData({ ...formData, opening: e.target.value })
              }
              placeholder="Number of Openings"
            />
          </div>

          {/* Experience */}
          <div className="col-md-6">
            <label className="form-label">Experience Required</label>
            <input
              type="text"
              className="form-control"
              value={formData.experience_required}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  experience_required: e.target.value,
                })
              }
              placeholder="e.g. 2+ Years"
            />
          </div>

          {/* Location */}
          <div className="col-md-6">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-control"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Job Location"
            />
          </div>

          {/* Package */}
          <div className="col-md-6">
            <label className="form-label">Package (CTC)</label>
            <input
              type="text"
              className="form-control"
              value={formData.package}
              onChange={(e) =>
                setFormData({ ...formData, package: e.target.value })
              }
              placeholder="e.g. 6 LPA"
            />
          </div>

          {/* Skills */}
          <div className="col-md-6">
            <label className="form-label">Skills Required</label>
            <input
              type="text"
              className="form-control"
              value={formData.skills_required}
              onChange={(e) =>
                setFormData({ ...formData, skills_required: e.target.value })
              }
              placeholder="Skills (comma separated)"
            />
          </div>

         
          <div className="col-12">
            <label className="form-label">Job Description</label>
            <textarea
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter detailed job description"
            ></textarea>
          </div>

         
          <div className="col-md-6">
            <label className="form-label">Application Deadline</label>
            <input
              type="date"
              className="form-control"
              value={formData.deadline}
              onChange={(e) =>
                setFormData({ ...formData, deadline: e.target.value })
              }
            />
          </div>
        </div>

      
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-success px-5 py-2 fw-semibold shadow-sm"
            onClick={addingjob}
          >
            🚀 Post Job
          </button>
        </div>
      </div>
    </div>
  );
}
