import axios from "axios";

export const API_URL = "https://api-socmed.crystalux.site";
// export const API_URL = "http://192.168.11.13:8001/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: localStorage.getItem("instagram-auth"),
  },
});
