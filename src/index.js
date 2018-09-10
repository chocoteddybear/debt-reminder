import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import ItemEdit from "./ItemEdit";
import "./style.css";

ReactDOM.render(
  <Router>
    <Fragment>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/debtor/:uid" component={ItemEdit} />
      </Switch>
    </Fragment>
  </Router>,
  document.getElementById("root")
);
