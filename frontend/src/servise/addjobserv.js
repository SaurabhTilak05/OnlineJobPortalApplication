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



    
}
export default new AddJObService();