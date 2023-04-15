import { Tag } from "antd";

export default function PermissionLabel({ value }) {
  function valueToLabel() {
    if (value === 0) {
      return "Read";
    } else if (value === 1) {
      return "Write";
    } else if (value === 2) {
      return "Admin";
    } else {
      return "";
    }
  }

  // return <Tag style={{ marginLeft: "5px" }}></Tag>;
  return valueToLabel(value);
}
