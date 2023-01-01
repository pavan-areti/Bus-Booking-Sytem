import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link } from "react-router-dom";
const Register = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <Form.Item label="Username" name="username">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="Email">
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
