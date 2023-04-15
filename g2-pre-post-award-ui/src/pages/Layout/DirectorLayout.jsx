import React from "react";
import { Route, Link, useHistory, withRouter } from "react-router-dom";

import { Menu } from "antd";

import {
  FileOutlined,
  TeamOutlined,
  FundProjectionScreenOutlined,
  DashboardOutlined,
  SolutionOutlined,
  FolderOutlined,
} from "@ant-design/icons";

import MainLayout from "../../components/MainLayout";

import DirectorHome from "../Director";
import ProjectStatus from "../Director/ProjectStatus";
import ApplicationList from "../Director/ApplicationList";
import ContractList from "../Director/ContractList";
import ProjectManagement from "../Director/ProjectManagement";

import ProjectInfo from "../Common/ProjectInfo";
import ApplicationInfo from "../Common/ApplicationInfo";
import ContractInfo from "../Common/ContractInfo";
import Permission from "../Common/Permission";

function DirectorLayout() {
  // const history = useHistory();
  // function selectMenu(e) {
  //   console.log(e);
  // }

  return (
    <MainLayout
      menu={
        <>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["/director"]}
            // selectedKeys={[history.location.pathname]}
          >
            <Menu.Item key="/director" icon={<DashboardOutlined />}>
              <Link to="/director">Dashboard</Link>
            </Menu.Item>
            <Menu.Item
              key="/director/projects"
              icon={<FundProjectionScreenOutlined />}
            >
              <Link to="/director/projects">Project Status</Link>
            </Menu.Item>
            <Menu.Item key="/director/applications" icon={<FileOutlined />}>
              <Link to="/director/applications">Applications Status</Link>
            </Menu.Item>
            <Menu.Item key="/director/contracts" icon={<SolutionOutlined />}>
              <Link to="/director/contracts">Contracts Status</Link>
            </Menu.Item>
            <Menu.Item key="/director/pm" icon={<FolderOutlined />}>
              <Link to="/director/pm">Project Management</Link>
            </Menu.Item>
          </Menu>
        </>
      }
      routes={
        <>
          <Route exact path="/director">
            <DirectorHome></DirectorHome>
          </Route>
          <Route exact path="/director/projects">
            <ProjectStatus></ProjectStatus>
          </Route>
          <Route exact path="/director/applications">
            <ApplicationList></ApplicationList>
          </Route>
          <Route exact path="/director/contracts">
            <ContractList></ContractList>
          </Route>
          <Route exact path="/director/pm">
            <ProjectManagement></ProjectManagement>
          </Route>

          <Route exact path="/director/project">
            <ProjectInfo></ProjectInfo>
          </Route>
          <Route exact path="/director/application">
            <ApplicationInfo></ApplicationInfo>
          </Route>
          <Route exact path="/director/contract">
            <ContractInfo></ContractInfo>
          </Route>
          <Route exact path="/director/permission">
            <Permission></Permission>
          </Route>
        </>
      }
    ></MainLayout>
  );
}

export default withRouter(DirectorLayout);
