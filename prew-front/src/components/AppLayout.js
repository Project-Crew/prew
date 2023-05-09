import React from "react";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/components/AppLayout.module.scss";
const AppLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <Navigator />
      {children}
      <Footer />
    </div>
  );
};

export default AppLayout;
