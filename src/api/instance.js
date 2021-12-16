import axios from "axios";

const BASE_URL = "https://diary-backend-nodejs.herokuapp.com";

export default axios.create({
  baseURL: BASE_URL,
});
