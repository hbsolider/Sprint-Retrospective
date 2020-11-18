import React, { useEffect } from "react";
import { Avatar, Button, Input, Typography, Tooltip, Popconfirm } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import UserAction from "../../redux/User/User.action";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import axios from "../../services/Axios";
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
  align-items: center;
`;
const Colm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;
const Layout = styled.div`
  display: flex;
`;
function Profile(props) {
  const [user, setUser] = useState(null);
  const Edit = () => {
    props.editRequest();
  };
  const onSave = () => {
    props.update({ _id: props.user._id, ...user });
  };
  useEffect(() => {
    const getUser = async () =>
      await axios.get(`/user`).then(async (r) => {
        if (r) {
          await setUser(r.data.user);
        }
      });
    getUser();
    return () => {
      setUser(null);
    };
  }, []);
  if (user !== null) {
    return (
      <Center>
        <Colm>
          <Flex>
            <Title level={2}>
              Profile
              {!props.edit && (
                <Tooltip placement="bottom" title="Edit profile">
                  <EditOutlined
                    className="button"
                    style={{ color: "rgb(24,144,255)", marginLeft: 10 }}
                    onClick={Edit}
                  />
                </Tooltip>
              )}
            </Title>
          </Flex>
          <Layout>
            <Colm>
              <Avatar size={128} />
              <Button type="ghost" style={{ marginTop: "5px" }}>
                Edit avatar
              </Button>
            </Colm>
            <Colm>
              <Title level={5}>Name</Title>
              <Flex>
                <Input
                  defaultValue={user.displayName}
                  disabled={!props.edit}
                  onChange={(e) =>
                    setUser({ ...user, displayName: e.target.value })
                  }
                />
              </Flex>
              <Title level={5}>Username</Title>
              <Flex>
                <Input defaultValue={user.username} disabled />
              </Flex>
              <Title level={5}>Email</Title>
              <Flex>
                <Input
                  defaultValue={user.email}
                  disabled={
                    user.from === "local" ? (props.edit ? false : true) : true
                  }
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </Flex>
              <Title level={5}>Password</Title>
              <Flex>
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  disabled={!props.edit}
                >
                  Change password
                </Button>
              </Flex>
              {props.edit && (
                <Flex>
                  <Popconfirm title="Save this infomation?" onConfirm={onSave}>
                    <Button type="primary" danger style={{ width: "100%" }}>
                      Save
                    </Button>
                  </Popconfirm>
                  <Button style={{ width: "100%" }} onClick={Edit}>
                    Cancel
                  </Button>
                </Flex>
              )}
            </Colm>
          </Layout>
        </Colm>
      </Center>
    );
  } else {
    return <></>;
  }
}
const mapStateToProps = (state) => ({
  user: JSON.parse(localStorage.getItem("user")).user,
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
    update: ({ _id, email, password, username, passwordChange,displayName }) => {
      dispatch(
        UserAction.update({ _id, email, password, username, passwordChange,displayName })
      );
    },
    confirmPassword: ({ password, hashpassword }) => {
      dispatch(UserAction.compare({ password, hashpassword }));
    },
  };
};
const connectProfile = connect(mapStateToProps, mapDispatchToProps)(Profile);
export default connectProfile;
