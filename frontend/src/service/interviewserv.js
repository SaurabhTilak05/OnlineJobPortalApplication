import axios from "axios";

const API_URL = "http://localhost:8080/interviews";
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

class InterviewService {
  scheduleInterview(data) {
    // Updated 2026-03-13: the backend now derives hr_id from the authenticated token.
    const payload = {
      job_id: Number(data.job_id),
      seeker_id: Number(data.seeker_id),
      interview_mode: data.interview_mode,
      interview_date: data.interview_date,
      interview_time: data.interview_time,
      interview_link: data.interview_link || null,
      location: data.location || null,
      status: data.status || "scheduled",
      remarks: data.remarks || null,
    };

    return axios.post(`${API_URL}/schedule`, payload, {
      headers: getAuthHeaders(),
    });
  }

  getInterviews() {
    return axios.get(API_URL, {
      headers: getAuthHeaders(),
    });
  }

  getInterviewBySeeker(seekerId) {
    return axios.get(`${API_URL}/seeker/${seekerId}`, {
      headers: getAuthHeaders(),
    });
  }

  getInterviewByJob(jobId) {
    return axios.get(`${API_URL}/job/${jobId}`, {
      headers: getAuthHeaders(),
    });
  }

  getInterviewByHR(hrId) {
    return axios.get(`${API_URL}/hr/${hrId}`, {
      headers: getAuthHeaders(),
    });
  }

  updateInterviewStatus(interviewId, status, remarks = null) {
    return axios.put(
      `${API_URL}/${interviewId}/status`,
      { status, remarks },
      {
        headers: getAuthHeaders(),
      }
    );
  }
}

export default new InterviewService();
