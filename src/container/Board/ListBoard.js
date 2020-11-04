import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Board from "./Board";
import * as BoardAction from "../../redux/Board/Board.action";
import { connect } from "react-redux";
import { Modal, Input } from "antd";
import copy from 'copy-to-clipboard';
const Center = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
`;
const AddBoard = styled.div`
  height: 133px;
  width: 240px;
  border: 2px dashed black;
  padding: 20px;
  margin: 10px;
  &:hover {
    border: 2px dashed rgb(233, 30, 99);
  }
  &:hover div {
    color: rgb(233, 30, 99);
  }
  cursor: pointer;
`;
const List = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  flex-wrap: wrap;
`;
const ListBoard = (props) => {
  const [titleBoard, setTitle] = useState(null);
  const visibleAddBoard = () => {
    props.changeVisible();
  };
  const onCancel = () => {
    props.changeVisible();
  };
  const onChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const onOk = () => {
    if (titleBoard !== null) {
      props.addBoard(titleBoard);
    }
  };
  const onDelete = (_id) => {
    props.deleteBoard(_id)
    props.fetchBoard()
  };
  const onShare =(_id)=>{
    console.log(props)
    const url = `${window.location.href}/board/${_id}`
    copy(url)
    props.publicBoard(_id)
  }
  useEffect(props.fetchBoard, []);
  return (
    <List>
      <AddBoard onClick={visibleAddBoard}>
        <Center>
          <img
            src="https://img.icons8.com/ios/452/add-list.png"
            alt="add"
            style={{ height: 50, width: 50 }}
          />
          <div>Add board</div>
        </Center>
      </AddBoard>
      <Modal
        visible={props.visibleAdd}
        title="Add board"
        onCancel={onCancel}
        onOk={onOk}
        confirmLoading={props.creating}
      >
        <Input onChange={onChange} />
      </Modal>
      {props.listBoard.map((e, i) => (
        <Board {...e} key={i} onDelete={()=>onDelete(e._id)} onShare={()=>onShare(e._id)}/>
      ))}
    </List>
  );
};
const mapStateToProps = (state) => ({
  listBoard: state.board.listBoard,
  visibleAdd: state.board.visibleAdd,
  creating: state.board.creating,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoard: () => {
      dispatch(BoardAction.fetchBoard());
    },
    changeVisible: () => {
      dispatch(BoardAction.changeVisibleAdd());
    },
    addBoard: (title) => {
      dispatch(BoardAction.addBoard(title));
    },
    deleteBoard:(_id)=>{
      dispatch(BoardAction.deleteBoard({_id}))
    },
    publicBoard:_id=>{
      dispatch(BoardAction.publicBoard(_id))
    }
  };
};
const listBoardConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBoard);
export default listBoardConnect;
