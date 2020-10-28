import { Col } from "antd";
import React from "react";
import styled from "styled-components";

const Mid = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: white;
`;

const MidCol = ({ span, children, ...props }) => {
  return (
    <Col span={span}>
      <Mid {...props}>{children}</Mid>
    </Col>
  );
};

export default MidCol;
