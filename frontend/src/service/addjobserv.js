import axios from "axios";
class AddJObService {
   addJob(jobdata) {
      return axios.post("http://localhost:8080/AddJob", jobdata ,{
        });
    } 


    
    contactUs(cont){
      return axios.post("http://localhost:8080/contact",cont ,{
      });
    }

<<<<<<< HEAD:frontend/src/servise/addjobserv.js


    
=======
     getAllJobs() {
    return axios.get("http://localhost:8080/viewAllJobs");
  }
>>>>>>> 52af01c85b09a1f344f64c553e2208e585068054:frontend/src/service/addjobserv.js
}
export default new AddJObService();