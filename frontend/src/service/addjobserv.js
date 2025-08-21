import axios from "axios";
class AddJObService {
   addJob(jobdata) {
      return axios.post("http://localhost:8080/AddJob", jobdata ,{
        });
    } 

      getAllJobs() {
         return axios.get("http://localhost:8080/viewAllJobs");
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