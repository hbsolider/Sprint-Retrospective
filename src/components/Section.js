import React from 'react'
import styled from 'styled-components'
const SectionLayout = styled.div`
    margin-top:20px;
    width:100%;
`;
export default function Section({children, ...props}) {
    return (
        <SectionLayout {...props}>
            {children}
        </SectionLayout>
    )
}
