import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validateToken = async (token) => {
    try {
      const res = await axios.post(
        "/api/users/get-user-by-id",
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setLoading(false);
      } else {
        setLoading(false);
        localStorage.removeItem("token");
        message.error(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    const token =  localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      validateToken(token);
    }
  }, []);
  return <>{ loading ? <div>Loading</div> : <div>{children}</div>}</>
}

export default ProtectedRoute;
