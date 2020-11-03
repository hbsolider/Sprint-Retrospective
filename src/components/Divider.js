import React from "react";
import styled from "styled-components";
const Divi = styled.div`
  height: 10px;
  border-radius: 10px;
  background-color: ${(props) => props.color || "white"};
`;
export default function Divider() {
  return <Divi></Divi>;
}
