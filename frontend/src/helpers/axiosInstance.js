import axios from "axios";

const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});