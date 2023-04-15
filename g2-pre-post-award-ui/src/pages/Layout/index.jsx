import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { Layout } from "antd";

import { checkLoginStatus } from "../../utils";

import ResearcherLayout from "./ResearcherLayout";
import DirectorLayout from "./DirectorLayout";
import ApproverLayout from "./ApproverLayout";
import Login from "../Login";

import Test from "../Test";

class BasicLayout extends React.Component {
  // componentDidMount() {
  //   console.log("Login Status: ", checkLoginStatus());
  // }
  render() {
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route path="/project">
              <ResearcherLayout></ResearcherLayout>
            </Route>
            <Route path="/director">
              <DirectorLayout></DirectorLayout>
            </Route>
            <Route path="/approver">
              <ApproverLayout></ApproverLayout>
            </Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/test" component={Test}></Route>
            {/* <Redirect path="/" to="/"></Redirect> */}
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default BasicLayout;
