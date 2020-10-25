import React from "react";
import styled from "styled-components";
import { Typography } from "antd";
const { Title } = Typography;
const CreateBoard = styled.div`
  min-height: 150px;
  width: ${({ width }) => width || "150px"};
  user-select: none;
  cursor: pointer;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align:center;
`;
export default function AddBoard() {
  return (
    <>
      <CreateBoard>
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/60/60740.svg"
          alt=""
          style={{
            width: "50%",
            height: "50%",
          }}
        />
        <Title level={5} style={{marginTop:'10px'}}>Add Board</Title>
      </CreateBoard>
    </>
  );
}
