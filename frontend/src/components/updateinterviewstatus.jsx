import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import interviewServ from "../service/interviewserv.js";

export default function UpdateInterviewStatus() {
  const { id } = useParams();
  const { state: interview } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState(interview?.status || "scheduled");
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    const job = interview?.job_title || "[Job Title]";
    let defaultRemark = "";

    switch (status) {
      case "scheduled":
        defaultRemark = `Your interview for the position of ${job} has been scheduled. Please attend on the specified date and time.`;
        break;
      case "completed":
        defaultRemark = `Your interview for the position of ${job} has been completed successfully.`;
        break;
      case "selected":
        defaultRemark = `Congratulations! You have been selected for the position of ${job}.`;
        break;
      case "rejected":
        defaultRemark = `We regret to inform you that you have not been selected for the position of ${job}.`;
        break;
      case "cancelled":
        defaultRemark = `Your interview for the position of ${job} has been cancelled.`;
        break;
      default:
        defaultRemark = "";
        break;
    }

    setRemarks(interview?.remarks || defaultRemark);
  }, [interview, status]);

  const handleUpdate = async () => {
    try {
      await interviewServ.updateInterviewStatus(id, status, remarks);
      toast.success("Interview and application updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => navigate("/hrdashboard/view-schedule"), 3000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update interview", {
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="update-interview-container d-flex justify-content-center mt-4">
      <ToastContainer />
      <div
        className="update-card shadow-lg rounded-4 p-4 w-100"
        style={{ maxWidth: "600px" }}
      >
        <h4 className="card-title mb-4 text-primary">Update Interview Status</h4>

        <div className="mb-3">
          <p>
            <strong>Job:</strong> {interview?.job_title || "N/A"} <br />
            <strong>Seeker:</strong> {interview?.seeker_name || "N/A"}
          </p>
        </div>

        <div className="mb-3">
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

        <div className="mb-4">
          <label className="form-label fw-bold">Remarks (Email Body)</label>
          <textarea
            className="form-control"
            rows="3"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>

        <div className="d-flex gap-2 flex-wrap">
          <button className="btn btn-success" onClick={handleUpdate}>
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
