import axios from "axios";

const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Authorization: `Bearer ${token}`,
  },
});
