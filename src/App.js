import React, { useEffect } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import theme from "./utils/themes";
import Home from "./pages/HomePage/Home";
import "antd/dist/reset.css";
import "./utils/bootstrap.css";
import { StyleProvider } from "@ant-design/cssinjs";
import Header from "./components/Header";
import "./App.css";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";
export default function App() {
  const configJson = require("./test.json");
  const { routeName } = useParams();
  // debugger;
  // console.log("masterData", window.masterData);
  // console.log("utopWidet", window.utopWidget);
  return (
    <div className="App">
      <HelmetProvider>
        {/* <SEO
          title={configJson.flowConfiguration.dataStep3.SEOMetadata.Title}
          description={configJson.flowConfiguration.dataStep3.SEOMetadata.Description}
          name="Company name."
        /> */}
        <ConfigProvider theme={theme}>
          <StyleProvider>
            <Provider store={store}>
              <Header />

              <Routes>
                <Route path="/:routeName/" element={<Home />} />
              </Routes>
            </Provider>
          </StyleProvider>
        </ConfigProvider>
      </HelmetProvider>
    </div>
  );
}
