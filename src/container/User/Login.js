import React from "react";
import styled from "styled-components";
import { Form, Input, Typography, Button } from "antd";
import { connect } from "react-redux";
import userAction from "../../redux/User/User.action";
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
function Login(props) {
  const onFinish = ({username,password}) => {
    if(username&&password){
        props.login({username,password})
    }
  };
  return (
    <Center>
      <LoginForm>
        <div>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
        </div>
        <Form
          onFinish={onFinish}
          layout="vertical"
          size="large"
          style={{
            display: "flext",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Form.Item label="Username" name="username" required>
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" required>
            <Input type="password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" style={{ width: "100%" }} type="primary" loading={props.user.loggingIn}>
              Login
            </Button>
          </Form.Item>
          <div style={{ textAlign: "center", marginBottom: "10px" }}>Or</div>
          <Form.Item>
            <Button style={{ width: "100%" }}>Register</Button>
          </Form.Item>
        </Form>
      </LoginForm>
    </Center>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login:({username,password})=> dispatch(userAction.login({username,password})),
  };
};
const loginConnect = connect(mapStateToProps,mapDispatchToProps)(Login)
export default loginConnect;
