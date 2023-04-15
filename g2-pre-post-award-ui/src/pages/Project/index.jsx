import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { getProjectList } from "../../apis/http";

import Header from "../../components/Header";
import Cards from "../../components/Cards";

const { Title } = Typography;

class Project extends React.Component {
  state = {
    loading: false,
    projectList: [],
    currentView: 0,
  };

  onChange = (checked) => {
    this.setState({ loading: !checked });
  };

  onChangeViewOptions = (e) => {
    this.setState({ currentView: e.target.value });
  };

  componentDidMount() {
    getProjectList()
      .then((res) => {
        console.log("Get Project List: ", res);
        this.setState({ projectList: res });
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });
  }

  render() {
    const { projectList } = this.state;

    return (
      <>
        <Title level={2}></Title>
        <Header title="My Projects"></Header>

        <Cards
          list={projectList.map((item) => ({
            id: item.project_id,
            title: item.title,
            date: item.start_date,
            budget: item.estimated_budget,
            link: `/project/home?id=${item.project_id}`,
          }))}
        ></Cards>
      </>
    );
  }
}

export default Project;
