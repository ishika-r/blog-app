import React from "react";
import Sidebar from "./Sidebar";

const Layout = ({ children }: any) => {
  return (
    <div className=" d-flex">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default Layout;
