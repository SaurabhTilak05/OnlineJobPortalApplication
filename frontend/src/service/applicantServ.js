import axios from "axios";

class ApplicantService {
  getApplicants() {
    return axios.get("http://localhost:8080/view-applicants").then((res) => res.data);
  }
}

export default new ApplicantService();
