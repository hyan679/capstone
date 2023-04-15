import { useEffect, useState } from "react";
import { List, Button, Skeleton, Typography, Space, Tag } from "antd";

import {
  BankOutlined,
  DollarCircleOutlined,
  FieldTimeOutlined,
  FolderOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router";
import { convertCurrency, relativeDate } from "../../utils";
import { getApplicationTask } from "../../apis/http";
import ApproverStatusLabel from "../../components/ApproverStatusLabel";
import StatusLabel from "../../components/StatusLabel";

const { Text } = Typography;

export default function ApplicationTasks() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [applicationList, setApplicationList] = useState([]);

  useEffect(() => {
    setLoading(true);
    getApplicationTask()
      .then((res) => {
        setApplicationList(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function viewApplication(item) {
    history.push(`approver/application?id=${item.application_id}`);
  }

  return (
    <div style={{ backgroundColor: "#fff", padding: "5px 15px " }}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={applicationList}
        renderItem={(item) =>
          console.log(item) || (
            <List.Item
              // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
              onClick={() => viewApplication(item)}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={
                    <>
                      <div>
                        <Space>
                          <FolderOutlined />
                          <span
                            style={{
                              fontSize: 20,
                              marginLeft: 10,
                            }}
                          >
                            {item.title}
                          </span>
                          <ApproverStatusLabel
                            value={item.app_status}
                          ></ApproverStatusLabel>
                        </Space>
                      </div>

                      <StatusLabel
                        value={item.app_state}
                        showProgress
                      ></StatusLabel>
                    </>
                  }
                  description={
                    <>
                      <Space size="large">
                        <Tag color="#2db7f5">
                          <FieldTimeOutlined />
                          <span style={{ marginLeft: 3 }}>
                            Due Time: {relativeDate(item.due_date)}
                          </span>
                        </Tag>

                        <Text type="danger">
                          <DollarCircleOutlined />
                          <span style={{ marginLeft: 3 }}>
                            Budget: {convertCurrency(item.funded)}
                          </span>
                        </Text>

                        <Text type="secondary">
                          <BankOutlined />
                          <span style={{ marginLeft: 3 }}>
                            Grantor: {item.grantor_name}
                          </span>
                        </Text>
                      </Space>
                      <div style={{ marginTop: 8 }}>{item.description}</div>
                    </>
                  }
                />
                <Button type="link">View</Button>
              </Skeleton>
            </List.Item>
          )
        }
      />
    </div>
  );
}
