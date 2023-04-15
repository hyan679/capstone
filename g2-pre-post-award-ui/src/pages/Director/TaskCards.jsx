import { Card, Row, Col, Divider } from "antd";
import { Link } from "react-router-dom";

import project_status from "../../assets/project_status.png";
import application_list from "../../assets/application_list.png";
import contract_list from "../../assets/contract_list.png";
import project_management from "../../assets/project_management.png";

const { Meta } = Card;

const data = [
  {
    title: "Project status",
    pic: project_status,
    linkto: "/director/projects",
  },
  {
    title: "Application List",
    pic: application_list,
    linkto: "/director/applications",
  },
  {
    title: "Contract List",
    pic: contract_list,
    linkto: "/director/contracts",
  },
  {
    title: "Project Management",
    pic: project_management,
    linkto: "/director/pm",
  },
];

export default function TasksCards() {
  return (
    <>
      <Row gutter={[24, 24]}>
        {data.map((x, i) => (
          <Col key={i} span={6}>
            <Link to={data[i].linkto}>
              <Card
                hoverable
                style={{ width: 250, height: 250 }}
                cover={
                  <img
                    alt="example"
                    src={data[i].pic}
                    style={{ height: 180 }}
                  />
                }
              >
                <Meta title={data[i].title} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
