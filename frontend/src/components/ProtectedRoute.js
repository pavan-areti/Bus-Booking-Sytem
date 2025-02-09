import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import DefaultLayout from "./DefaultLayout";
import useStore from "../stores/store";

function ProtectedRoute({ children }) {
  const { user,setUser } = useStore((state) => state.usersSlice);
  const {showLoading,hideLoading} = useStore((state) => state.alertsSlice);
  const navigate = useNavigate();

  const validateToken = useCallback(async () => {
    try {
      showLoading();
      const res = await axios.post("/api/users/is-auth", {});
      hideLoading();
      if (res.data.success) {
        message.success("authentication succesfull");
        setUser(res.data.data);
      } else {
        message.error(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      message.error(err.message);
      navigate("/login");
    }
  }, [hideLoading, navigate, setUser, showLoading]);

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  console.log(user)
  return <>{
    user &&
    <DefaultLayout>{children}</DefaultLayout>
  }</>;
}

export default ProtectedRoute;
