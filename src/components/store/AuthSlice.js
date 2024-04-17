import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  idToken: localStorage.getItem("idToken"),
  isLoggedIn: !!localStorage.getItem("idToken"),
  email: localStorage.getItem("email"),
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.idToken = action.payload.idToken;
      state.isAuthenticated = true;
      state.email = action.payload.email;
      localStorage.setItem("email", state.email);
      localStorage.setItem("token", state.idToken);
    },
    logout(state) {
      state.idToken = null;
      state.isAuthenticated = false;
      state.email = null;
      localStorage.removeItem("idToken");
    },
  },
});

export const authActions = AuthSlice.actions;
export default AuthSlice.reducer;