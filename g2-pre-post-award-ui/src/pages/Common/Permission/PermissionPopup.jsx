import React, { useState } from "react";
import { Modal, Button, Radio, message, Tag, Space } from "antd";

import { Form, Select } from "antd";
import {
  inviteAgreementCollaborator,
  inviteApplicationCollaborator,
} from "../../../apis/http";
import { useLocation } from "react-router-dom";
import quertString from "query-string";

const { Option } = Select;

export default function PermissionPopup({
  onSubmit,
  users,
  disable,
  title,
  type = "application",
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [permissionValue, setPermissionValue] = useState(0);
  const [userInvite, setUserInvite] = useState(0);
  const [loading, setLoading] = useState(0);

  let { search } = useLocation();
  const { application_id, agreement_id } = quertString.parse(search);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const data = { user_id: userInvite, permission: permissionValue };
    const id = type === "application" ? application_id : agreement_id;
    const query =
      type === "application"
        ? inviteApplicationCollaborator
        : inviteAgreementCollaborator;
    query(id, data)
      .then((res) => {
        if (res.ok) {
          message.success("Collaborator Invited");
        } else {
          throw new Error("Fail to invite");
        }
      })
      .catch((err) => {
        message.error("User existed");
      });

    onSubmit(type);
    setLoading(1);
    setTimeout(() => {
      setLoading(0);
      setIsModalVisible(false);
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSelectRadio = (e) => {
    setPermissionValue(e.target.value);
  };

  const onChangeSelector = (e) => {
    setUserInvite(e);
  };

  return (
    <>
      <Button
        disabled={disable}
        type="primary"
        size="large"
        onClick={showModal}
      >
        {title}
      </Button>
      <Modal
        title={title}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
      >
        <Form>
          <Form.Item label="Collaborator's Name">
            <Select
              showSearch
              style={{ width: 300 }}
              placeholder="Select a collaborator"
              onChange={onChangeSelector}
            >
              {users.map((item) => (
                <Option key={item.user_id} value={item.user_id}>
                  <Space>
                    <Tag>{item.organization}</Tag>
                    {item.user_name}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Radio.Group onChange={onSelectRadio} value={permissionValue}>
              <Radio value={0}>Read</Radio>
              <Radio value={1}>Write</Radio>
              <Radio value={2}>Admin</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
