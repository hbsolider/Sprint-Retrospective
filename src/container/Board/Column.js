import React, { useEffect, useState, useRef } from "react";
import { PlusOutlined, HighlightOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { Button, Input, message } from "antd";
import CardView from "../../components/CardView";
import { connect } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import {
  addCard,
  addCardRequest,
  addCardCancelRequest,
  updateCard,
  deleteCard,
} from "../../redux/Board/Board.action";
const ColumnName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.25em;
  font-weight: 500;
`;
const HeaderColumn = ({ color, width, title, onClick }) => {
  return (
    <>
      <ColumnName>
        <HighlightOutlined style={{ color }} />
        <div>{title}</div>
      </ColumnName>

      <Button
        style={{ width: "100%", color }}
        icon={<PlusOutlined />}
        onClick={onClick}
      ></Button>
    </>
  );
};
const BodyColumn = ({ color, card, _id, ...props }) => {
  const [isEdit, setEdit] = useState(null);
  const onClick = (i) => {
    setEdit(i);
  };
  const onDelete = async (_id, columnId) => {
    try {
      props.deleteCard({ _id }, columnId, props.boardId);
      setEdit(null);
    } catch (error) {
      console.log(error);
      setEdit(null);
    }
  };
  const onSave = async (value, _id) => {
    message
      .loading("Action in progress..", 2.5)
      .then(() => {
        props.updateCard({ _id, title: value }, props.boardId);
      })
      .then(() => {
        setEdit(null);
      });
  };
  const onCancel = () => {
    setEdit(null);
  };
  return (
    <>
      {card.map((e, i) => {
        return (
          <Draggable draggableId={e._id+''} index={i} key={e._id+i}>
            {(provided) => (
              <div
                key={e + i}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                {...provided.draggableProps}
              >
                <CardView
                  title={e.title}
                  color={color}
                  onClick={() => onClick(i)}
                  isEdit={isEdit === i}
                  onDelete={() => onDelete(e._id, _id)}
                  onSave={(value) => onSave(value, e._id)}
                  onCancel={() => onCancel()}
                />
              </div>
            )}
          </Draggable>
        );
      })}
    </>
  );
};
const LayColumn = styled.div`
  width: 100%;
  min-height: 20px;
  margin: 5px 20px;
`;
const LayoutText = styled.div`
  padding: 5px;
  border: 2px solid black;
`;
const ControlAdd = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const Column = (props) => {
  const [width, setWidth] = useState(0);
  const [card, setCard] = useState(null);
  const ref = useRef();
  const onClick = () => {
    props.addCardRequest(props.index);
  };
  useEffect(() => {
    if (typeof ref.current !== "undefined") {
      setWidth(ref.current.offsetWidth);
    }
  }, [width]);
  const onAddCard = () => {
    const columnId = props._id;
    const title = card;
    if (title) {
      props.addCard(props.index, { columnId, title }, props.boardId);
    }
  };
  const onAddCardCancel = () => {
    props.addCardCancelRequest(props.index);
  };
  return (
    <LayColumn ref={ref}>
      <HeaderColumn {...props} onClick={onClick} />
      {props.isaddCard && (
        <LayoutText>
          <Input
            style={{
              width: width,
              wordWrap: "break-word",
              wordBreak: "break-all",
            }}
            onChange={(e) => {
              setCard(e.target.value);
            }}
          />
          <ControlAdd>
            <Button type="default" onClick={onAddCardCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={onAddCard}>
              Add
            </Button>
          </ControlAdd>
        </LayoutText>
      )}
      <Droppable droppableId={props._id+''}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <BodyColumn {...props} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </LayColumn>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => {
  return {
    addCard: (i, { columnId, title }, boardId) => {
      dispatch(addCard(i, { columnId, title }, boardId));
    },
    addCardRequest: (index) => {
      dispatch(addCardRequest(index));
    },
    addCardCancelRequest: (index) => {
      dispatch(addCardCancelRequest(index));
    },
    updateCard: ({ _id, title }, boardId) => {
      dispatch(updateCard({ _id, title }, boardId));
    },
    deleteCard: ({ _id }, columnId, boardId) => {
      dispatch(deleteCard({ _id }, columnId, boardId));
    },
  };
};
const connectColumn = connect(mapStateToProps, mapDispatchToProps)(Column);
export default connectColumn;
