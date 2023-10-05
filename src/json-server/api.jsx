import axios from "axios";

export const API_URL = "https://api-socmed.crystalux.web.id";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("instagram-auth")}`,
  },
});
