import React, { useState } from "react";
import { Typography, Tabs } from "antd";

import ApplicationTasks from "./ApplicationTasks";
import ContractTasks from "./ContractTasks";
import Header from "../../components/Header";

const { Title } = Typography;

export default function ApproverHome() {
  const [tab, setTab] = useState("application");
  const { TabPane } = Tabs;
  return (
    <>
      <Header title="Tasks To Be Approved"></Header>
      <Tabs
        defaultActiveKey="application"
        centered
        tabBarGutter={300}
        tabBarStyle={{ fontWeight: "bold" }}
        size="large"
        onChange={(e) => {
          setTab(e);
        }}
      >
        <TabPane tab="Application" key="application">
          <ApplicationTasks></ApplicationTasks>
        </TabPane>
        <TabPane tab="Contract" key="contract">
          <ContractTasks></ContractTasks>
        </TabPane>
      </Tabs>
    </>
  );
}
