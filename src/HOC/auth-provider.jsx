import { useDispatch, useSelector } from "react-redux";
import { types } from "../redux";
import { useEffect, useState } from "react";
import { api } from "../json-server/api";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userSelector = useSelector((state) => state.auth);

  const fetchData = async () => {
    const token = localStorage.getItem("instagram-auth");
    if (!token) return setIsLoading(false);
    await api
      .get(`/user/token/${token}`)
      .then((result) => {
        dispatch({
          type: types.login,
          payload: result.data.user,
        });
        localStorage.setItem("instagram-auth", result.data.token);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("instagram-auth");
      });
  };

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  useEffect(() => {
    if (userSelector.id) setIsLoading(false);
  }, [userSelector]);

  return isLoading ? <></> : children;
};
