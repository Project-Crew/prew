import React from "react";
import Navigator from "./Navigator";
import Header from "./Header";
import Footer from "./Footer";
import styles from "../style/components/AppLayout.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const AppLayout = ({ children }) => {
  return (
    <div
      className={cx(
        "w-full h-full pt-5 px-7 overflow-x-hidden",
        styles.container
      )}
    >
      <Header />
      <Navigator />
      <div className={cx("w-full h-full", styles.childContainer)}>
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
