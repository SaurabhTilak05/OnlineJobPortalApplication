
import axios from "axios";
class UserJobservice {
        getAllJobsuser() {
        const token = localStorage.getItem("token");
        return axios.get("http://localhost:8080/alljob", {
            headers: { Authorization: `Bearer ${token}` },
        });
        }

        // Apply for a Job
applyJob( job_id, seeker_id) {
  const token = localStorage.getItem("token");
  return axios.post(
    "http://localhost:8080/applyedJob",
    {  job_id, seeker_id },   // ✅ send camelCase keys for Node.js
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
}
export default new UserJobservice();