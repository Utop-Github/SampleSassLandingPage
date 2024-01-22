import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import theme from "./utils/themes";
import Home from "./pages/HomePage/Home";
import "antd/dist/reset.css";
import "./utils/bootstrap.css";
import { StyleProvider } from "@ant-design/cssinjs";
import Header from "./components/Header";
import "./App.css";
import { ConfigProvider } from "antd";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO";

export default function App() {
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
            <Header />

            <Routes>
              <Route path="/:routeName/" element={<Home />} />
            </Routes>
          </StyleProvider>
        </ConfigProvider>
      </HelmetProvider>
    </div>
  );
}
