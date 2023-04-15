import React from "react";
import { Link } from "react-router-dom";
import { getCapitalName, getUserInfo } from "../utils";

import SideBar from "./SideBar";

import { Layout, Dropdown, Menu, Avatar, Space, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.routes = props.routes;
    this.menu = props.menu;
  }

  getInfo(attr) {
    const info = getUserInfo();
    return attr in info ? info[attr] : "";
  }

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: "0 10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              <span
                style={{
                  fontSize: "30px",
                  color: "#ddd",
                  paddingLeft: "10px",
                  fontWeight: "600",
                }}
              >
                Searten
              </span>
              <span
                style={{ color: "#ccc", marginLeft: "5px", fontWeight: "400" }}
              >
                {this.getInfo("user_role")}
              </span>
            </span>
            <div>
              <Dropdown
                overlay={
                  <>
                    <div
                      style={{
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "left",
                        padding: "10px",
                      }}
                    >
                      {this.getInfo("organization")}
                      <Tag>{this.getInfo("user_role")}</Tag>
                    </div>
                    <Menu>
                      <Menu.Item key="logout">
                        <Link to="/">Logout</Link>
                      </Menu.Item>
                    </Menu>
                  </>
                }
              >
                <div style={{ color: "#ddd" }}>
                  <Space>
                    <Avatar>{getCapitalName(this.getInfo("user_name"))}</Avatar>
                    <span>{this.getInfo("user_name")}</span>
                    <DownOutlined />
                  </Space>
                </div>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Layout className="site-layout">
          <Sider>{this.menu}</Sider>
          <Content style={{ margin: "16px" }}>{this.routes}</Content>
          {/* <Footer
            style={{ textAlign: "center" }}
          >
            Searten ©2021 Created by Pre/Post Award Team
          </Footer> */}
        </Layout>
      </Layout>
    );
  }
}

export default MainLayout;
