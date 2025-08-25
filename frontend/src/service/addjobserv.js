import axios from "axios";
class AddJObService {
   addJob(jobData) {
    return axios.post("http://localhost:8080/AddJob", jobData); // Ensure this matches backend
  }

  getAllJobs() {
    return axios.get("http://localhost:8080/viewAllJobs"); // Example
  }



    
    contactUs(cont){
      return axios.post("http://localhost:8080/contact",cont ,{
      });
    }


    AddHR(hrdata){
      return axios.post("http://localhost:8080/AddHr",hrdata,{

      });
      
    }



}
export default new AddJObService();