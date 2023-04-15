import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Row, Col, Button, Tag, Space, message, Tabs } from "antd";

import Header from "../../components/Header";
import EditorHtml from "../../components/EditorHtml";
import { UserOutlined } from "@ant-design/icons";
import Suggestions from "../../components/Suggestions";
import {
  getApplication,
  saveApplication,
  submitApplication,
} from "../../apis/http";

import quertString from "query-string";

const { TabPane } = Tabs;

export default function ApplicationInfo() {
  const [applicationInfo, setApplicationInfo] = useState({});
  const [editable, setEditable] = useState(false);
  const [saving, setSaving] = useState(0);
  const [submiting, setSubmiting] = useState(0);

  let { search } = useLocation();
  const { id } = quertString.parse(search);

  useEffect(() => {
    getApplication(id)
      .then((res) => {
        console.log("[Project.Application] Get Application: ", res);
        setApplicationInfo(res);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      setApplicationInfo({});
    };
    // eslint-disable-next-line
  }, []);

  function onContentChange(e) {
    setApplicationInfo({ ...applicationInfo, content: e });
  }
  function toggleEdit() {
    setEditable(!editable);
  }
  function handleSave() {
    setSaving(1);
    saveApplication(id, applicationInfo.content)
      .then((res) => {
        message.success("Application Saved");
        setEditable(false);
      })
      .catch((err) => {
        message.error("Fail to save application");
      })
      .finally(() => {
        setSaving(0);
      });
  }

  function handleSubmit() {
    setSubmiting(1);
    submitApplication(id, applicationInfo.content)
      .then((res) => {
        message.success("Application Submited");
        setEditable(false);
      })
      .catch((err) => {
        message.error("Fail to submit application");
      })
      .finally(() => {
        setSubmiting(0);
      });
  }

  return (
    <>
      <Header
        title="Application"
        showBack
        actions={
          <>
            {editable ? (
              <Space>
                <Button
                  loading={saving}
                  type="primary"
                  size="large"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button loading={submiting} size="large" onClick={handleSubmit}>
                  Save and Submit
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                size="large"
                disabled={
                  applicationInfo.permission === 0 ||
                  applicationInfo.app_state === 4
                }
                onClick={toggleEdit}
              >
                {applicationInfo.permission === 0
                  ? "Edit (No Permission) "
                  : "Edit Application"}
              </Button>
            )}
          </>
        }
      ></Header>

      <Row gutter={18}>
        <Col span={18}>
          <div style={{ paddingBottom: "20px" }}>
            <Tag style={{ marginRight: "10px", fontSize: 16 }}>
              <UserOutlined /> Lead Researcher:{" "}
              <b>{applicationInfo.lead_researcher_name}</b>
            </Tag>
          </div>

          <EditorHtml
            initalValue={applicationInfo.content || ""}
            readOnly={!editable}
            onChange={onContentChange}
          ></EditorHtml>
        </Col>
        <Col span={6}>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={`Approvers' Responses(${
                applicationInfo && applicationInfo.approver
                  ? applicationInfo.approver.length
                  : 0
              })`}
              key="suggestion"
            >
              <Suggestions
                list={applicationInfo.approver}
                statusName="app_status"
              ></Suggestions>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
}
