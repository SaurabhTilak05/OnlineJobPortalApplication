import React, { useEffect, useState } from "react";
import interviewserv from "../service/interviewserv";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewScheduleForUser() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const seekerId = localStorage.getItem("seeker_id"); // logged in user id

  useEffect(() => {
    if (!seekerId) {
      setError("⚠️ Please login as a user first!");
      setLoading(false);
      return;
    }

    // 🔹 Fetch schedule for user
    interviewserv.getInterviewBySeeker(seekerId)
      .then((res) => {
        setSchedule(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err);
        setError("❌ Failed to fetch schedule");
        setLoading(false);
      });
  }, [seekerId]);

  if (loading) return <p className="text-center mt-5">⏳ Loading schedule...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-4">
      <h2 className="fw-bold text-primary text-center mb-4">📅 My Schedule</h2>

      {schedule.length === 0 ? (
        <p className="text-center">No schedule available</p>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark text-center">
              <tr>
                <th>Sr.No</th>
                <th>Job Title</th>
                <th>Company</th>
                <th>Schedule Date</th>
                <th>Time</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index}>
                    <td>{index+1}</td>
                  <td>{item.job_title}</td>
                  <td>{item.company}</td>
                <td>
                {new Date(`${item.interview_date}`).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata", year: "numeric", month: "short", day: "numeric" })}
                </td>
                  <td>{item.interview_time}</td>
                  <td>{item.interview_mode || "Not Specified"}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "Confirmed"
                          ? "bg-success"
                          : item.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-secondary"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
}
