import { apiUtils } from '../utils/apiUtils';
import { API_ENDPOINTS } from '../constants/apiEndpoints';
import type {
  User,
  UserListResponse,
  CreateUserData,
  UpdateUserData,
  CreateResponse,
  UpdateResponse,
} from '../types/userTypes';

export const userService = {
  async getUsers(
    page: number = 1,
    perPage: number = 5
  ): Promise<UserListResponse> {
    return await apiUtils.get<UserListResponse>(API_ENDPOINTS.USERS.LIST, {
      page,
      per_page: perPage,
    });
  },

  async getUser(id: number): Promise<{ data: User }> {
    return await apiUtils.get<{ data: User }>(API_ENDPOINTS.USERS.SINGLE(id));
  },

  async createUser(data: CreateUserData): Promise<CreateResponse> {
    return await apiUtils.post<CreateResponse>(
      API_ENDPOINTS.USERS.CREATE,
      data
    );
  },

  async updateUser(id: number, data: UpdateUserData): Promise<UpdateResponse> {
    return await apiUtils.put<UpdateResponse>(
      API_ENDPOINTS.USERS.UPDATE(id),
      data
    );
  },

  async deleteUser(id: number): Promise<void> {
    return await apiUtils.delete<void>(API_ENDPOINTS.USERS.DELETE(id));
  },
};
