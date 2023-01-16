import axios from "axios";

// const BASE_URL = "https://diary-backend-nodejs.herokuapp.com";
const BASE_URL = "https://diary-vi2m.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
});
