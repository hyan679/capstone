import React, { useState } from "react";

import { Avatar, List } from "antd";
import { getCapitalName } from "../../utils";

const userTypes = [
  {
    type: "Director",
    email: "asdf@gmail.com",
    password: "123456",
  },
  {
    type: "Researcher",
    email: "markuszuccus@gmail.com",
    password: "123456",
  },
  {
    type: "Approver",
    email: "ron@email.com",
    password: "123456",
  },
];

function LoginHelper({ onQuickLogin }) {
  const [loading, setLoading] = useState(false);

  function clickButton({ email, password }) {
    setLoading(true);
    onQuickLogin({ email, password });
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={userTypes}
        loading={loading}
        renderItem={(item) => (
          <List.Item
            onClick={() => {
              clickButton(item);
            }}
          >
            <List.Item.Meta
              avatar={<Avatar> {getCapitalName(item.type)}</Avatar>}
              title={item.type}
              description={item.email}
            />
          </List.Item>
        )}
      />
    </>
  );
}

export default LoginHelper;
