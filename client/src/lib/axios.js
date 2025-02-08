import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.mode === "development" ? "http://localhost:5000/api" : "/api",
    withCredentials: true, //Gửi cookies đến server
});

export default axiosInstance