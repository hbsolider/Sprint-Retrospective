import React from "react";
import moment from 'moment'
import { Card, Row, Col, Space } from "antd";
import {
  ClockCircleOutlined,
  SettingOutlined,
  EditOutlined,
} from "@ant-design/icons";
function Board({ dayCreated, cardAmount, ...props }) {
  return (
      <Card
        title={props.title}
        style={{ minWidth: "250px", border: "1px solid black",margin:'10px' }}
        hoverable={true}
        actions={[
          <EditOutlined key="edit" />,
          <SettingOutlined key="setting" />,
        ]}
        size="small"
      >
        <Row gutter={16}>
          <Col span={14}>
            <Space>
              <ClockCircleOutlined />
              {moment(dayCreated).format('DD/MM/YYYY') || "a few second"}
            </Space>
          </Col>
          <Col span={10} style={{ textAlign: "end" }}>
            {cardAmount || "process"}
          </Col>
        </Row>
      </Card>
  );
}

export default Board;
