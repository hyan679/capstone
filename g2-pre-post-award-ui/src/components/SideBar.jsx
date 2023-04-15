import React from "react";

import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

function renderMenu(menu) {
  if (menu.components && menu.components.length) {
    return (
      <SubMenu key={menu.id} title={menu.name} icon={menu.icon || null}>
        {menu.components.map((menu) => renderMenu(menu))}
      </SubMenu>
    );
  } else {
    return (
      <Menu.Item key={menu.id} icon={menu.icon}>
        {menu.url ? <Link to={menu.url}>{menu.name}</Link> : menu.name}
      </Menu.Item>
    );
  }
}

class Sidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  onSelectMenu = (e) => {
    console.log("[Sidebar] Select: ", e);
  };

  render() {
    const { collapsed } = this.state;
    const { title } = this.props;
    console.info("[Menu] Update menu: ", this.props.menu);
    return (
      <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <span
          style={{
            fontSize: "18px",
            color: "#ddd",
            paddingLeft: "20px",
            lineHeight: "1",
          }}
        >
          {title}
        </span>
        <Menu
          theme="dark"
          mode="vertical"
          onClick={this.handleClick}
          key={this.props.menu.length}
          onSelect={this.onSelectMenu}
        >
          {this.props.menu.map((menu) => renderMenu(menu))}
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;
