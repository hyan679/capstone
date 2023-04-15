import React, { useState } from "react";
import CommentItem from "./CommentItem";
import CommentEditor from "./CommentEditor";

import { Form, Input, Button, Divider, Comment, Avatar } from "antd";
import { getCapitalName, relativeDate } from "../utils";
import ApproverStatusLabel from "./ApproverStatusLabel";

const { TextArea } = Input;

export default function Suggestions({ list, onSubmit, statusName }) {
  const [value, setValue] = useState("");

  function textChange(e) {
    setValue(e.target.value);
  }

  function submitComment() {
    onSubmit(value);
  }

  return (
    <div>
      {list && list.length
        ? list
            // .filter((item) => item.comments !== null && item.comments !=="None")
            .map((item, index) => (
              <Comment
                key={item.user_id}
                author={item.user_name}
                avatar={
                  <Avatar alt={item.user_name} size="small">
                    {getCapitalName(item.user_name)}
                  </Avatar>
                }
                content={
                  <>
                    <ApproverStatusLabel
                      value={statusName ? item[statusName] : null}
                    ></ApproverStatusLabel>
                    <p>{item.comments ? item.comments : ""}</p>
                  </>
                }
                datetime={
                  item.created_time ? relativeDate(item.created_time) : ""
                }
              />
            ))
        : "No suggestion"}
    </div>
  );
}
