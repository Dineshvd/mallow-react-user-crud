export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/login',
  },
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
    SINGLE: (id: string | number) => `/users/${id}`,
  },
};
