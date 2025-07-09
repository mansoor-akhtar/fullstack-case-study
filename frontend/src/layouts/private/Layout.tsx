import React from "react";
import type { ComponentType } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  Component: ComponentType<any>;
  route: string;
}

const Layout: React.FC<LayoutProps> = ({ Component, route }) => (
  <>
    <Header />
    <div className="container layout-container main-container">
      <Component route={route} />
    </div>
    <Footer />
  </>
);

export default Layout;
