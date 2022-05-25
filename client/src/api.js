import axios from "axios";



const baseUrl =
  process.env.NODE_ENV === 'production'
    ? `https://${window.location.hostname}/api/v1`
    : 'http://localhost:5000/api/v1';

const axiosBase = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    "accept-language": "en",
    "Access-Control-Allow-Origin": "true",
  },
});

axiosBase.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + localStorage.getItem("token");
  return config;
});



export default axiosBase;
