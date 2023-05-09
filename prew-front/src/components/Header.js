import React from "react";
import styles from "../style/components/Header.module.scss";
import { InputText } from "primereact/inputtext";

const Header = () => {
  return (
    <div className="flex align-items-center">
      <h2 className={styles.logo}>
        <span className={styles.logoColor}>PREW</span>
      </h2>
      <div className="ml-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="통합 검색" />
        </span>
      </div>
    </div>
  );
};

export default Header;
