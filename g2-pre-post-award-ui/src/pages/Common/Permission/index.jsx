import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { message, Tabs } from "antd";

import quertString from "query-string";

import {
  getAgreementCollaborators,
  getApplicationCollaborators,
  getUsers,
} from "../../../apis/http";

import Header from "../../../components/Header";

import PermissionTable from "./PermissionTable";
import PermissionPopup from "./PermissionPopup";

export default function Permission() {
  const [tab, setTab] = useState("application");
  const [applicationCollaborators, setApplicationCollaborators] = useState([]);
  const [applicationPermission, setApplicationPermission] = useState(0);

  const [contractCollaborators, setContractCollaborators] = useState([]);
  const [contractPermission, setContractPermission] = useState(0);
  const [users, setUsers] = useState([]);

  let { search } = useLocation();
  const { id, application_id, agreement_id } = quertString.parse(search);
  useEffect(() => {
    async function fetchData() {
      getApplicationCollaborators(application_id)
        .then((res) => {
          setApplicationCollaborators(res.list);
          setApplicationPermission(res.permission);
        })
        .catch((res) => {
          // message.error("Fail to load application collaborators");
        });

      getAgreementCollaborators(agreement_id)
        .then((res) => {
          setContractCollaborators(res.list);
          setContractPermission(res.permission);
        })
        .catch((res) => {
          // message.error("Fail to load contract collaborators");
        });

      getUsers().then((res) => {
        setUsers(res);
      });
    }
    fetchData();

    return () => {
      setApplicationCollaborators([]);
      setContractCollaborators([]);
      setUsers([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function userInvited(e) {
    if (e === "application") {
      getApplicationCollaborators(application_id).then((res) => {
        setApplicationCollaborators(res.list);
        setApplicationPermission(res.permission);
      });
    } else if (e === "contract") {
      getAgreementCollaborators(agreement_id).then((res) => {
        setContractCollaborators(res.list);
        setContractPermission(res.permission);
      });
    }
  }

  function userDeleted(e) {
    if (e === "application") {
      getApplicationCollaborators(application_id)
        .then((res) => {
          setApplicationCollaborators(res.list);
          setApplicationPermission(res.permission);
        })
        .catch((res) => {
          message.error("Fail to load application collaborators");
        });
    } else if (e === "contract") {
      getAgreementCollaborators(agreement_id)
        .then((res) => {
          setContractCollaborators(res.list);
          setContractPermission(res.permission);
        })
        .catch((res) => {
          message.error("Fail to load contract collaborators");
        });
    }
  }

  const { TabPane } = Tabs;

  return (
    <>
      <Header
        title="Collaborators"
        showBack
        actions={
          <>
            {tab === "application" ? (
              <PermissionPopup
                type="application"
                disable={applicationPermission !== 2}
                users={
                  applicationCollaborators
                    ? users.filter(
                        (a) =>
                          applicationCollaborators.findIndex(
                            (b) => a.user_id === b.user_id
                          ) === -1
                      )
                    : users
                }
                onSubmit={userInvited}
                title="Invite Application Colloborator"
              ></PermissionPopup>
            ) : (
              <PermissionPopup
                type="contract"
                disable={contractPermission !== 2}
                users={
                  contractCollaborators
                    ? users.filter(
                        (a) =>
                          contractCollaborators.findIndex(
                            (b) => a.user_id === b.user_id
                          ) === -1
                      )
                    : users
                }
                onSubmit={userInvited}
                title="Invite Contract Colloborator"
              ></PermissionPopup>
            )}
          </>
        }
      ></Header>

      <Tabs
        defaultActiveKey="application"
        size="large"
        onChange={(e) => {
          setTab(e);
        }}
      >
        <TabPane tab="Application" key="application">
          <PermissionTable
            type="application"
            disable={applicationPermission !== 2}
            id={id}
            data={applicationCollaborators}
            onDelete={userDeleted}
          ></PermissionTable>
        </TabPane>
        <TabPane tab="Contract" key="contract">
          <PermissionTable
            type="contract"
            disable={contractPermission !== 2}
            id={id}
            data={contractCollaborators}
            onDelete={userDeleted}
          ></PermissionTable>
        </TabPane>
      </Tabs>
    </>
  );
}
