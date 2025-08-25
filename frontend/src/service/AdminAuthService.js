  import axios from "axios";

  class AdminAuthService {
    login(credentials) {
      return axios
        .post("http://localhost:8080/adminLogin", credentials)
        .then((res) => res.data); // returns {message, token, role, username}
    }

    
hrLogin(data) {
  return axios.post("http://localhost:8080/hr/login", data)
    .then(res => {
      // Save HR info in localStorage for later
      localStorage.setItem("hrId", res.data.hr_id); // store numeric hr_id
      localStorage.setItem("role", "hr"); // store role
      return res.data;
    });
}
UserLogin(udata){
  return axios.post("http://localhost:8080/loginseeker", udata)
    .then(res => {
      console.log("Full response:", res);   // 👀 check what backend is sending

      localStorage.setItem("seeker_id", res.data.seeker_id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");

      return res.data;
    })
    .catch(err => {
      console.error("Axios error:", err.response ? err.response.data : err.message);
      throw err;
    });
}


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
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
}

export default new AdminAuthService();
