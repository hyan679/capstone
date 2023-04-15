import React from "react";

import { Link } from "react-router-dom";
import { Card, Avatar, Col, Row } from "antd";
import { FolderTwoTone } from "@ant-design/icons";

import { convertCurrency, relativeDate } from "../utils";

class Cards extends React.Component {
  render() {
    const { list } = this.props;
    return (
      <Row gutter={16}>
        {list.map((item) => (
          <Col key={item.id} span={8}>
            <Card
              title={
                <>
                  <FolderTwoTone style={{ fontSize: 20 }} />
                  <span style={{ marginLeft: 6, fontWeight: "bold" }}>
                    {item.title}
                  </span>
                </>
              }
              bodyStyle={{ backgroundColor: "#F0FFFF" }}
              headStyle={{ backgroundColor: "#ADD8E6" }}
              actions={[<Link to={item.link}>View</Link>]}
              hoverable
              style={{ marginBottom: "10px" }}
            >
              <p style={{ fontWeight: "bold" }}>
                Create Date:{" "}
                <span style={{ marginLeft: 6, fontWeight: "normal" }}>
                  {relativeDate(item.date)}
                </span>
              </p>
              <p style={{ fontWeight: "bold" }}>
                Budget:
                <span style={{ marginLeft: 8, fontWeight: "normal" }}>
                  {convertCurrency(item.budget)}
                </span>
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default Cards;
