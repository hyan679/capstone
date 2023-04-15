import React, { useEffect, useState } from "react";
import {
  List,
  Badge,
  Drawer,
  Button,
  message,
  Divider,
  Space,
  Spin,
  Switch,
} from "antd";

import { Link } from "react-router-dom";

import {
  assignApplicationApprover,
  deleteApplicationApprover,
  getApplication,
  getApplicationList,
  getProjectInfo,
} from "../../apis/http";
import { convertCurrency } from "../../utils";

import ApplicationSummary from "./ApplicationSummary";
import ApproverAssign from "./ApproverAssign";

export default function ApplicationManagement() {
  const [visible, setVisible] = useState(false);
  const [projectInfo, setProjectInfo] = useState({});
  const [applicationInfo, setApplicationInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [newApplicationList, setNewApplicationList] = useState([]);
  const [drawerLoading, setDrawerLoading] = useState(false);

  useEffect(() => {
    initTable(1);
  }, []);

  function initTable(status) {
    setLoading(true);
    getApplicationList(status)
      .then((res) => {
        setNewApplicationList(res);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }

  async function openApplicationPreview(id) {
    setVisible(true);
    setDrawerLoading(true);

    try {
      const resProjectInfo = await getProjectInfo(id);
      setProjectInfo(resProjectInfo);
      setDrawerLoading(false);

      const resApplicationInfo = await getApplication(
        resProjectInfo.application_id
      );
      setApplicationInfo(resApplicationInfo);
    } catch {
      message.error("Fail to load project information");
    }
  }

  function onSubmitApprover({ user_id, permission }) {
    const { application_id } = projectInfo;
    assignApplicationApprover(application_id, user_id, permission).then(
      (res) => {
        message.success("Approvers assigned");
        setVisible(false);
      }
    );
  }

  function onDeleteApprover(userId) {
    const { application_id } = projectInfo;
    deleteApplicationApprover(application_id, userId)
      .then((res) => {
        message.success("Approver is removed");
        return getApplication(application_id);
      })
      .then((res) => {
        setApplicationInfo(res);
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
            Application
          </span>
          <Badge count={newApplicationList.length} />
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
        dataSource={newApplicationList}
        renderItem={(item) => (
          <List.Item
            key={item.application_id}
            actions={[
              <Button
                type="primary"
                onClick={() => openApplicationPreview(item.project_id)}
                key={`a-${item.application_id}`}
              >
                SET
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.title}
              description={convertCurrency(item.estimated_budget)}
            />
          </List.Item>
        )}
      />

      <Drawer
        title="Assign Application Approver"
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
            <ApplicationSummary
              title={projectInfo.title}
              data={applicationInfo}
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
            ></ApplicationSummary>

            <ApproverAssign
              approver={applicationInfo.approver}
              onSubmit={onSubmitApprover}
              onDelete={onDeleteApprover}
            ></ApproverAssign>
          </div>
        )}
      </Drawer>
    </>
  );
}
