import React from 'react'
import styled from "styled-components";

const Alignright = styled.div`
  display: flex;
  justify-content:flex-end;
  align-items:center;
`;
export default function AlignRight({children}) {
    return (
        <Alignright>
            {children}
        </Alignright>
    )
}
