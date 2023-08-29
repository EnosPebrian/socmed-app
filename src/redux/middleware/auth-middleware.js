import { types } from "..";
import { api } from "../../json-server/api";

export const userLogin = (values) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/user/auth", { ...values });
      if (!res.data) throw new Error("wrong username");
      dispatch({ type: types.login, payload: res.data.user });
      localStorage.setItem("instagram-auth", res.data.token);
      return "success";
    } catch (err) {
      localStorage.removeItem("instagram-auth");
      return err.message;
    }
  };
};

export const userLogout = () => {
  return async (dispatch) => {};
};

export const userUpdate = (id, values) => {
  return async (dispatch) => {};
};
