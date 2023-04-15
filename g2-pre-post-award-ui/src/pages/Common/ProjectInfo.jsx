import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import quertString from "query-string";

import { Alert, Button, message, Popover, Space, Tabs } from "antd";

import Header from "../../components/Header";
import InfoTable from "../../components/ProjectTable";
import ProgressTree from "../../components/ProgressTree";

import {
  getApplicationStatus,
  getAgreementStatus,
  getProjectInfo,
  createProjectAgreement,
} from "../../apis/http";

const { TabPane } = Tabs;

export default function ProjectInfo(props) {
  let { search, pathname } = useLocation();
  const basePath = pathname.split("/")[1];

  let [loading, setLoading] = useState(false);
  let [projectInfo, setProjectInfo] = useState({});
  let [applicationInfo, setApplicationInfo] = useState({});
  let [contractInfo, setContractInfo] = useState({});
  const { id } = quertString.parse(search);
  /*   const [visible, setVisible] = useState(true); */
  useEffect(() => {
    async function fetchData() {
      const res = await getProjectInfo(id);
      setProjectInfo(res);

      const resApplication = await getApplicationStatus(res.application_id);
      setApplicationInfo(resApplication);

      const resContract = await getAgreementStatus(res.agreement_id);
      setContractInfo(resContract);
    }

    fetchData();

    return () => {
      setProjectInfo({});
      setApplicationInfo({});
      setContractInfo({});
    };

    // eslint-disable-next-line
  }, []);

  function createContract() {
    message.loading("Creating agreement");
    setLoading(true);
    createProjectAgreement(id)
      .then((res) => {
        message.success("Agreement created");
        getProjectInfo(id).then((res) => {
          setProjectInfo(res);
        });
      })
      .catch((err) => {
        message.error("Fail to create agreement");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Header
        title="Project Information"
        actions={
          <>
            <Space>
              <Link
                to={`/${basePath}/application?id=${projectInfo.application_id}`}
              >
                <Button type="primary" size="large">
                  Application
                </Button>
              </Link>

              {projectInfo.app_state < 4 ? (
                <Popover
                  title="Not available"
                  content="Application has not completed"
                  placement="bottom"
                >
                  <Button
                    disabled={projectInfo.app_state < 4}
                    type="primary"
                    size="large"
                  >
                    Contract
                  </Button>
                </Popover>
              ) : (
                <Button
                  disabled={projectInfo.app_state < 4}
                  type="primary"
                  size="large"
                >
                  <Link
                    to={`/${basePath}/contract?id=${projectInfo.agreement_id}`}
                  >
                    Contract
                  </Link>
                </Button>
              )}
              <Link
                to={`/${basePath}/permission?id=${projectInfo.project_id}&application_id=${projectInfo.application_id}&agreement_id=${projectInfo.agreement_id}`}
              >
                <Button
                  type="default"
                  size="large"
                  disabled={!projectInfo.project_id}
                >
                  Permission
                </Button>
              </Link>
            </Space>
          </>
        }
        showBack
      ></Header>

      <div>
        {projectInfo.app_state === 4 &&
        projectInfo.agreement_id === null &&
        basePath === "director" ? (
          <Alert
            message="Application has completed"
            description="Do you want to upload an agreement?"
            type="success"
            showIcon
            action={
              <Button
                type="success"
                size="large"
                onClick={createContract}
                loading={loading}
              >
                Confirm
              </Button>
            }
            style={{ marginBottom: "10px" }}
          />
        ) : null}
      </div>

      <InfoTable list={projectInfo}></InfoTable>

      <div
        style={{ backgroundColor: "#fff", margin: "10px 0", padding: "10px" }}
      >
        <Tabs>
          <TabPane tab="Application Progress" key="1">
            <ProgressTree
              data={applicationInfo.organization}
              statusName="app_status"
            ></ProgressTree>
          </TabPane>
          <TabPane tab="Contract Progress" key="2">
            <ProgressTree
              data={contractInfo.organization}
              statusName="agr_status"
            ></ProgressTree>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
}
