import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import { Link, useLocation } from "react-router-dom";
const Headerlayout = styled.div`
  padding: 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderText = styled.h4`
  display: inline-block;
  padding: 0;
  margin: 0;
  font-size: 1.15em;
  text-transform: capitalize;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? "2px solid black" : "none")};
  &:after {
    display: block;
    content: "";
    border-bottom: 2px solid black;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
  }
  &:hover:after {
    transform: ${({ active }) => (active ? "scaleX(0)" : "scaleX(1)")};
  }
`;
const Header = () => {
  const cate = ["dashboard", "team", "analytics", "billing"];
  const { pathname } = useLocation();
  const [active, setActive] = useState(null);
  useEffect(() => {
    let path = pathname.split("/");
    if (path[1] === "") {
      setActive(0);
    } else {
      let index = cate.indexOf(path[1]);
      setActive(index);
    }
  }, [cate, pathname]);
  const onClick = (i) => {};
  return (
    <>
      <Row gutter={16}>
        <Col span={8} offset={-16}>
          <Headerlayout>
            {cate.map((e, i) => (
              <Link to={e} key={i}>
                <HeaderText
                  key={i}
                  active={active === i}
                  onClick={() => onClick(i)}
                >
                  {e}
                </HeaderText>
              </Link>
            ))}
          </Headerlayout>
        </Col>
      </Row>
    </>
  );
};

export default Header;
