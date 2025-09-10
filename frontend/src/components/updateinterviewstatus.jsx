import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import interviewServ from "../service/interviewserv.js";
import "./UpdateInterviewStatus.css"; // Custom CSS

export default function UpdateInterviewStatus() {
  const { id } = useParams();
  const { state: interview } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(interview?.status || "scheduled");
  const [remarks, setRemarks] = useState(interview?.remarks || "");

  const handleUpdate = async () => {
    try {
      await interviewServ.updateInterviewStatus(id, status, remarks);
      toast.success("Interview & application updated successfully ✅", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setTimeout(() => navigate("/hrdashboard/view-schedule"), 3000); // Navigate after toast
    } catch (err) {
      console.error("Error updating interview:", err);
      toast.error("Failed to update interview ❌", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="update-interview-container">
      <ToastContainer /> {/* Toast container */}
      <div className="update-card shadow-lg rounded-4 p-4">
        <h4 className="card-title mb-4 text-primary">Update Interview Status</h4>

        <div className="mb-3 info-group">
          <p>
            <strong>Job:</strong> {interview?.job_title || "N/A"} <br />
            <strong>Seeker:</strong> {interview?.seeker_name || "N/A"}
          </p>
        </div>

        <div className="mb-3 form-group">
          <label className="form-label fw-bold">Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="selected">Selected</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="mb-4 form-group">
          <label className="form-label fw-bold">Remarks</label>
          <textarea
            className="form-control"
            rows="4"
            placeholder="Add remarks here..."
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>

        <div className="button-group d-flex flex-wrap gap-2">
          <button className="btn btn-success btn-hover" onClick={handleUpdate}>
            ✅ Save Changes
          </button>
          <button
            className="btn btn-secondary btn-hover"
            onClick={() => navigate(-1)}
          >
            ⬅ Back
          </button>
        </div>
      </div>
    </div>
  );
}
