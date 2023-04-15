import React from "react";
import { message } from "antd";
import { userLogin } from "../../apis/http";

import LoginForm from "./LoginForm";

import { setLoginStatus } from "../../utils";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin({ email, password }) {
    console.log("User Login: ", { email, password });

    const hideLoading = message.loading("Login...", 0);
    setTimeout(hideLoading, 1000);

    userLogin(email, password)
      .then((res) => {
        console.log("Login Success: ", res);
        const { user_id, user_name, is_director, is_researcher, organization } =
          res;
        if (user_id) {
          message.success(`Welcome Back, ${user_name || ""}`);
          const user_role = is_director
            ? "Director"
            : is_researcher
            ? "Researcher"
            : "Approver";
          setLoginStatus({
            user_id,
            user_name,
            user_role,
            organization,
          });
          if (user_role === "Director") {
            this.props.history.push("/director");
          } else if (user_role === "Approver") {
            this.props.history.push("/approver");
          } else {
            this.props.history.push("/project");
          }
        } else {
          message.error("Incorrect email or password. Please try again.");
        }
      })
      .catch((err) => {
        message.error("Fail to connect to server. Please try again later.");
        console.error(err);
      });
  }

  render() {
    return <LoginForm onSubmit={this.handleLogin}></LoginForm>;
  }
}

export default withRouter(Login);
