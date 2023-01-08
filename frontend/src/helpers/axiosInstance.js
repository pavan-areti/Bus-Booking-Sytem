import axios from "axios";

const token = localStorage.getItem("token");
export const axiosInstance = axios.create({
    headers: {
        authorization: `Bearer ${token}`,
    },
});