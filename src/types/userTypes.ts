export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

export type UserListResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
};

export type CreateUserData = {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
};

export type UpdateUserData = Partial<CreateUserData>;

export type CreateResponse = {
  id: string;
  createdAt: string;
};

export type UpdateResponse = {
  updatedAt: string;
};
