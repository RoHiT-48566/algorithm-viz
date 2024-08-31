import React from "react";
import { Navbar } from "@/components/ui/navbar";
import "./RootLayout.css";

const RootLayout = ({ children }) => {
  return (
    <div className="root-layout">
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
