import React from "react";
import { Col, Avatar, Descriptions, Tooltip, Spin } from "antd";

import StatusLabel from "./StatusLabel";
import { getCapitalName, relativeDate } from "../utils";

class InfoTable extends React.Component {
  render() {
    const { list } = this.props;

    return list && list.project_id ? (
      <Descriptions
        bordered={true}
        column={2}
        labelStyle={{
          fontWeight: "bold",
          fontSize: 16,
        }}
        contentStyle={{ backgroundColor: "#ffffff", fontSize: 16 }}
      >
        <Descriptions.Item label="Project Name" span={2}>
          {list.title || ""}
        </Descriptions.Item>
        <Descriptions.Item label="Project Members" span={2}>
          <Avatar.Group size="large">
            {list && list.group_num_info
              ? list.group_num_info.map((item, index) => (
                  <Tooltip
                    key={item.user_id}
                    title={item.user_name}
                    placement="top"
                  >
                    <Avatar key={index}>
                      {getCapitalName(item.user_name)}
                    </Avatar>
                  </Tooltip>
                ))
              : null}
          </Avatar.Group>
        </Descriptions.Item>
        <Descriptions.Item label="Start/End Date" span={2}>
          {relativeDate(list.start_date)} ~ {relativeDate(list.end_date)}
        </Descriptions.Item>
        <Descriptions.Item label="Application Status" span={2}>
          <StatusLabel value={list.app_state} showProgress></StatusLabel>
        </Descriptions.Item>
        <Descriptions.Item label="Contract Status" span={2}>
          <StatusLabel value={list.agr_state} showProgress></StatusLabel>
        </Descriptions.Item>
        <Descriptions.Item label="Project Desciption" span={2}>
          {list.description || ""}
        </Descriptions.Item>
      </Descriptions>
    ) : (
      <Spin />
    );
  }
}
export default InfoTable;
