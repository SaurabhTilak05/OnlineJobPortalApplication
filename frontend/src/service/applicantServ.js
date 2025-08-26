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
  
}

export default new ApplicantService();
