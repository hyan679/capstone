import { Descriptions, Typography, Space, Avatar } from "antd";
import { getCapitalName, relativeDate } from "../../utils";

const { Title } = Typography;

export default function ApplicationSummary({ data, title, action }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "10px",
        }}
      >
        <Title level={3} style={{ textAlign: "center" }}>
          {title || ""}
        </Title>
        {action}
      </div>

      <Descriptions
        bordered={true}
        column={1}
        labelStyle={{
          fontWeight: "bold",
          width: "30%",
        }}
        contentStyle={{ backgroundColor: "#ffffff", width: "70%" }}
      >
        <Descriptions.Item label="Lead Researcher">
          <Space>
            <Avatar>{getCapitalName(data.lead_researcher_name)}</Avatar>
            <span>{data.lead_researcher_name}</span>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Researchers">
          {data.group_number
            ? data.group_number.map((item) => item.user_name + ",  ")
            : null}
        </Descriptions.Item>
        <Descriptions.Item label="Grantor">
          {data.grantor_name}
        </Descriptions.Item>
        {/* <Descriptions.Item label="First Investigator">
          Dr Example Example
        </Descriptions.Item>
        <Descriptions.Item label="Admin Org">
          USYD
        </Descriptions.Item> */}
        <Descriptions.Item label="Due Date">
          {data ? `${relativeDate(data.due_date)}` : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Project Desciption">
          {data ? data.description : ""}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}
