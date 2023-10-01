import axios from "axios";

export const API_URL = "https://api-socmed.crystalux.site";
// export const API_URL = "http://localhost:8001";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("instagram-auth"),
  },
});
