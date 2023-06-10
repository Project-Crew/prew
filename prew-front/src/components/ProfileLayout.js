import React from "react";
import ProfileUserInfo from "../pages/profile/ProfileUserInfo";
import styles from "../style/components/ProfileLayout.module.scss";

const ProfileLayout = ({ children, checkUser }) => {
  return (
    <div className={styles.container}>
      <ProfileUserInfo checkUser={checkUser} />
      {children}
    </div>
  );
};

export default ProfileLayout;
