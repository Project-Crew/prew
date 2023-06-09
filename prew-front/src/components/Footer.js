import React from "react";
import styles from "../style/components/Footer.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Footer = () => {
  return (
    <div className={cx("py-3 w-full", styles.container)}>
      <span className={styles.logoColor}>PREW</span>
      <span className={styles.copyright}>ⓒ PREW. All Rights Reserved</span>
    </div>
  );
};

export default Footer;
