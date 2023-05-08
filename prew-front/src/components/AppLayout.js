import React from "react";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";
import Loading from "./Loading";
const AppLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Navigator />
      <Loading />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
