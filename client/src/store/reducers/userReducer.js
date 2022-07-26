import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

const initialState = {
  isAuth: false,
  email: '',
  id: '',
};

const login = createAsyncThunk('user/login', async (payload, thunkApi) => {
  const { data } = await AuthService.login(payload.email, payload.password);
  return data;
});

const logout = createAsyncThunk('user/logout', async (payload, thunkApi) => {
  await AuthService.logout();
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.isAuth = true;
      state.email = action.payload.user.email;
      state.id = action.payload.user.id;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      state.isAuth = false;
      state.email = '';
      state.id = '';
    });
  },
});

export default userSlice.reducer;
export { login, logout };
