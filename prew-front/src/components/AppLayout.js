import React from "react";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/components/AppLayout.module.scss";
const AppLayout = ({ children }) => {
  return (
    <div className="py-5 px-7 overflow-x-hidden">
      <Header />
      <Navigator />
      <div className={styles.childContainer}>{children}</div>
      <Footer />
    </div>
  );
};

export default AppLayout;
