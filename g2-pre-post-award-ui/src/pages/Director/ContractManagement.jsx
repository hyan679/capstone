import React, { useState, useEffect } from "react";
import {
  List,
  Badge,
  Space,
  Drawer,
  Button,
  Spin,
  Divider,
  message,
  Switch,
} from "antd";
import { Link } from "react-router-dom";

import {
  assignContractApprover,
  deleteContractApprover,
  getAgreementList,
  getContract,
  getProjectInfo,
} from "../../apis/http";

import ContractSummary from "./ContractSummary";
import ApproverAssign from "./ApproverAssign";

export default function ContractManagement() {
  const [visible, setVisible] = useState(false);
  const [projectInfo, setProjectInfo] = useState({});
  const [contractInfo, setContractInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [newAgreementList, setNewAgreementList] = useState([]);
  const [drawerLoading, setDrawerLoading] = useState(false);

  useEffect(() => {
    initTable(1);
  }, []);

  function initTable(status) {
    setLoading(true);
    getAgreementList(status)
      .then((res) => {
        setNewAgreementList(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }

  async function openAgreementPreview(id) {
    setVisible(true);
    setDrawerLoading(true);

    try {
      const resProjectInfo = await getProjectInfo(id);
      setProjectInfo(resProjectInfo);
      setDrawerLoading(false);

      const resContractInfo = await getContract(resProjectInfo.agreement_id);
      setContractInfo(resContractInfo);
    } catch {
      message.error("Fail to load project information");
    }
  }

  function onSubmitApprover({ user_id, permission }) {
    assignContractApprover(projectInfo.agreement_id, user_id, permission)
      .then((res) => {
        message.success("Approvers assigned");
        setVisible(false);
      })
      .catch((err) => {
        message.error("Fail to assign approver");
      });
  }

  function onDeleteApprover(userId) {
    deleteContractApprover(projectInfo.agreement_id, userId)
      .then((res) => {
        message.success("Approver is removed");
      })
      .catch((err) => {
        message.error("Fail to remove approver");
      });
  }

  function toggleSwitch(e) {
    const status = e === true ? 1 : null;
    initTable(status);
  }

  return (
    <>
      <Divider orientation="left">
        <Space>
          <span
            style={{
              fontSize: 20,
              color: "#191970",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            Contract
          </span>
          <Badge count={newAgreementList.length} />
        </Space>
      </Divider>
      <List
        size="small"
        loading={loading}
        header={
          <div>
            <span style={{ fontSize: 14, fontWeight: "bold" }}>
              Set Approvers
            </span>
            <span style={{ float: "right" }}>
              New <Switch size="small" defaultChecked onChange={toggleSwitch} />
            </span>
          </div>
        }
        bordered
        style={{ backgroundColor: "#FFFFFF" }}
        dataSource={newAgreementList}
        renderItem={(item) => (
          <List.Item
            key={item.agreement_id}
            actions={[
              <Button
                type="primary"
                onClick={() => openAgreementPreview(item.project_id)}
                key={`a-${item.agreement_id}`}
              >
                SET
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.title} />
          </List.Item>
        )}
      />

      <Drawer
        title="Assign Contract Approver"
        width={640}
        placement="right"
        onClose={() => setVisible(false)}
        visible={visible}
        destroyOnClose
      >
        {drawerLoading ? (
          <Spin></Spin>
        ) : (
          <div>
            <ContractSummary
              title={projectInfo.title}
              data={projectInfo}
              action={
                <Link to={`/director/project?id=${projectInfo.project_id}`}>
                  <Button
                    disabled={!projectInfo.application_id}
                    size="large"
                    type="primary"
                  >
                    View Project
                  </Button>
                </Link>
              }
            ></ContractSummary>

            <ApproverAssign
              approver={contractInfo.approver}
              onSubmit={onSubmitApprover}
              onDelete={onDeleteApprover}
            ></ApproverAssign>
          </div>
        )}
      </Drawer>
    </>
  );
}
