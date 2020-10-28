import React, { useEffect } from "react";
import styled from "styled-components";
import Board from "./Board";
import AddBoard from "./AddBoard";
import { fetchBoard } from "../../redux/Board/Board.action";
import { connect } from "react-redux";

const List = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  justify-content:flex-start;
  flex-wrap:wrap;
`;
const ListBoard = (props) => {
  useEffect(props.fetchBoard, []);
  return (
    <List>
      <AddBoard />
      {props.listBoard.map((e, i) => (
        <Board {...e} key={i} />
      ))}
    </List>
  );
};
const mapStateToProps = (state) => ({
  listBoard: state.board.listBoard,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBoard: () => {
      dispatch(fetchBoard());
    },
  };
};
const listBoardConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBoard);
export default listBoardConnect;
