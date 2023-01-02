import React,{useEffect} from "react";
import { Button, Checkbox, Form, Input,message } from "antd";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, [])
  
  const onFinish = async (values) => {
    try {
      const res = await axios.post(
        "/api/users/register",
        values
      );
      console.log(res);
      if(res.data.success){
        message.success(res.data.message);
      }
      else{
        message.error(res.data.message);
      }
    } catch (err) {
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
