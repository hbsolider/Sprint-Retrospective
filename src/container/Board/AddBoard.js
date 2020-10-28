import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
const { Title } = Typography;
const CreateBoard = styled.div`
  min-height: 130px;
  width: ${({ width }) => width || "150px"};
  user-select: none;
  cursor: pointer;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  margin: 10px;
  background-color:white;
  &:hover img{
    transform:scale(1.1);
  }
  &:hover{
    border-color:#51adcf;
  }
`;
export default function AddBoard() {
  return (
    <CreateBoard>
      <img
        src="https://www.flaticon.com/svg/static/icons/svg/60/60740.svg"
        alt=""
        style={{
          marginTop:'10px',
          width: "50%",
          height: "50%",
        }}
      />
      <Title level={5} style={{ marginTop: "10px" }}>
        Add Board
      </Title>
    </CreateBoard>
  );
}
