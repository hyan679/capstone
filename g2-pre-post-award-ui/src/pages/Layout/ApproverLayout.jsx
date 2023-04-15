import React from "react";

import { Route, Link, withRouter } from "react-router-dom";

import { HomeOutlined } from "@ant-design/icons";

import { Menu } from "antd";

import MainLayout from "../../components/MainLayout";

import ApproverHome from "../Approver";
import ApproveApplication from "../Approver/ApproveApplication";
import ApproveContract from "../Approver/ApproveContract";

import ProjectInfo from "../Common/ProjectInfo";
import ApplicationInfo from "../Common/ApplicationInfo";
import ContractInfo from "../Common/ContractInfo";

function DirectorLayout() {
  return (
    <MainLayout
      menu={
        <>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["/approver"]}
            // selectedKeys={[history.location.pathname]}
          >
            <Menu.Item key="/approver" icon={<HomeOutlined />}>
              <Link to="/approver">Home</Link>
            </Menu.Item>
          </Menu>
        </>
      }
      routes={
        <>
          <Route exact path="/approver">
            <ApproverHome></ApproverHome>
          </Route>

          <Route exact path="/approver/project">
            <ProjectInfo></ProjectInfo>
          </Route>
          <Route exact path="/approver/application">
            <ApproveApplication></ApproveApplication>
          </Route>
          <Route exact path="/approver/contract">
            <ApproveContract></ApproveContract>
          </Route>
        </>
      }
    ></MainLayout>
  );
}

export default DirectorLayout;
