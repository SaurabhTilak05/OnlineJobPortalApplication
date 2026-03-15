import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaVideo,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import interviewServ from "../service/interviewserv.js";

export default function ScheduleInterview() {
  const { seekerId, jobId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    interview_mode: "Online",
    interview_date: "",
    interview_time: "",
    interview_link: "",
    location: "",
    remarks: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!seekerId || !jobId) {
      setMsg("Missing IDs for interview scheduling.");
      toast.error("Missing IDs for interview scheduling.");
      return;
    }

    const payload = {
      job_id: Number(jobId),
      seeker_id: Number(seekerId),
      ...form,
      status: "scheduled",
    };

    try {
      await interviewServ.scheduleInterview(payload);
      toast.success("Interview scheduled successfully.");
      navigate(-1);
    } catch (err) {
      console.error("Schedule interview error:", err.response || err.message);
      const errorMsg = err.response?.data?.error || "Failed to schedule interview";
      setMsg(errorMsg);
      toast.error(errorMsg);
    }
  };

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

  const isRemoteMode =
    form.interview_mode === "Online" || form.interview_mode === "Telephonic";

  return (
    <div className="hr-page-shell">
      <section className="hr-page-header">
        <div>
          <span className="hr-section-kicker">Interview Workflow</span>
          <h1 className="hr-page-title">Schedule interview</h1>
          <p className="hr-page-subtitle">
            Set the mode, time, and candidate instructions clearly so the next step feels smooth and professional.
          </p>
        </div>
        <button className="btn hr-outline-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft className="me-2" />
          Back
        </button>
      </section>

      <section className="hr-form-layout">
        <div className="hr-surface-card hr-form-card">
          {msg && <div className="alert alert-danger">{msg}</div>}

          <form onSubmit={handleSubmit}>
            <div className="hr-form-grid">
              <div className="hr-form-group">
                <label className="form-label">
                  {form.interview_mode === "Offline" ? <FaMapMarkerAlt /> : <FaVideo />}
                  Interview Mode
                </label>
                <select
                  name="interview_mode"
                  value={form.interview_mode}
                  onChange={handleChange}
                  className="form-select hr-form-select"
                >
                  <option>Online</option>
                  <option>Offline</option>
                  <option>Telephonic</option>
                </select>
              </div>

              <div className="hr-form-group">
                <label className="form-label">
                  <FaCalendarAlt />
                  Date
                </label>
                <input
                  type="date"
                  name="interview_date"
                  value={form.interview_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="hr-form-group">
                <label className="form-label">
                  <FaClock />
                  Time
                </label>
                <input
                  type="time"
                  name="interview_time"
                  value={form.interview_time}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              {isRemoteMode ? (
                <div className="hr-form-group hr-form-group-full">
                  <label className="form-label">
                    {form.interview_mode === "Telephonic" ? <FaPhoneAlt /> : <FaVideo />}
                    {form.interview_mode === "Telephonic"
                      ? "Phone Number / Contact"
                      : "Meeting Link"}
                  </label>
                  <input
                    type="text"
                    name="interview_link"
                    value={form.interview_link}
                    onChange={handleChange}
                    className="form-control"
                    placeholder={
                      form.interview_mode === "Telephonic"
                        ? "Enter contact number"
                        : "Google Meet / Zoom link"
                    }
                  />
                </div>
              ) : (
                <div className="hr-form-group hr-form-group-full">
                  <label className="form-label">
                    <FaMapMarkerAlt />
                    Interview Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Office address"
                  />
                </div>
              )}

              <div className="hr-form-group hr-form-group-full">
                <label className="form-label">Remarks / Instructions</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Share any preparation notes or joining instructions."
                />
              </div>
            </div>

            <div className="hr-form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn hr-outline-btn">
                Cancel
              </button>
              <button type="submit" className="btn hr-hero-primary hr-submit-btn">
                Schedule Interview
              </button>
            </div>
          </form>
        </div>

        <aside className="hr-surface-card hr-side-note">
          <span className="hr-section-kicker">Preview</span>
          <h3>Interview summary</h3>
          <div className="hr-applicant-detail-list">
            <p><strong>Mode:</strong> {form.interview_mode}</p>
            <p><strong>Date:</strong> {form.interview_date || "Not selected"}</p>
            <p><strong>Time:</strong> {form.interview_time || "Not selected"}</p>
            <p>
              <strong>IST Preview:</strong>{" "}
              {form.interview_date && form.interview_time
                ? formatIST(form.interview_date, form.interview_time)
                : "Choose date and time"}
            </p>
            <p>
              <strong>{isRemoteMode ? "Link / Contact" : "Location"}:</strong>{" "}
              {isRemoteMode
                ? form.interview_link || "Not added"
                : form.location || "Not added"}
            </p>
          </div>
        </aside>
      </section>

      <ToastContainer position="top-center" autoClose={2000} theme="colored" />
    </div>
  );
}
