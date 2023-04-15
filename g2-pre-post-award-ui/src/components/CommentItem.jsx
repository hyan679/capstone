import React from "react";
import { Avatar, Comment } from "antd";

import { getCapitalName, relativeDate } from "../utils";

export default function CommentItem(props) {
  return (
    <Comment
      author={props.user_name}
      avatar={
        <Avatar alt={props.user_name}>{getCapitalName(props.user_name)}</Avatar>
      }
      content={<p>{props.content}</p>}
      datetime={props.created_time ? relativeDate(props.created_time) : ""}
    />
  );
}
