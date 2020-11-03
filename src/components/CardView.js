import React, { useState } from "react";
import styled from "styled-components";
import {
  FormOutlined,
  DeleteOutlined,
  CloseCircleOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Input, Tooltip } from "antd";
const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 8px;
  background-color: ${(props) => props.color || "white"};
  color: white;
  min-height: 60px;
  margin-top: 8px;
`;
const Coll = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
export default function CardView({
  color,
  title,
  onClick,
  isEdit,
  onDelete,
  onCancel,
  onSave,
}) {
  const [value, setValue] = useState(title);
  return (
    <Layout color={color}>
      {isEdit ? (
        <Input
          defaultValue={title}
          style={{ margin: "0px 5px 0px 0px" }}
          onChange={(e) => {
            const value = e.target.value;
            setValue(value);
          }}
        />
      ) : (
        <div>{title}</div>
      )}
      {isEdit ? (
        <Coll>
          <Tooltip placement="top" title="Cancel edit">
            <CloseCircleOutlined onClick={onCancel} />
          </Tooltip>
          <Tooltip placement="bottom" title="Save ?">
            <SaveOutlined onClick={() => {
              onSave(value)
            }} />
          </Tooltip>
        </Coll>
      ) : (
        <Coll>
          <Tooltip placement="top" title="Click to edit">
            <FormOutlined onClick={onClick} />
          </Tooltip>
          <Tooltip placement="bottom" title="Delete this card">
            <DeleteOutlined onClick={onDelete} />
          </Tooltip>
        </Coll>
      )}
    </Layout>
  );
}
