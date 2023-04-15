import React, { useEffect, useState } from "react";
import { Route, Link, useHistory, withRouter } from "react-router-dom";
import { Menu } from "antd";

import { getProjectList } from "../../apis/http";

import {
  DesktopOutlined,
  HomeOutlined,
  FileOutlined,
  TeamOutlined,
  ProjectOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

import MainLayout from "../../components/MainLayout";

import Project from "../Project";

import ProjectInfo from "../Common/ProjectInfo";
import ApplicationInfo from "../Common/ApplicationInfo";
import ContractInfo from "../Common/ContractInfo";
import Permission from "../Common/Permission";

const { SubMenu } = Menu;

function ResearcherLayout() {
  const [projectList, setProjectList] = useState([]);
  useEffect(() => {
    getProjectList().then((res) => {
      setProjectList([...res]);
    });
  }, []);

  function renderMenu() {
    if (projectList && projectList.length > 0) {
      let menus = [];
      for (let project of projectList) {
        menus.push(
          <Menu.Item
            key={`/project/home?id=${project.project_id}`}
            icon={<FileOutlined />}
          >
            {project.title}
          </Menu.Item>
          // <Menu.Item
          //   key={`/project/home?id=${project.project_id}`}
          //   title={project.title}
          //   icon={<ProjectOutlined />}
          // >
          //   <Menu.Item
          //     icon={<HomeOutlined />}
          //   >
          //     Home
          //   </Menu.Item>
          //   <Menu.Item
          //     key={`/project/application?id=${project.application_id}`}
          //     icon={<FileOutlined />}
          //   >
          //     Application
          //   </Menu.Item>
          //   <Menu.Item
          //     key={`/project/contract?id=${project.agreement_id}`}
          //     icon={<DesktopOutlined />}
          //   >
          //     Contract
          //   </Menu.Item>
          //   <Menu.Item
          //     key={`/project/permission?id=${project.project_id}`}
          //     icon={<TeamOutlined />}
          //   >
          //     Permission
          //   </Menu.Item>
          // </Menu.Item>
        );
      }
      return menus;
    } else {
      return "";
    }
  }

  return (
    <MainLayout
      menu={
        <>
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={["/project"]}
            // selectedKeys={[history.location.pathname]}
          >
            <Menu.Item key="/project" icon={<DashboardOutlined />}>
              <Link to="/project">Dashboard</Link>
            </Menu.Item>
            {renderMenu()}
          </Menu>
        </>
      }
      routes={
        <>
          <Route exact path="/project">
            <Project></Project>
          </Route>
          <Route exact path="/project/home">
            <ProjectInfo></ProjectInfo>
          </Route>
          <Route exact path="/project/application">
            <ApplicationInfo></ApplicationInfo>
          </Route>
          <Route exact path="/project/contract">
            <ContractInfo></ContractInfo>
          </Route>
          <Route exact path="/project/permission">
            <Permission></Permission>
          </Route>
        </>
      }
    ></MainLayout>
  );
}

export default withRouter(ResearcherLayout);
