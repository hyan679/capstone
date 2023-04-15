import React from "react";

import { Route } from "react-router-dom";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.views = props.views;
  }
  render() {
    return (
      <div style={{ padding: 20, minHeight: 360 }}>
        {this.views.map((view, index) => (
          <Route key={index} exact path={view.url}>
            {view.component}
          </Route>
        ))}
      </div>
    );
  }
}

export default MainView;
