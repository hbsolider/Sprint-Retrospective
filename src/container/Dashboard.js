import React, { useState } from "react";
// import styled from "styled-components";
import Section from "../components/Section";
import { Space, Typography, Divider, Input, Row, Col } from "antd";
import styled from "styled-components";
import Sort from "../assets/icons/sort.svg";
import AddBoard from './Board/AddBoard'
const { Search } = Input;
const { Title } = Typography;

const Control = styled.div`
  min-height: 50px;
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  transition: ease-in 0.3s;
  transform: ${({ isAccending }) =>
    isAccending ? "rotate(180deg)" : "rotate(0deg)"};
`;
const BoardContainer = styled.div`
  display: flex;
`;
const Dashboard = () => {
  const [isAccending, setAccending] = useState(false);
  const onClickAccending = () => {
    setAccending(!isAccending);
  };
  return (
    <>
      <Section>
        <Title level={2}>My boards</Title>
        <Control>
          <Row gutter={16} style={{ width: "100%" }}>
            <Col span={8}>
              <Space>
                <Title level={5} style={{ margin: 0 }}>
                  Sort by date:
                </Title>{" "}
                <Img
                  src={Sort}
                  alt=""
                  isAccending={isAccending}
                  onClick={onClickAccending}
                ></Img>
              </Space>
            </Col>

            <Col span={8} offset={8}>
              <Search placeholder="Search board" />
            </Col>
          </Row>
        </Control>
        <Divider style={{ margin: "10px 0px" }} />
        <AddBoard/>
      </Section>
    </>
  );
};
export default Dashboard;
