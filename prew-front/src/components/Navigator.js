import React from "react";
import { TabMenu } from "primereact/tabmenu";

const Navigator = () => {
  const items = [
    { label: "홈", icon: "pi pi-fw pi-home" },
    { label: "크루", icon: "pi pi-fw pi-calendar" },
    { label: "자유게시판", icon: "pi pi-fw pi-pencil" },
    { label: "뉴스", icon: "pi pi-fw pi-file" },
  ];

  return (
    <div className="card">
      <TabMenu model={items} />
    </div>
  );
};

export default Navigator;
