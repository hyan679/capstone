import React, { useState } from "react";
import { useEffect } from "react";

import { Row, Col, Card } from "antd";

import { FolderTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { getProjectList } from "../../../apis/http";
import { relativeDate } from "../../../utils";
import Cards from "../../../components/Cards";

const { Meta } = Card;

export default function ProjectCards() {
  const history = useHistory();
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
  /* 
function handleClick(e) {
    history.push(`/director/project?id=${e}`);
  }  */

  return (
    <>
      {loading ? (
        <Card style={{ width: 400, height: 200 }} loading={loading}>
          <Meta title="Project Title" description="Project description" />
        </Card>
      ) : (
        <Cards
          list={state.map((item) => ({
            id: item.project_id,
            title: item.title,
            date: item.start_date,
            budget: item.estimated_budget,
            link: `/director/project?id=${item.project_id}`,
          }))}
        ></Cards>
      )}
    </>
  );
}
