import React from "react";
import { Row, Col, Calendar, Divider, Space } from "antd";

import Header from "../../../components/Header";
import ProjectCards from "./ProjectCards";

class ProjectManagement extends React.Component {
  render() {
    return (
      <>
        <Header title="Project Management"></Header>
        <ProjectCards></ProjectCards>
      </>
    );
  }
}

export default ProjectManagement;
