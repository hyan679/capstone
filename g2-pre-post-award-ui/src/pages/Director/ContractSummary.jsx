import { Descriptions, Typography, Space, Avatar, Progress } from "antd";
import { convertCurrency, getCapitalName, relativeDate } from "../../utils";

const { Title } = Typography;

export default function ContractSummary({ data, title, action }) {
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
        <Descriptions.Item label="Project Desciption">
          {data ? data.description : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Date">
          Start: {data ? `${relativeDate(data.start_date)}` : ""}
          <br />
          End: {data ? `${relativeDate(data.end_date)}` : ""}
        </Descriptions.Item>
        <Descriptions.Item label="Estimated Budget">
          <span>{convertCurrency(data.estimated_budget)}</span>
          <Progress
            percent={data.funded / data.estimated_budget}
            showInfo={false}
          />
        </Descriptions.Item>
        {/* <Descriptions.Item label="Lead Researcher">
          <Space>
            <Avatar>{getCapitalName(data.lead_researcher_name)}</Avatar>
            <span>{data.lead_researcher_name}</span>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Researchers">
          {data.group_num_info
            ? data.group_num_info.map((item) => item.user_name + ",  ")
            : null}
        </Descriptions.Item> */}
      </Descriptions>
    </>
  );
}
