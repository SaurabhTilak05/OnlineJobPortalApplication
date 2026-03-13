import axios from "axios";

class ApplicantService {
 getApplicants() {
    const token = localStorage.getItem("token"); // assuming you stored it
    return axios
      .get("http://localhost:8080/view-applicants", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  }
  
  getApplicantsByJob(job_id)
  {
     return axios.get(`http://localhost:8080/getapplicant/${job_id}/applicants`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
     });
  }
   getApplicantProfile(seekerId) {
    return axios.get(`http://localhost:8080/applicantprofile/${seekerId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  }
}

export default new ApplicantService();
