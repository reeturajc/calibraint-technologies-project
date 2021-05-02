import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import Store from "./redux/reducers";
import { Layout } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShowDetails from "./pages/ShowDetails";

const { Content, Footer } = Layout;

function App() {
  return (
    <Provider store={Store}>
      <Layout>
        <Content className="site-layout" style={{ padding: "0 20px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 380, margin: "20px 0" }}
          >
            <Router>
              <Switch>
                <Route component={Home} path="/" exact />
                <Route component={ShowDetails} path="/show-details/:id" exact />
              </Switch>
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Calibraint Technologies ©2021 Created by Reeturaj Chatterjee
        </Footer>
      </Layout>
    </Provider>
  );
}

export default App;
