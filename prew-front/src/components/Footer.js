import React from "react";
import styles from "../style/components/Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Footer = () => {
  return <div className={cx("py-3", styles.container)}>Footer</div>;
};

export default Footer;
