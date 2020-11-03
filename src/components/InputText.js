import React from "react";
import styled from "styled-components";
const Text = styled.p`
  padding: 8px;
  user-modify: read-write;
  resize: both;
  overflow-wrap: break-word;
  &::focus {
    outline: none;
    border:none;
  }
`;
const InputText = (props) => {
  console.log(props)
  return <Text {...props} style={{ width: props.width }} />;
};

export default InputText;
