import React from "react";
import styled from "styled-components";
import { Form, Input, Typography, Button, Checkbox, Divider } from "antd";
import { connect } from "react-redux";
import userAction from "../../redux/User/User.action";
import { Redirect, Link } from "react-router-dom";
import {
  UserOutlined,
  LockOutlined,
  FacebookOutlined,
  GoogleOutlined,
  PicRightOutlined,
  LinkOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const Center = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
function LoginOrRegister({ isLogin, ...props }) {
  const onFinishLogin = ({ username, password }) => {
    if (username && password) {
      props.login({ username, password });
    }
  };
  const onFinishRegister = (e) => {
    props.register(e);
  };
  const facebookLogin = () => {
    window.location = `${
      process.env.REACT_APP_API_URL || "http://localhost:5000"
    }/api/user/auth/facebook`;
  };
  const googleLogin = () => {
    window.location = `${
      process.env.REACT_APP_API_URL || "http://localhost:5000"
    }/api/user/auth/google`;
  };
  const renderLogin = () => {
    return (
      <Center>
        <Title level={4} style={{ textAlign: "center" }}>
          Welcome login
        </Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinishLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
          </Form.Item>
          <Divider orientation="center">Or</Divider>
          <Form.Item>
            <Form.Item style={{ display: "inline-block", width: "calc(50%)" }}>
              <Button
                onClick={googleLogin}
                style={{ width: "100%" }}
                type="primary"
                danger
              >
                <GoogleOutlined />
              </Button>
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "calc(50%)" }}>
              <Button
                onClick={facebookLogin}
                style={{ width: "100%" }}
                type="default"
              >
                <FacebookOutlined style={{ color: "rgb(24,144,255)" }} />
              </Button>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Link to="/user/register">
              <Button type="dashed" style={{ width: "100%" }} danger>
                Register
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Center>
    );
  };
  const renderRegister = () => {
    return (
      <Center>
        <Title level={4} style={{ textAlign: "center" }}>
          Welcome Register
        </Title>
        <Form
          name="normal_login"
          initialValues={{ remember: true }}
          onFinish={onFinishRegister}
        >
          <Form.Item
            name="displayName"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<PicRightOutlined />}
              placeholder="Input your name here"
            />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Input your username"
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input prefix={<LinkOutlined />} placeholder="Input your email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Input your password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
              style={{ width: "100%" }}
            >
              Register
            </Button>
          </Form.Item>
          <Divider orientation="center">Or</Divider>
          <Form.Item>
            <Form.Item style={{ display: "inline-block", width: "calc(50%)" }}>
              <Button
                onClick={googleLogin}
                style={{ width: "100%" }}
                type="primary"
                danger
              >
                <GoogleOutlined />
              </Button>
            </Form.Item>
            <Form.Item style={{ display: "inline-block", width: "calc(50%)" }}>
              <Button
                onClick={facebookLogin}
                style={{ width: "100%" }}
                type="default"
              >
                <FacebookOutlined style={{ color: "rgb(24,144,255)" }} />
              </Button>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Link to="/user">
              <Button
                type="ghost"
                className="login-form-button"
                style={{ width: "100%" }}
              >
                Go to login
              </Button>
            </Link>
          </Form.Item>
        </Form>
      </Center>
    );
  };
  return (
    <>
      {props.user.loggedIn ? (
        <Redirect to="/" />
      ) : (
        <>{isLogin ? renderLogin() : renderRegister()}</>
      )}
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: ({ username, password }) =>
      dispatch(userAction.login({ username, password })),
    register: ({ username, password, email,displayName }) => {
      dispatch(userAction.register({ username, password, email,displayName }));
    },
  };
};
const loginConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrRegister);
export default loginConnect;
