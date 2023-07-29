import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import styled from "styled-components";
import { Heading1 } from "../components/Typography/Heading1";
import { Heading2 } from "../components/Typography/Heading2";
import { Para } from "../components/Typography/Para";

const Heading = styled(Heading1)`
  margin-bottom: 2rem;
`;

const Screen = styled.div`
  min-height: 100vh;
  background: black;
  background-size: cover;
  background-position: center;

  display: flex;
  align-items: center;
  justify-content: center;
`;

//for buttons
const Container = styled.div`
  max-width: 1100px;
  background: var(--color-primary);
  border-radius: 1.5rem;

  padding: 4rem;
  margin: 4rem;
  display: flex;
  justify-content: center;
  gap: 5rem;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Matter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  max-width: 50%;
`;
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/users/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        localStorage.setItem("token", res.data.data);
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  return (
    <Screen>
      <Container>
        <Matter>
          <Heading>Bus Booking Site</Heading>
          <div>
            <Heading2>Never miss your next Trip</Heading2>
            <Para>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              unde ea quae voluptatem facilis, similique illo reprehenderit
            </Para>
          </div>
          <div>
            <Heading2>Book your Bus from us</Heading2>
            <Para>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
              unde ea quae voluptatem facilis, similique illo reprehenderit
            </Para>
          </div>
        </Matter>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Card className="w-300 card p-3">
            <h2 className="p-2 mb-4 text-center auth-form-heading">Login</h2>
            <Form
              layout="vertical"
              name="basic"
              initialValues={{ remember: true }}
              autoComplete="off"
              onFinish={onFinish}
              className="d-flex flex-column justify-content-center"
            >
              <Form.Item label="Email" name="email">
                <Input type="email" />
              </Form.Item>
              <Form.Item label="Password" name="password">
                <Input.Password />
              </Form.Item>
              {/* <Link to="/register" className="btn-primary">
                Register
              </Link>
              <button className="btn-primary" type="submit">
                Login
              </button> */}
              <Form.Item>
                <div className="d-flex flex-column  justify-content-center">
                  <a
                    href="http://localhost:5000/api/users/login/federated/google"
                    className="btn btn-primary d-flex justify-content-center gap-3"
                    style={{ textAlign: "center",background: "#E94560" }}
                  >
                    <i
                      className="ri-google-fill"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Google
                  </a>
                </div>
              </Form.Item>
              <Form.Item>
                <div className="d-flex flex-column  justify-content-center">
                  <a
                    href="http://localhost:5000/api/users/login/federated/facebook"
                    className="btn btn-primary d-flex justify-content-center gap-3"
                    style={{ textAlign: "center",background:"#3A1078" }}
                  >
                    <i
                      className="ri-facebook-fill"
                      style={{ fontSize: "16px" }}
                    ></i>{" "}
                    Facebook
                  </a>
                </div>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </Container>
    </Screen>
  );
};

export default Login;
