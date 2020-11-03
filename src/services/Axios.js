import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const token = localStorage.getItem("token");
axios.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    Authorization: `${token}`,
    "Content-Type": "application/json",
  },
});
export default axiosInstance;
