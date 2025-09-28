import { apiUtils } from '../utils/apiUtils';
import { API_ENDPOINTS } from '../constants/apiEndpoints';

import type { LoginCredentials, AuthResponse } from '../types/authTypes';

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiUtils.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response;
  },

  logout() {
    localStorage.removeItem('token');
    // window.location.href = '/login';
  },
};
