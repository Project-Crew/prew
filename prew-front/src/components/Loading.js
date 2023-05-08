import React from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import styles from "../style/components/Loading.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const Loading = () => {
  return (
    <div className={cx("card", "absolute", "top-50", "left-50", "container")}>
      <ProgressSpinner />
    </div>
  );
};

export default Loading;
