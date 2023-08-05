import React,{useEffect} from "react";
import { Form, Input,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, [navigate])
  
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/users/register",
        values
      );
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        navigate("/login");
      }
      else{
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
       message.error(err.message);
    }
  };
  return (
    <div className="h-screen d-flex flex-column justify-content-center align-items-center">
      <div className="w-300 card p-3">
        <h2 className="p-2 mb-4 text-center auth-form-heading">Register</h2>
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Form.Item label="Username" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <div className="d-flex  justify-content-between">
              <Link to="/login" className="btn-primary">
                Login
              </Link>
              <button className="btn-primary" type="submit">
                Register
              </button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
