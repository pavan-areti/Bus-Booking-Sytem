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

  const validateToken = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/users/is-auth", {});
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("authentication succesfull");
        dispatch(setUser(res.data.data));
      } else {
        message.error(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      message.error(err.message);
      navigate("/login");
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return <>{
    user &&
    <DefaultLayout>{children}</DefaultLayout>
  }</>;
}

export default ProtectedRoute;
