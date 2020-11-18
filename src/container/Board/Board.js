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
  _id,
  setCurrentBoard,
  onDelete,
  onShare,
  Public,
  ...props
}) {
  return (
    <Link
      to={{
        pathname: `/board/${_id}`,
      }}
    >
      <Card
        title={props.title}
        style={{ minWidth: "240px", margin: "10px" }}
        hoverable={true}
        actions={[
          <CopyOutlined
            key="edit"
            style={{ color: "blue" }}
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
            style={{color:'rgb(233, 30, 99)'}}
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
            {Public?"Public":"Private"}
          </Col>
        </Row>
      </Card>
    </Link>
  );
}

export default Board;
