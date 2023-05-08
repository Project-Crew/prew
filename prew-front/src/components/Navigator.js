import React from "react";
import { TabMenu } from "primereact/tabmenu";
import classNames from "classnames/bind";
import styles from "../style/components/Navigator.module.scss";
const cx = classNames.bind(styles);
const Navigator = () => {
  const items = [
    { label: "홈", icon: "pi pi-fw pi-home" },
    { label: "크루", icon: "pi pi-fw pi-calendar" },
    { label: "자유게시판", icon: "pi pi-fw pi-pencil" },
    { label: "뉴스", icon: "pi pi-fw pi-file" },
  ];

  return (
    <nav className={styles.container}>
      <div className={cx("card", "wrap")}>
        <TabMenu model={items} />
      </div>
    </nav>
  );
};

export default Navigator;
