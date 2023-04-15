import React, { useState } from "react";
import { Form, Input, Button, Divider } from "antd";

const { TextArea } = Input;

export default function CommentEditor({ onSubmit }) {
  const [value, setValue] = useState("");

  function textChange(e) {
    setValue(e);
  }

  return (
    <>
      <Form.Item>
        <TextArea rows={3} onChange={textChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" onClick={onSubmit} type="default">
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
}
