import axios from "axios";
class AddJObService {
   addJob(jobdata) {
  return axios.post("http://localhost:8080/AddJob", jobdata ,{
    headers: {
      'Content-Type': 'application/json'
         }
        });
    } 
}
export default new AddJObService();