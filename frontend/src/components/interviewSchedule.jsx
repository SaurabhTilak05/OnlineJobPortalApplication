import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import interviewServ from "../service/interviewserv.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ScheduleInterview() {
  const { seekerId, jobId } = useParams();
  const navigate = useNavigate();
  const hrId = localStorage.getItem("hrId");
  console.log(hrId);
  console.log(jobId);

  const [form, setForm] = useState({
    interview_mode: "Online",
    interview_date: "",
    interview_time: "",
    interview_link: "",
    location: "",
    remarks: "",
  });
  const [msg, setMsg] = useState("");

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
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

    console.log("Scheduling interview payload:", payload);

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

            <div className="mb-3">
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

            <div className="mb-3">
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

            {form.interview_mode === "Online" ||
            form.interview_mode === "Telephonic" ? (
              <div className="mb-3">
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
              <div className="mb-3">
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

            <button type="submit" className="btn btn-success">
              ✅ Schedule
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary ms-2"
            >
              ⬅ Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
