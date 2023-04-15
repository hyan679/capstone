import React, { useState } from "react";
import CommentItem from "./CommentItem";

import { Form, Input, Button, Divider } from "antd";

const { TextArea } = Input;

function Comments({ comments, onSubmit }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  function textChange(e) {
    setValue(e.target.value);
  }

  function submitComment(e) {
    if (value.trim() === "") {
      return;
    }
    onSubmit(value);
    setLoading(true);

    setTimeout(() => {
      setValue("");
      setLoading(false);
    }, 2000);
  }

  return (
    <div>
      {comments && comments.length
        ? comments.map((item, index) => (
            <CommentItem key={index} {...item}></CommentItem>
          ))
        : "No comments"}
      <Divider></Divider>
      <div>
        <Form form={form}>
          <Form.Item name="comment">
            <TextArea
              disabled={loading}
              rows={3}
              onChange={textChange}
              value={value}
              onPressEnter={submitComment}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              onClick={submitComment}
              type="default"
              loading={loading}
            >
              Sent Comment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Comments;
