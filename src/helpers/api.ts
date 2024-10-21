import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: "http://localhost:4200/api",
  withCredentials: true, // Необходимо для автоматической отправки cookies
});

interface AuthResponse {
  accessToken: string;
  user: unknown;
  newRefreshToken: string;
}

// Функция для попытки обновления accessToken
async function refreshAccessToken(): Promise<string> {
  try {
    // Получаем refreshToken из кук
    const refreshToken = Cookies.get("refreshToken");

    // Проверяем наличие refreshToken
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    // Отправляем запрос для получения нового accessToken
    const response: AxiosResponse<AuthResponse> = await api.post(
      "/auth/login/access-token",
      {
        refreshToken,
      }
    );
    const { accessToken, user, newRefreshToken } = response.data;

    // Сохраняем новый accessToken и данные пользователя
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("refresh_token", newRefreshToken);

    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw new Error("Could not refresh the access token.");
  }
}

// Перехватчик запросов для добавления accessToken в заголовки
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // Убедитесь, что заголовки правильно указаны
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Перехватчик ответов для обработки истекшего accessToken
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
      return api(originalRequest); // Повторяем исходный запрос с новым accessToken
    }
    return Promise.reject(error);
  }
);

export default api;
