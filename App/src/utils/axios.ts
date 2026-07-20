import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.29.16.45:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
