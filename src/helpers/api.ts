import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "https://scratchpad-backend.onrender.com/api",
  withCredentials: true,
});

interface AuthResponse {
  accessToken: string;
  user: unknown;
  newRefreshToken: string;
}

async function refreshAccessToken(): Promise<string> {
  try {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login/access-token",
      {
        refreshToken,
      }
    );
    const { accessToken, user, newRefreshToken } = response.data;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("refresh_token", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Could not refresh the access token.");
  }
}

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
