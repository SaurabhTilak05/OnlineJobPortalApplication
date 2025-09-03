import axios from "axios";

class AdminAuthService {
  // ========================
  // 🔹 AUTH & LOGIN
  // ========================
  login(credentials) {
    return axios
      .post("http://localhost:8080/adminLogin", credentials)
      .then((res) => res.data); // {message, token, role, username}
  }

  AddHR(hrdata) {
    return axios.post("http://localhost:8080/AddHr", hrdata);
  }

  hrLogin(data) {
    return axios.post("http://localhost:8080/hr/login", data).then((res) => {
      // Save HR info in localStorage for later
      localStorage.setItem("hrId", res.data.hr_id);
      localStorage.setItem("role", "hr");
      return res.data;
    });
  }

  UserLogin(udata) {
    return axios
      .post("http://localhost:8080/loginseeker", udata)
      .then((res) => {
        console.log("Full response:", res);

        localStorage.setItem("seeker_id", res.data.seeker_id);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", "user");

        return res.data;
      })
      .catch((err) => {
        console.error(
          "Axios error:",
          err.response ? err.response.data : err.message
        );
        throw err;
      });
  }

  // ========================
  // 🔹 PROFILE
  // ========================
  getProfile() {
    const token = this.getToken();
    return axios
      .get("http://localhost:8080/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(
          "Error fetching profile:",
          err.response ? err.response.data : err.message
        );
        throw err;
      });
  }

  updateProfile(profileData) {
    const token = this.getToken();
    return axios
      .put("http://localhost:8080/update", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error(
          "Error updating profile:",
          err.response ? err.response.data : err.message
        );
        throw err;
      });
  }

  // ========================
  // 🔹 UTILS
  // ========================
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("seeker_id");
    localStorage.removeItem("hrId");
  }

  isAuthenticated() {
    return !!localStorage.getItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getRole() {
    return localStorage.getItem("role");
  }

  // ========================
  // 🔹 ADMIN DATA
  // ========================
  getAllSeekers() {
    return axios
      .get("http://localhost:8080/getAllJobSeeker")
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching job seekers:", err);
        throw err;
      });
  }

  getAllApplications() {
    return axios
      .get("http://localhost:8080/applications")
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching applications:", err);
        throw err;
      });
  }
}

export default new AdminAuthService();
