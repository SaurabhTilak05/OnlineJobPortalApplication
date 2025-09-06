import axios from "axios";

const API_URL = "http://localhost:8080/interviews";

class InterviewService {
  // Schedule a new interview
  scheduleInterview(data) {
    // Ensure all IDs are numbers, not undefined
    const payload = {
      job_id: Number(data.job_id),
      seeker_id: Number(data.seeker_id),
      hr_id: Number(data.hr_id),
      interview_mode: data.interview_mode,
      interview_date: data.interview_date,
      interview_time: data.interview_time,
      interview_link: data.interview_link || null,
      location: data.location || null,
      status: data.status || "Scheduled",
      remarks: data.remarks || null,
    };

    console.log("Interview payload:", payload); // Debug: check payload before sending
    return axios.post(`http://localhost:8080/interviews/schedule`, payload);
  }

  getInterviews() {
    return axios.get(API_URL);
  }

  getInterviewBySeeker(seekerId) {
    return axios.get(`${API_URL}/seeker/${seekerId}`);
  }

  getInterviewByJob(jobId) {
    return axios.get(`${API_URL}/job/${jobId}`);
  }

  getInterviewByHR(hrId) {
    return axios.get(`${API_URL}/hr/${hrId}`);
  }
}

export default new InterviewService();
