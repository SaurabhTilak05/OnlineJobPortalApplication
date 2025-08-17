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

     getAllJobs() {
    return axios.get("http://localhost:8080/viewAllJobs");
  }
}
export default new AddJObService();