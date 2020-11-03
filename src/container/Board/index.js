import React, { useEffect } from "react";
import { Typography } from "antd";
import Column from "./Column";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchBoardData } from "../../redux/Board/Board.action";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
const { Title } = Typography;

const CoverColumn = styled.div`
  display: flex;
`;
const Control = styled.div`
  padding: 5px 30px;
  border: 1px solid black;
  background-color: #bbbfca;
`;
const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;
function ViewBoard(props) {
  const param = useParams();
  const color = ["rgb(156,39,176)", "rgb(0,150,136)", "rgb(233,30,99)"];
  const fetchBoardData = () => {
    props.fetchBoardData(param.boardId);
  };
  const dragEnd = (e) => {
  };
  useEffect(fetchBoardData, []);
  return (
    <>
      <Control>
        <Title level={5} style={{ margin: "0px" }}>
          {props.title}
        </Title>
      </Control>
      <CoverColumn>
        {props.isfetching ? (
          <Center>
            <img
              src="https://media0.giphy.com/media/kocrNZBTlCiQw/source.gif"
              alt="load"
            />
          </Center>

        ) : (
          <DragDropContext onDragEnd={dragEnd}>
            {props.column.map((e, i) => (
              <Column
                color={color[i]}
                key={i}
                index={i}
                isaddCard={props.isaddCard[i]}
                boardId={param.boardId}
                {...e}
              />
            ))}
          </DragDropContext>
        )}
      </CoverColumn>
    </>
  );
}
const mapStateToProps = (state) => ({
  column: state.board.column,
  isfetching: state.board.isfetching,
  isaddCard: state.board.isaddCard,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoardData: (params) => {
      dispatch(fetchBoardData(params));
    },
  };
};
const connectViewBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBoard);
export default connectViewBoard;
