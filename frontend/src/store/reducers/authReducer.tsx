
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios-instance';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}


export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials
>(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('login', {
        email,
        password,
      });
      return response.data;
    } catch (err: any) {
        return rejectWithValue(err?.response?.data || 'Unknown error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { isAuthenticated: false },
  reducers: {
    logoutSuccess: (state) => {
      return {
        ...state,
        token: null,
        isAuthenticated: false
      }
    },
    setCurrentUser: (state) => {
      return {
        ...state,
        isAuthenticated: true
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (_state) => {
        /*
        state.loading = true;
        state.error = null;
        */
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('action fulfillled', state, action);
        /*
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        */
      })
      .addCase(loginUser.rejected, (_state, action) => {
        console.log('action', action);
        /*
        state.loading = false;
        state.error = action.payload;
        */
      });
  },
});

export const { logoutSuccess, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;