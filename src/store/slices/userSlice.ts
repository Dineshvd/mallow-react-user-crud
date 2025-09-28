import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { userService } from '../../services/userService';
import { type User, type UserForm } from '../../types';

interface UserState {
  users: User[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

interface UserListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

interface CreateResponse {
  id: string;
  createdAt: string;
}

const initialState: UserState = {
  users: [],
  page: 1,
  perPage: 5,
  total: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    { page, perPage }: { page: number; perPage: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await userService.getUsers(page, perPage);
      return response;
    } catch (err: unknown) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMessage =
        error.response && error.response.data?.error
          ? error.response.data.error
          : 'Failed to fetch users';
      return rejectWithValue(errorMessage);
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (data: UserForm, { rejectWithValue }) => {
    try {
      const response = await userService.createUser(data);
      return { response, data };
    } catch (err: unknown) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMessage =
        error.response && error.response.data?.error
          ? error.response.data.error
          : 'Failed to create user';
      return rejectWithValue(errorMessage);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, data }: { id: number; data: UserForm }, { rejectWithValue }) => {
    try {
      const response = await userService.updateUser(id, data);
      return { id, data, response };
    } catch (err: unknown) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMessage =
        error.response && error.response.data?.error
          ? error.response.data.error
          : 'Failed to update user';
      return rejectWithValue(errorMessage);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      await userService.deleteUser(id);
      return id;
    } catch (err: unknown) {
      const error = err as AxiosError<{ error?: string }>;
      const errorMessage =
        error.response && error.response.data?.error
          ? error.response.data.error
          : 'Failed to delete user';
      return rejectWithValue(errorMessage);
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<UserListResponse>) => {
          state.loading = false;
          state.users = action.payload.data;
          state.page = action.payload.page;
          state.perPage = action.payload.per_page;
          state.total = action.payload.total;
          state.totalPages = action.payload.total_pages;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        createUser.fulfilled,
        (
          state,
          action: PayloadAction<{ response: CreateResponse; data: UserForm }>
        ) => {
          state.loading = false;
          state.users.push({
            id: parseInt(action.payload.response.id),
            first_name: action.payload.data.first_name,
            last_name: action.payload.data.last_name,
            email: action.payload.data.email,
            avatar: action.payload.data.avatar,
          });
        }
      )
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<{ id: number; data: UserForm }>) => {
          state.loading = false;
          const index = state.users.findIndex(
            (user) => user.id === action.payload.id
          );
          if (index !== -1) {
            state.users[index] = {
              ...state.users[index],
              ...action.payload.data,
            };
          }
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
