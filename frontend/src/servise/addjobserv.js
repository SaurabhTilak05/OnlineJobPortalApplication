import axios from "axios";
class AddJObService {
   addJob(jobdata) {
      return axios.post("http://localhost:8080/AddJob", jobdata ,{
        });
    } 
}
export default new AddJObService();