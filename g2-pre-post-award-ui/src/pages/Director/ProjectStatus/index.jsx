import React, { useState } from "react";
import { useEffect } from "react";

import { Table } from "antd";

import Header from "../../../components/Header";
import StatusLabel from "../../../components/StatusLabel";
import { getProjectList } from "../../../apis/http";
import { relativeDate } from "../../../utils";

const { Column } = Table;

function ProjectStatus() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectList()
      .then((res) => {
        console.log("Get Project List: ", res);
        setState(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header title="Project Status"></Header>

      <Table dataSource={state} loading={loading}>
        <Column title="Project" dataIndex="title" />
        <Column
          title="Date"
          dataIndex="start_date"
          render={(start_date) => relativeDate(start_date)}
        />
        <Column
          title="Application Status"
          dataIndex="app_state"
          render={(app_state) => <StatusLabel value={app_state}></StatusLabel>}
        />
        <Column
          title="Agreement Status"
          dataIndex="agr_state"
          render={(agr_state) => <StatusLabel value={agr_state}></StatusLabel>}
        />
      </Table>
    </>
  );
}

export default ProjectStatus;
