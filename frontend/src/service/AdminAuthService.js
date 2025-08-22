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
