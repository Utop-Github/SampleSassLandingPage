import React from "react";
import page from "./page";
const NotFound = (props) => {
  function createMarkup() {
    return { __html: page };
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      dangerouslySetInnerHTML={createMarkup()}
    />
  );
};

export default NotFound;
