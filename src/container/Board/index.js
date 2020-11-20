import React, { useEffect, useState } from "react";
import { Typography, Button, Input, Spin, Space } from "antd";
import Column from "./Column";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  fetchBoardData,
  updateBoardRequest,
  updateBoard,
  changeIndexCard,
  setData,
  fetchBoardWithOutLoading,
} from "../../redux/Board/Board.action";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import socket from '../../services/Socket'
const { Title } = Typography;

const CoverColumn = styled.div`
  display: flex;
`;
const Control = styled.div`
  padding: 5px 30px;
  border: 1px solid black;
  background-color: #bbbfca;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
`;
function ViewBoard(props) {
  const [title, setTitle] = useState(null);
  const param = useParams();
  const color = ["rgb(156,39,176)", "rgb(0,150,136)", "rgb(233,30,99)"];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBoardData = () => {
    props.fetchBoardData(param.boardId);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchBoard =()=>{
    props.fetchBoardWithOutLoading(param.boardId);
  }
  const dragEnd = (e) => {
    const { source, destination, draggableId } = e;
    if (destination === null) return;
    props.changeIndexCard(
      { sourceId: source.droppableId, sourceIndex: source.index },
      {
        desId: destination.droppableId,
        desIndex: destination.index,
      },
      draggableId,
      param.boardId
    );
  };
 
  const requestEdit = () => {
    props.updateBoardRequest();
  };
  const onChange = (e) => {
    let value = e.target.value;
    setTitle(value);
  };
  const onSave = () => {
    if (title === null) {
      return props.updateBoardRequest();
    }
    props.updateBoard({ _id: param.boardId, title });
  };
  const onCancel = () => {
    props.updateBoardRequest();
  };
  useEffect(fetchBoardData, []);
  useEffect(()=>{
    socket.on('server-send',data=>{
      console.log(data)
      fetchBoard()
    })

  },[fetchBoard,param]);

  return (
    <>
      <Control>
        {props.isEditBoard ? (
          <>
            <Input
              defaultValue={props.currentBoard.title}
              onChange={onChange}
              style={{ maxWidth: "400px" }}
            />
            <Button
              size="small"
              type="primary"
              style={{ margin: "0px 10px" }}
              onClick={() => onSave()}
            >
              Save
            </Button>
            <Button
              size="small"
              type="ghost"
              style={{ margin: "0px 10px" }}
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Title level={5} style={{ margin: "0px" }}>
              {props.currentBoard !== null && !props.isfetching ? (
                props.currentBoard.title
              ) : (
                <Space>
                  Loading <Spin />
                </Space>
              )}
            </Title>
            {props.currentBoard !== null && !props.isfetching && (
              <Button
                size="small"
                type="ghost"
                style={{ margin: "0px 10px" }}
                onClick={() => requestEdit()}
              >
                Edit
              </Button>
            )}
          </>
        )}
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
  isEditBoard: state.board.isEditBoard,
  currentBoard: state.board.currentBoard,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoardData: (params) => {
      dispatch(fetchBoardData(params));
    },
    updateBoardRequest: () => {
      dispatch(updateBoardRequest());
    },
    updateBoard: ({ _id, title }) => {
      dispatch(updateBoard({ _id, title }));
    },
    changeIndexCard: (source, destination, cardId, boardId) => {
      dispatch(changeIndexCard(source, destination, cardId, boardId));
    },
    setData: (data) => {
      dispatch(setData(data));
    },
    fetchBoardWithOutLoading: (boardId) => {
      dispatch(fetchBoardWithOutLoading(boardId));
    },
  };
};
const connectViewBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewBoard);
export default connectViewBoard;
