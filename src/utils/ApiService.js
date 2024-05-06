import axios from "axios";

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://universities.hipolabs.com/', // we can use process.env.REACT_APP_API_BASE_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      timeout: 30000, // to cater slow networks kept timeout to 30sec
    });

    // Multiple Interceptors
    // Request interceptor logs
    this.api.interceptors.request.use(
      (config) => {
        // add authorization token as well
        console.log(`Sending request to ${config.url}`);
        return config;
      },
      (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging successful responses
    this.api.interceptors.response.use(
      (response) => {
        console.log(`Received response from ${response.config.url}:`, response);
        return response;
      },
      (error) => {
        console.error("Response error:", error);
        return Promise.reject(error);
      }
    );

    // Error interceptor for handling network errors and request failures
    this.api.interceptors.response.use(
      undefined,
      (error) => {
        if (error.message === "Network Error") {
          console.error("Network Error:", error);
        } else if (error.response) {
          console.error("Request failed with status:", error.response.status);
        } else {
          console.error("Request failed:", error.message);
        }
        return Promise.reject(error);
      }
    );
  }

  get = async (path, params = {}) => {
      const response = await this.api.get(path, { params });
      return response;
  };
  
  // create other request methods as well i.e POST, PUT and DELETE requests
}

export default new ApiService();
