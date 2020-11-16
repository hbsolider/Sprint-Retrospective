import axios from "axios";

// const apiUrl = process.env.REACT_APP_API_URL;
// const token = localStorage.getItem("token");
// // axios.interceptors.request.use(
// //   (config) => {
// //     const { origin } = new URL(config.url);
// //     const allowedOrigins = [apiUrl];
// //     if (allowedOrigins.includes(origin)) {
// //       config.headers.authorization = `${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// const axiosInstance = axios.create({
//   headers: {
//     Authorization: `${token}`,
//     "Content-Type": "application/json",
//   },
// });
const client = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  xsrfCookieName: "csrftoken_testtest",
  xsrfHeaderName: "X-CSRFToken",
});

client.interceptors.request.use(
  function (request) {
    if (request.url !== `/api/login_check`) {
      request.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
// export default axiosInstance;
