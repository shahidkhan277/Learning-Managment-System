import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
  withCredentials: true, // Important for Laravel Sanctum
});


export const initializeCsrfToken = async () => {
  await axiosClient.get("http://localhost:8000/sanctum/csrf-cookie"); // Ensures the token is fetched before API calls
};
// 🔹 Request Interceptor: Attach Bearer Token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔹 Response Interceptor: Handle Unauthorized Access
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        console.log(" Logging out..." , error.response);
        // window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
