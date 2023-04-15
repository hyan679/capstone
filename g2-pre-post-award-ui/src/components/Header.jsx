import React from "react";
import { Row, Col, Typography, Button } from "antd";

import { ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router";

const { Title } = Typography;

export default function Header({ title, actions, showBack }) {
  let history = useHistory();
  function onClickBack() {
    history.goBack();
  }

  return (
    <Row style={{ paddingBottom: "10px" }}>
      <Col flex="auto">
        <div style={{ display: "flex" }}>
          {showBack ? (
            <Button
              shape="circle"
              icon={<ArrowLeftOutlined />}
              size="large"
              style={{ marginRight: "10px" }}
              onClick={onClickBack}
            ></Button>
          ) : null}
          <Title level={2}>{title}</Title>
        </div>
      </Col>
      <Col>{actions}</Col>
    </Row>
  );
}
