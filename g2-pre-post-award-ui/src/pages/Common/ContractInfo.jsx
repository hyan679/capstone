import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import quertString from "query-string";

import {
  Row,
  Col,
  Space,
  Button,
  message,
  Tabs,
  Tag,
  Spin,
  Alert,
  Drawer,
  List,
} from "antd";
import Header from "../../components/Header";
import EditorHtml from "../../components/EditorHtml";
import { UserOutlined } from "@ant-design/icons";
import Comments from "../../components/Comments";
import {
  commentContract,
  getAgreementComments,
  getAgreementHistory,
  getContract,
  saveContract,
  submitContract,
} from "../../apis/http";
import Suggestions from "../../components/Suggestions";
import { relativeDate } from "../../utils";
const { TabPane } = Tabs;

export default function ContractInfo(props) {
  const [contract, setContract] = useState({});
  const [comments, setComments] = useState([]);
  const [history, setHistory] = useState([]);

  const [editable, setEditable] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submiting, setSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);

  let { search } = useLocation();
  const { id } = quertString.parse(search);

  useEffect(() => {
    if (id === null || id === undefined) {
      message.error("Contract has not created.");
    } else {
      setLoading(true);
      getContract(id)
        .then((res) => {
          setContract(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });

      getAgreementComments(id).then((res) => {
        setComments(res);
      });

      getAgreementHistory(id).then((res) => {
        setHistory(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addComment(value) {
    commentContract(id, value)
      .then(() => {
        message.success("Comment sent");
        return getAgreementComments(id);
      })
      .catch((err) => {
        message.error("Fail to comment");
      })
      .then((res) => {
        setComments(res);
      });
  }

  function toggleEdit() {
    setEditable(!editable);
  }

  function onContentChange(e) {
    setContract({ ...contract, content: e });
  }

  function handleSave() {
    setSaving(1);
    saveContract(id, contract.content)
      .then((res) => {
        message.success("Contract Saved");
        setEditable(false);
      })
      .catch((err) => {
        message.error("Fail to save contract");
        console.error("[Project.Contract] Fail to save contract: ", err);
      })
      .finally(() => {
        setSaving(0);
      });
  }

  function handleSubmit() {
    setSubmiting(1);
    submitContract(id, contract.content)
      .then((res) => {
        message.success("Contract Submited");
        setEditable(false);
      })
      .catch((err) => {
        message.error("Fail to submit contract");
        console.error("[Project.Contract] Fail to submit contract: ", err);
      })
      .finally(() => {
        setSubmiting(0);
      });
  }

  function getPermissionMessage() {
    if (contract.permission === 0) {
      return "You have only READ permission.";
    } else if (contract.permission === 1 || contract.permission === 2) {
      return "You have EDIT permission.";
    } else {
      return "";
    }
  }

  return (
    <div>
      <Header
        title="Contract"
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
                <Button
                  loading={submiting}
                  size="large"
                  type="primary"
                  onClick={handleSubmit}
                >
                  Save and Submit
                </Button>
                <Button
                  size="large"
                  onClick={() => {
                    setShowHistory(true);
                  }}
                >
                  History
                </Button>
              </Space>
            ) : (
              <Button
                type="primary"
                size="large"
                disabled={!contract.permission || contract.agr_state === 4}
                onClick={toggleEdit}
              >
                {contract.permission === 0
                  ? "Edit (No Permission) "
                  : "Edit Contract"}
              </Button>
            )}
          </>
        }
      ></Header>

      {loading ? (
        <Spin></Spin>
      ) : (
        <>
          {getPermissionMessage() ? (
            <Alert
              message={getPermissionMessage()}
              type="info"
              showIcon
              closable
              style={{ margin: "10px 0" }}
            />
          ) : null}
          <Drawer
            title="History version"
            placement="right"
            onClose={() => {
              setShowHistory(false);
            }}
            visible={showHistory}
          >
            <List
              itemLayout="horizontal"
              dataSource={history}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={`Version ${item.version}`}
                    description={`${relativeDate(item.altered_time)}`}
                  />
                  <Button
                    type="link"
                    onClick={() => {
                      setContract({ ...contract, content: item.content });
                    }}
                  >
                    Revert
                  </Button>
                </List.Item>
              )}
            />
          </Drawer>

          <Row gutter={18}>
            <Col span={18}>
              <div style={{ paddingBottom: "10px" }}>
                <Tag style={{ marginRight: "10px", fontSize: 16 }}>
                  {" "}
                  <UserOutlined />
                  Applicant: <b>{contract.user_name}</b>
                </Tag>
              </div>

              <EditorHtml
                initalValue={contract.content || ""}
                readOnly={!editable}
                onChange={onContentChange}
              ></EditorHtml>
            </Col>
            <Col span={6}>
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={`Approvers' Responses(${
                    contract && contract.approver ? contract.approver.length : 0
                  })`}
                  key="suggestion"
                >
                  <Suggestions
                    list={contract.approver}
                    statusName="agr_status"
                  ></Suggestions>
                </TabPane>
                <TabPane
                  tab={`Comments(${
                    contract && comments ? comments.length : 0
                  })`}
                  key="comment"
                >
                  <Comments
                    comments={comments}
                    onSubmit={addComment}
                  ></Comments>
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}
