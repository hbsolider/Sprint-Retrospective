import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { Card, Row, Col, Space } from "antd";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  CopyOutlined,
} from "@ant-design/icons";

function Board({
  dayCreated,
  cardAmount,
  _id,
  setCurrentBoard,
  onDelete,
  onShare,
  ...props
}) {
  return (
    <Link
      to={{
        pathname:`/board/${_id}`,
      }}
    >
      <Card
        title={props.title}
        style={{ minWidth: "240px", border: "1px solid black", margin: "10px" }}
        hoverable={true}
        actions={[
          <CopyOutlined
            key="edit"
            style={{ zIndex: 100 }}
            onClick={(e) => {
              e.preventDefault();
              onShare();
            }}
          />,
          <DeleteOutlined
            key="setting"
            onClick={(e) => {
              e.preventDefault();
              onDelete();
            }}
          />,
        ]}
        size="small"
      >
        <Row gutter={16}>
          <Col span={14}>
            <Space>
              <ClockCircleOutlined />
              {moment(dayCreated).format("DD/MM/YYYY") || "a few second"}
            </Space>
          </Col>
          <Col span={10} style={{ textAlign: "end" }}>
            {cardAmount || "process"}
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default Board;
