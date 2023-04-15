import React, { useState, useEffect } from "react";
import { Button, Select, Typography, List, Avatar, Tag, Space } from "antd";
import { getUsers } from "../../apis/http";
import { getCapitalName } from "../../utils";

import PermissionLabel from "../../components/PermissionLabel";

const { Option } = Select;
const { Title } = Typography;

export default function ApproverAssign({ approver, onSubmit, onDelete }) {
  const [users, setUsers] = useState([]);
  const [userInvite, setUserInvite] = useState("");
  const [permission, setPermission] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers(1)
      .then((res) => {
        // Remove existing users
        const userList = approver
          ? res.filter(
              (a) => approver.findIndex((b) => a.user_id === b.user_id) === -1
            )
          : res;
        setUsers(userList);
      })
      .catch((err) => {});
  }, [approver]);

  const onChangeSelector = (e) => {
    setUserInvite(e);
  };

  function onDeleteApprover(e) {
    onDelete(e.user_id);
  }

  const submitForm = (e) => {
    onSubmit({ user_id: Number(userInvite), permission: permission });
    setUserInvite("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      <Title level={4} style={{ paddingTop: "15px" }}>
        Approvers
      </Title>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Select
          value={userInvite}
          style={{ width: "100%" }}
          placeholder="Select Approvers"
          onChange={onChangeSelector}
          optionLabelProp="label"
        >
          {users.map((item) => (
            <Option key={item.user_id} label={item.user_name}>
              <Space>
                <Avatar size="small">{getCapitalName(item.user_name)}</Avatar>
                <span> {item.user_name}</span>
                <Tag>{item.organization}</Tag>
              </Space>
            </Option>
          ))}
        </Select>

        <Select
          value={permission}
          style={{ width: 80, margin: "0 8px" }}
          onChange={(e) => {
            setPermission(e);
          }}
        >
          <Option value={0}>Read</Option>
          <Option value={1}>Write</Option>
          <Option value={2}>Admin</Option>
        </Select>
        <Button type="primary" onClick={submitForm} loading={loading}>
          Assign
        </Button>
      </div>

      <div style={{ padding: "10px 0" }}>
        {approver
          ? approver.map((item) => (
              <List.Item key={item.user_id}>
                <List.Item.Meta
                  avatar={<Avatar>{getCapitalName(item.user_name)}</Avatar>}
                  title={<>{item.user_name}</>}
                  description={
                    <PermissionLabel value={item.permission}></PermissionLabel>
                  }
                />
                <Button
                  type="link"
                  danger
                  onClick={() => onDeleteApprover(item)}
                >
                  Remove
                </Button>
              </List.Item>
            ))
          : null}
      </div>
    </>
  );
}
