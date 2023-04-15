import React, { useState } from "react";

import { Form, Input, Button, Image, message, Badge, Radio } from "antd";
import logo from "../../assets/logo.png";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoginHelper from "./Helper";

export default function LoginForm({ onSubmit: onFinish }) {
  const [loading, setLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState("quick");

  function enterLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  function onFinishFailed(errorInfo) {
    console.log("Failed:", errorInfo);
  }
  function handleResiger() {
    message.info("Cannot register currently. Invitation Only");
  }
  function changeLoginMethod() {
    const method = loginMethod === "quick" ? "account" : "quick";
    setLoginMethod(method);
  }

  return (
    <div
      style={{
        padding: "10em",
        display: "grid",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <div style={{ backgroundColor: "#fff", padding: "2em 5em" }}>
        <Image
          width={200}
          height={200}
          preview={false}
          src={logo}
          style={{ padding: "1.5em" }}
        />

        <div style={{ marginBottom: "10px" }}>
          <Radio.Group
            defaultValue="quick"
            style={{ marginTop: 16 }}
            onChange={changeLoginMethod}
          >
            <Radio.Button value="quick">Quick Login</Radio.Button>
            <Radio.Button value="account">Use Account</Radio.Button>
          </Radio.Group>
        </div>

        {loginMethod === "quick" ? (
          <LoginHelper onQuickLogin={onFinish}></LoginHelper>
        ) : (
          <Form
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                placeholder="Email"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                onPressEnter={onFinish}
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                onClick={enterLoading}
              >
                Login
              </Button>
              <Button type="link" onClick={handleResiger}>
                Register
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
}
