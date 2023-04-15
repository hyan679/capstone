import React from "react";

import { Table, Space, Button, Avatar, Select, message } from "antd";
import {
  assignAgreementCollaborator,
  assignApplicationCollaborator,
  deleteAgreementCollaborator,
  deleteApplicationCollaborator,
} from "../../../apis/http";
import { getCapitalName } from "../../../utils";
import PermissionWarning from "./PermissionWarning";
import { useLocation } from "react-router-dom";
import quertString from "query-string";
const { Option } = Select;
const { Column } = Table;

export default function PermissionTable({
  data,
  disable,
  onDelete,
  type = "application",
}) {
  let { search } = useLocation();
  const { application_id, agreement_id } = quertString.parse(search);

  const onSelectPermission = (permission, record) => {
    const { user_id } = record;
    const data = { user_id, permission };
    const id = type === "application" ? application_id : agreement_id;
    const query =
      type === "application"
        ? assignApplicationCollaborator
        : assignAgreementCollaborator;

    query(id, data)
      .then((res) => {
        message.info("Permission changed");
      })
      .catch((err) => {
        message.error("Fail to change permission");
      });
  };

  function handleDelete({ user_id }) {
    const id = type === "application" ? application_id : agreement_id;
    const query =
      type === "application"
        ? deleteApplicationCollaborator
        : deleteAgreementCollaborator;

    query(id, user_id)
      .then((res) => {
        message.success("Collaborator removed");
        onDelete(type);
      })
      .catch((err) => {
        message.error("You cannot delete users");
      });
  }

  return (
    <>
      <PermissionWarning disable={disable}></PermissionWarning>
      <Table dataSource={data}>
        <Column
          title="Name"
          dataIndex="user_name"
          key="user_name"
          render={(name) => (
            <>
              <Space>
                <Avatar>{getCapitalName(name)}</Avatar>
                {name}
              </Space>
            </>
          )}
        />
        <Column
          title="Organization"
          dataIndex="organization"
          key="organization"
          render={(organization) => (
            <>
              <Space>
                <Avatar>{organization}</Avatar>
                {organization}
              </Space>
            </>
          )}
        />
        <Column
          title="Permission"
          dataIndex="permission"
          key="permission"
          render={(role, row) => (
            <Select
              disabled={disable}
              style={{ width: 150 }}
              defaultValue={role}
              placeholder="Assign a role"
              onChange={(e) => onSelectPermission(e, row)}
            >
              <Option value={0}>Read</Option>
              <Option value={1}>Write</Option>
              <Option value={2}>Admin</Option>
            </Select>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <Button
                disabled={disable}
                type="text"
                color="red"
                danger
                onClick={() => handleDelete(record)}
              >
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>
    </>
  );
}
