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
    return axios.post("http://localhost:8080/addHr", hrdata, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

 // Profile update (JSON)
updateProfile(profileData) {
  return axios.put(`http://localhost:8080/update-profile`, profileData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json", // ✅ Must be JSON
    },
  });
}

// Resume upload (FormData)
uploadResume(resumeData) {
  return axios.put(`http://localhost:8080/upload-resume`, resumeData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data", // ✅ FormData
    },
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
    // ========================
  // 🔹 CONTACT DETAILS
  // ========================
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
  return axios.put(`http://localhost:8080/upload-profile-picture`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  });
}
  ///getallcontact
}

export default new AdminAuthService();
