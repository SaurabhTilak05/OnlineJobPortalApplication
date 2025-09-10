// src/components/ScheduleInterview.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import interviewServ from "../service/interviewserv.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ScheduleInterview() {
  const { seekerId, jobId } = useParams();
  const navigate = useNavigate();
  const hrId = localStorage.getItem("hrId");

  const [form, setForm] = useState({
    interview_mode: "Online",
    interview_date: "",
    interview_time: "",
    interview_link: "",
    location: "",
    remarks: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seekerId || !jobId || !hrId) {
      setMsg("Missing IDs for interview scheduling!");
      toast.error("❌ Missing IDs for interview scheduling!");
      return;
    }

    const payload = {
      job_id: Number(jobId),
      seeker_id: Number(seekerId),
      hr_id: Number(hrId),
      ...form,
      status: "Scheduled",
    };

    try {
      await interviewServ.scheduleInterview(payload);
      toast.success("✅ Interview scheduled successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Schedule interview error:", err.response || err.message);
      const errorMsg =
        err.response?.data?.error || "Failed to schedule interview";
      setMsg(errorMsg);
      toast.error(`❌ ${errorMsg}`);
    }
  };

  // Utility to display IST formatted date & time preview
  const formatIST = (date, time) => {
    if (!date || !time) return "";
    const istDate = new Date(`${date}T${time}`);
    return istDate.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="container py-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">📅 Schedule Interview</h5>
        </div>
        <div className="card-body">
          {msg && <div className="alert alert-danger">{msg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Mode</label>
              <select
                name="interview_mode"
                value={form.interview_mode}
                onChange={handleChange}
                className="form-select"
              >
                <option>Online</option>
                <option>Offline</option>
                <option>Telephonic</option>
              </select>
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="interview_date"
                  value={form.interview_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  name="interview_time"
                  value={form.interview_time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {form.interview_mode === "Online" ||
            form.interview_mode === "Telephonic" ? (
              <div className="mb-3 mt-3">
                <label className="form-label">Meeting Link / Number</label>
                <input
                  type="text"
                  name="interview_link"
                  value={form.interview_link}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Google Meet / Zoom link / Phone number"
                />
              </div>
            ) : (
              <div className="mb-3 mt-3">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Office Address"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Remarks</label>
              <textarea
                name="remarks"
                value={form.remarks}
                onChange={handleChange}
                className="form-control"
                rows="3"
                placeholder="Any additional instructions..."
              />
            </div>

            {form.interview_date && form.interview_time && (
              <div className="alert alert-info">
                Scheduled IST Preview:{" "}
                <strong>{formatIST(form.interview_date, form.interview_time)}</strong>
              </div>
            )}

            <div className="d-flex flex-wrap gap-2">
              <button type="submit" className="btn btn-success flex-grow-1">
                ✅ Schedule
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary flex-grow-1"
              >
                ⬅ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
