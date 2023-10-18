import axios from "axios";
import { TOKEN_TYPES } from "../Constant/Constant";

const BASE_API_URL = "http://localhost:3001/api/v1";

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);
  if (accessToken) {
    config.headers["x-access-token"] = accessToken;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.log(error);
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
      window.location.href = "/login";
    }
  }
);

export default api;
