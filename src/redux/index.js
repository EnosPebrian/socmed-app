import { userReducer } from "./reducers/users";

export const types = {
  login: "LOGIN",
  logout: "LOGOUT",
};

export const reducers = {
  auth: userReducer,
};
