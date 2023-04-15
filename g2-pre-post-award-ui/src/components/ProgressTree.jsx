import { Tree, Popover, Badge } from "antd";
import { HomeOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import ApproverStatusLabel from "./ApproverStatusLabel";

export default function ProgressTree({ data, statusName }) {
  function onSelect(selectedKeys, info) {
    // console.log("selected", selectedKeys, info);
  }
  function getTreeData() {
    if (data) {
      return data.map((org, index) => ({
        title: <b>{`${org.name} (${org.approver.length})`}</b>,
        key: `0-${index}`,
        children: org.approver.map((approver, approverIndex) => ({
          title: (
            <Popover
              trigger="hover"
              placement="right"
              content={
                <div style={{ minWidth: "200px" }}>
                  <MailOutlined />
                  <span style={{ fontWeight: "bold", marginLeft: 6 }}>
                    {approver.email}
                  </span>
                </div>
              }
              title={`${approver.user_name}'s Email`}
            >
              <span style={{ paddingRight: "20px" }}>{approver.user_name}</span>
              <ApproverStatusLabel
                value={approver[statusName]}
                showProgress
              ></ApproverStatusLabel>
            </Popover>
          ),
          key: `0-${index}-${approverIndex}`,
          icon: <UserOutlined />,
        })),
      }));
    } else {
      return [];
    }
  }

  return (
    <>
      <Tree
        showIcon
        defaultExpandAll
        switcherIcon={<HomeOutlined />}
        onSelect={onSelect}
        treeData={getTreeData()}
      />
    </>
  );
}
