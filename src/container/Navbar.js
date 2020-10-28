import React from "react";
import styled from "styled-components";
import { Avatar, Row, Col } from "antd";
import AlignRight from "../components/AlignRight";
import { Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import userAction from "../redux/User/User.action";
import { Link } from "react-router-dom";
const Nav = styled.div`
  display: flex;
  background-color: black;
  min-height: 50px;
  align-items: center;
  padding: 0px 100px;
`;
const TextLogo = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 1.5em;
  color: ${(color) => (color ? "white" : "black")};
`;
function Navbar(props) {
  const logOut = () => {props.logOut()};
  const DropMenu = () => {
    return (
      <Menu>
        <Menu.Item>Profile</Menu.Item>
        <Menu.Item onClick={logOut}>Log out</Menu.Item>
      </Menu>
    );
  };
  return (
    <Nav>
      <Row gutter={16} style={{ width: "100%" }}>
        <Col span={4}>
          <Link to={process.env.PUBLIC_URL+"/"}>
            <TextLogo>FunRetro</TextLogo>
          </Link>
        </Col>
        <Col span={4} offset={16}>
          <AlignRight>
            <Dropdown overlay={DropMenu} placement="bottomRight" arrow>
              <Avatar />
            </Dropdown>
          </AlignRight>
        </Col>
      </Row>
    </Nav>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logOut: ()=>dispatch(userAction.logout()),
  };
};

const navbarConnect = connect(mapStateToProps, mapDispatchToProps)(Navbar);
export default navbarConnect;
