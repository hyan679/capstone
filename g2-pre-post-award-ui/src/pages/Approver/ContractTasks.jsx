import { useEffect, useState } from "react";
import { List, Button, Skeleton, Typography, Space, Tag } from "antd";

import {
  BankOutlined,
  DollarOutlined,
  FieldTimeOutlined,
  FolderOutlined,
} from "@ant-design/icons";

import { useHistory } from "react-router";
import { convertCurrency, relativeDate } from "../../utils";
import { getContractTask } from "../../apis/http";
import ApproverStatusLabel from "../../components/ApproverStatusLabel";
import StatusLabel from "../../components/StatusLabel";

const { Text } = Typography;

export default function ContractTasks() {
  const history = useHistory();
  const [contractList, setContractList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getContractTask()
      .then((res) => {
        setContractList(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function viewContract(item) {
    history.push(`approver/contract?id=${item.agreement_id}`);
  }

  return (
    <div style={{ backgroundColor: "#fff", padding: "5px 15px" }}>
      <List
        className="demo-loadmore-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={contractList}
        renderItem={(item) =>
          console.log(item) || (
            <List.Item onClick={() => viewContract(item)}>
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
                            value={item.agr_status}
                          ></ApproverStatusLabel>
                        </Space>
                      </div>

                      <StatusLabel
                        value={item.agr_state}
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
                          <DollarOutlined />
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
