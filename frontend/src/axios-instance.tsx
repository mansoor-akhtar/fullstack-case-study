import axios from "axios";

export default axios.create({
  //baseURL: "http://localhost:9000/api/"
  baseURL: "http://127.0.0.1:8000/api/"
});