import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/usersSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import DefaultLayout from "./DefaultLayout";

function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const validateToken = useCallback(
    async (token) => {
      try {
        dispatch(showLoading());
        const res = await axios.post(
          "/api/users/get-user-by-id",
          {},
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(hideLoading());
        if (res.data.success) {
          dispatch(setUser(res.data.data));
        } else {
          localStorage.removeItem("token");
          message.error(res.data.message);
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/login");
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateToken(token);
    }
  }, [navigate, validateToken]);
  return <>{user && <DefaultLayout>{children}</DefaultLayout>}</>;
}

export default ProtectedRoute;
