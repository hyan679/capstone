import { useLocation } from "react-router-dom";
import quertString from "query-string";
import { useEffect, useState } from "react";
import { approveContract, getAgreementStatus } from "../../../apis/http";

import EditorHtml from "../../../components/EditorHtml";
import Header from "../../../components/Header";
import PopupSuggestion from "../../../components/PopupSuggestion";

import {
  Button,
  Space,
  Descriptions,
  Typography,
  Input,
  message,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  EditOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { convertCurrency } from "../../../utils";

const { Text } = Typography;

export default function ContractApproving() {
  const [contractInfo, setContractInfo] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  let { search } = useLocation();
  const { id } = quertString.parse(search);

  useEffect(() => {
    getAgreementStatus(id).then((res) => {
      setContractInfo(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleApprove(state) {
    approveContract(id, state)
      .then((res) => {
        if (res.ok) {
          message.success(state === 3 ? "Agreed" : "Disagreed");
          getAgreementStatus(id).then((res) => {
            setContractInfo(res);
          });
        } else {
          throw new Error("Fail");
        }
      })
      .catch(() => {
        message.error("Operation fail");
      });
  }

  function submitSuggestion(e) {
    const { content } = e;
    approveContract(id, 1, content)
      .then((res) => {
        if (res.ok) {
          message.success("Suggestion sent");
          getAgreementStatus(id).then((res) => {
            setContractInfo(res);
          });
        } else {
          throw new Error("Fail");
        }
      })
      .catch(() => {
        message.error("Fail to submit");
      })
      .finally(() => {
        setShowPopup(false);
      });
  }

  return (
    <>
      <Header
        title="Contract Info"
        showBack={true}
        actions={
          contractInfo.agr_status === 0 ? (
            <div style={{ textAlign: "center", padding: "10px" }}>
              <Space>
                <Button type="primary" onClick={() => handleApprove(3)}>
                  <CheckCircleOutlined />
                  Agree
                </Button>
                <Button type="default" onClick={() => setShowPopup(true)}>
                  <EditOutlined />
                  Suggest Modification
                </Button>
                <Button type="default" onClick={() => handleApprove(2)}>
                  <CloseCircleOutlined />
                  Disagree
                </Button>
              </Space>

              <PopupSuggestion
                visible={showPopup}
                onCreate={submitSuggestion}
                onCancel={() => {
                  setShowPopup(false);
                }}
              />
            </div>
          ) : null
        }
      ></Header>

      <Descriptions labelStyle={{ fontWeight: 600 }}>
        <Descriptions.Item span={3} label="Grantor">
          {contractInfo.grantor_name}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Budget">
          <Text type="danger">
            {contractInfo.funded ? convertCurrency(contractInfo.funded) : ""}
          </Text>
        </Descriptions.Item>
      </Descriptions>

      {contractInfo.agr_status === 1 ? (
        <Alert
          message="You have suggest modification"
          description={contractInfo.comments}
          type="info"
          showIcon
          style={{ marginBottom: "10px" }}
        />
      ) : null}

      {contractInfo.agr_status === 2 ? (
        <Alert
          message="You have rejected the contract"
          type="warning"
          showIcon
          style={{ marginBottom: "10px" }}
        />
      ) : null}

      {contractInfo.agr_status === 3 ? (
        <Alert
          message="You have approved the contract"
          type="success"
          showIcon
          style={{ marginBottom: "10px" }}
        />
      ) : null}

      <EditorHtml initalValue={contractInfo.content}></EditorHtml>
    </>
  );
}
