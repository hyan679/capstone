import { Tag, Progress } from "antd";
import Text from "antd/lib/typography/Text";

// 0:待审批
// 1:建议修改
// 2:不同意
// 3:同意

const numberToStatus = {
  0: {
    name: "Not started",
    color: "default",
    rgb: "#d9d9d9",
  },
  1: {
    name: "Suggest modifying",
    color: "warning",
    rgb: "#faad14",
  },
  2: {
    name: "Rejected",
    color: "error",
    rgb: "#ff4d4f",
  },
  3: {
    name: "Approved",
    color: "success",
    rgb: "#52c41a",
  },
};

function ApproverStatusLabel({ value, showProgress }) {
  return value !== undefined ? (
    showProgress ? (
      <Progress
        strokeColor={numberToStatus[value].rgb}
        percent={(value + 1) * 25}
        steps={4}
        format={() => (
          <Text type="secondary">{numberToStatus[value].name}</Text>
        )}
      />
    ) : (
      <Tag color={numberToStatus[value].color}>
        {numberToStatus[value].name}
      </Tag>
    )
  ) : null;
}

export default ApproverStatusLabel;
