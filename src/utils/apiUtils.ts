import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://reqres.in/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'reqres-free-v1';

class ApiUtils {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
      },
    });

    // Add token to requests
    this.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Return response.data directly
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response.data,
      this.handleResponseError
    );
  }

  // Public methods return T directly
  get<T>(url: string, params?: object): Promise<T> {
    return this.instance.get(url, { params });
  }

  post<T>(url: string, data?: unknown): Promise<T> {
    return this.instance.post(url, data);
  }

  put<T>(url: string, data?: unknown): Promise<T> {
    return this.instance.put(url, data);
  }

  delete<T>(url: string): Promise<T> {
    return this.instance.delete(url);
  }

  // Interceptor error handler
  private handleResponseError = (error: AxiosError) => {
    if (error.response?.status === 401) {
      this.handleLogout();
    }
    return Promise.reject(error.response?.data || 'An error occurred');
  };

  private handleLogout() {
    console.log('🚪 Logging out due to unauthorized...');
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

export const apiUtils = new ApiUtils();
