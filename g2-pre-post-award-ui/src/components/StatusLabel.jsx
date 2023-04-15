import { Tag, Progress } from "antd";

// 0:未提交（未开始，提交后到状态2）
// 1:待分配
// 2:正在approve（有人审核了，申请被退回到状态1）
// 3:待修改（任意approver驳回）
// 4:完成

const numberToStatus = {
  0: {
    name: "To Be Submitted",
    color: "default",
    rgb: "#d9d9d9",
  },
  1: {
    name: "Processing",
    color: "blue",
    rbg: "#108ee9",
  },
  2: {
    name: "Approving",
    color: "orange",
    rgb: "#faad14",
  },
  3: {
    name: "To Be Modified",
    color: "red",
    rgb: "#ff4d4f",
  },
  4: {
    name: "Completed",
    color: "green",
    rgb: "#52c41a",
  },
};

function getStatus(value) {
  if (value in numberToStatus) {
    return numberToStatus[value];
  } else {
    return {
      name: "Not started",
      color: "default",
      rgb: "#d9d9d9",
    };
  }
}

function StatusLabel({ value, showProgress }) {
  return value !== undefined ? (
    showProgress ? (
      <Progress
        percent={(value + 1) * 20}
        steps={5}
        strokeColor={getStatus(value).rgb}
        format={() => getStatus(value).name}
      />
    ) : (
      <Tag color={getStatus(value).color}>{getStatus(value).name}</Tag>
    )
  ) : null;
}

export default StatusLabel;
