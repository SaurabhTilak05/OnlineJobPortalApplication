import axios from "axios";

class AdminAuthService {
  login(credentials) {
    return axios
      .post("http://localhost:8080/adminLogin", credentials)
      .then((res) => res.data);
  }

  AddHR(hrdata) {
    return axios.post("http://localhost:8080/addHr", hrdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  hrLogin(data) {
    return axios.post("http://localhost:8080/hr/login", data).then((res) => {
      localStorage.setItem("hrId", res.data.hr_id);
      localStorage.setItem("role", "hr");
      return res.data;
    });
  }

  UserLogin(udata) {
    return axios
      .post("http://localhost:8080/loginseeker", udata)
      .then((res) => {
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
    return axios.put("http://localhost:8080/update-profile", profileData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  }

  uploadResume(resumeData) {
    return axios
      .put("http://localhost:8080/upload-resume", resumeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }

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

  getAllSeekers() {
    return axios
      .get("http://localhost:8080/getAllJobSeeker", {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching job seekers:", err);
        throw err;
      });
  }

  getAllApplications() {
    return axios
      .get("http://localhost:8080/applications", {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching applications:", err);
        throw err;
      });
  }

  getAllContacts() {
    const token = this.getToken();
    return axios
      .get("http://localhost:8080/getallcontact", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.error("Error fetching contact details:", err);
        throw err;
      });
  }

  uploadProfilePicture(formData) {
    return axios
      .put("http://localhost:8080/upload-profile-picture", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
}

export default new AdminAuthService();
