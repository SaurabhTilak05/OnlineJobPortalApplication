import axios from "axios";

class AdminAuthService {
  login(credentials) {
    return axios
      .post("http://localhost:8080/adminLogin", credentials)
      .then((res) => res.data); // returns {message, token, role, username}
  }

  
  hrLogin(data) {
    console.log(data);
    
    return axios.post("http://localhost:8080/hr/login", data)
    .then(res => res.data);
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
