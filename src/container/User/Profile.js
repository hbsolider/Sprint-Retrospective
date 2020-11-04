import React from "react";
import { Avatar, Button, Input, Typography } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import UserAction from "../../redux/User/User.action";
import { useState } from "react";
const { Title } = Typography;
const Center = styled.div`
  padding: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Flex = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;
const Colm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;
function Profile(props) {
  const [user, setUser] = useState({
    username: props.user.username,
    password: null,
    email: props.user.email,
    passwordChange: false,
  });
  const editUsername = () => {
    props.editRequest(0);
  };
  const editEmail = () => {
    props.editRequest(1);
  };
  const cancelRequest = () => {
    props.cancelRequest();
    setUser({
      passwordChange: false,
      ...user,
    });
  };
  const editPassword = () => {
    setUser({
      ...user,
      passwordChange: true,
    });
  };
  const onSave = () => {
    props.update({ _id: props.user._id, ...user });
  };
  return (
    <Center>
      <Colm>
        <Flex>
          <Title level={1}>Profile</Title>
        </Flex>
        <Flex>
          <Colm>
            <Avatar size={128} />
            <Button type="ghost">Edit avatar</Button>
          </Colm>
          <Colm>
            Username
            <Flex>
              <Input
                defaultValue={user.username}
                disabled={props.edit !== 0}
                style={{ width: "300px" }}
                onChange={(e) => {
                  setUser({
                    ...user,
                    username: e.target.value,
                  });
                }}
              />
              {props.edit !== 0 ? (
                <Button onClick={editUsername}>Edit</Button>
              ) : (
                <>
                  <Button onClick={cancelRequest}>Cancel</Button>
                  <Button onClick={onSave} type="primary">
                    Save
                  </Button>
                </>
              )}
            </Flex>
            Email
            <Flex>
              <Input
                defaultValue={user.email}
                disabled={props.edit !== 1}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              ></Input>
              {props.edit !== 1 ? (
                <Button onClick={editEmail}>Edit</Button>
              ) : (
                <>
                  <Button onClick={cancelRequest}>Cancel</Button>
                  <Button onClick={onSave} type="primary">
                    Save
                  </Button>
                </>
              )}
            </Flex>
            {user.passwordChange ? "Confirm password" : "Password"}
            <Flex>
              <Input
                defaultValue={!user.passwordChange ? "" : "password"}
                disabled={!user.passwordChange}
                type="password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    password: e.target.value,
                  });
                }}
              ></Input>
              {user.passwordChange ? (
                <>
                  <Button onClick={cancelRequest}>Cancel</Button>
                  <Button onClick={onSave} type="primary">
                    Save
                  </Button>
                </>
              ) : (
                <Button onClick={editPassword}>Edit</Button>
              )}
            </Flex>
          </Colm>
        </Flex>
      </Colm>
    </Center>
  );
}
const mapStateToProps = (state) => ({
  user: JSON.parse(state.user.user),
  edit: state.user.edit,
});

const mapDispatchToProps = (dispatch) => {
  return {
    editRequest: (i) => {
      dispatch(UserAction.updateRequest(i));
    },
    cancelRequest: () => {
      dispatch(UserAction.cancelRequest());
    },
    update: ({ _id, email, password, username, passwordChange }) => {
      dispatch(
        UserAction.update({ _id, email, password, username, passwordChange })
      );
    },
    confirmPassword: ({ password, hashpassword }) => {
      dispatch(UserAction.compare({ password, hashpassword }));
    },
  };
};
const connectProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default connectProfile;
