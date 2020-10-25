import React from "react";
import styled from "styled-components";
import { Avatar, Row, Col } from "antd";
import AlignRight from '../components/AlignRight'
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
export default function Navbar() {
  return (
    <Nav>
      <Row gutter={16} style={{ width: "100%" }}>
        <Col span={4}>
          <TextLogo>FunRetro</TextLogo>
        </Col>
        <Col span={4} offset={16}>
          <AlignRight>
            <Avatar/>
          </AlignRight>
        </Col>
      </Row>
    </Nav>
  );
}
