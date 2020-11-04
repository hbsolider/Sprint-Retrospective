import React from "react";
import styled from "styled-components";
import { Form, Input, Typography, Button } from "antd";
import { connect } from "react-redux";
import userAction from "../../redux/User/User.action";
import { Redirect, Link } from "react-router-dom";
const { Title } = Typography;

const LoginForm = styled.div`
  width: 350px;
  background-color: white;
  -webkit-box-shadow: 0px 3px 15px -6px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 3px 15px -6px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 3px 15px -6px rgba(0, 0, 0, 0.75);
  border-radius: 2px;
  padding: 20px 20px;
`;
const Center = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
function LoginOrRegister({ isLogin, ...props }) {
  const onFinishLogin = ({ username, password }) => {
    if (username && password) {
      props.login({ username, password });
    }
  };
  const onFinishRegister = ({ username, password, email }) => {
    props.register({username,password,email})
  };
  const renderLogin = () => {
    return (
      <Center>
        <LoginForm>
          <div>
            <Title level={2} style={{ textAlign: "center" }}>
              Login
            </Title>
          </div>
          <Form
            onFinish={onFinishLogin}
            layout="vertical"
            size="large"
            style={{
              display: "flext",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            requiredMark={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" size="large" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
                loading={props.user.loggingIn}
              >
                Login
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>Or</div>
            <Link to= "/user/register">
              <Form.Item>
                <Button style={{ width: "100%" }}>Register</Button>
              </Form.Item>
            </Link>
          </Form>
        </LoginForm>
      </Center>
    );
  };
  const renderRegister = () => {
    return (
      <Center>
        <LoginForm>
          <div>
            <Title level={2} style={{ textAlign: "center" }}>
              Register
            </Title>
          </div>
          <Form
            onFinish={onFinishRegister}
            layout="vertical"
            size="middle"
            style={{
              display: "flext",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
            requiredMark={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input size="middle" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                {},
              ]}
            >
              <Input size="middle" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input type="password" size="middle" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
                loading={props.user.registering}
              >
                Register
              </Button>
            </Form.Item>
            <div style={{ textAlign: "center", marginBottom: "10px" }}>
              If you have account
            </div>
            <Link to="/user">
              <Form.Item>
                <Button style={{ width: "100%" }}>Login</Button>
              </Form.Item>
            </Link>
          </Form>
        </LoginForm>
      </Center>
    );
  };
  return (
    <>
      {props.user.loggedIn ? (
        <Redirect to='/' />
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
    register: ({ username, password, email }) => {
      dispatch(userAction.register({ username, password, email }));
    },
  };
};
const loginConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginOrRegister);
export default loginConnect;
