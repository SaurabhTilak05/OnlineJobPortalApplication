import axios from "axios";
class RegisterServ {
   register(regData) {
      return axios.post("http://localhost:8080/regJobSeeker", regData ,{
        });
    } 
  
}
export default new RegisterServ();