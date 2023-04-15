import React, { useState, useEffect } from "react";

import { Row, Col, Divider, Space } from "antd";

import ApplicationManagement from "./ApplicationManagement";
import ContractManagement from "./ContractManagement";
import TasksCards from "./TaskCards";
import Header from "../../components/Header";

function DirectorHome() {
  return (
    <>
      <Header title="Administration"></Header>
      <Space direction="vertical" size="large">
        {/* top content */}

        <TasksCards></TasksCards>

        {/* bottom content */}
        <Row gutter={24}>
          <Col span={12}>
            <ApplicationManagement></ApplicationManagement>
          </Col>
          <Col span={12}>
            <ContractManagement></ContractManagement>
          </Col>
        </Row>
      </Space>
    </>
  );
}
export default DirectorHome;
