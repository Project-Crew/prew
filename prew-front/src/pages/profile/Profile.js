import React from "react";
import ProfileUserInfo from "./ProfileUserInfo";

import { TabView, TabPanel } from "primereact/tabview";
import MyPosts from "./MyPosts";
import MyScrap from "./MyScrap";
import MyLikePosts from "./MyLikePosts";
import MyComments from "./MyComments";
import styles from "../../style/pages/profile/Profile.module.scss";

const Profile = () => {
  return (
    <div className={styles.container}>
      <ProfileUserInfo />
      <TabView>
        <TabPanel header="게시물">
          <MyPosts />
        </TabPanel>
        <TabPanel header="스크랩">
          <MyScrap />
        </TabPanel>
        <TabPanel header="추천한 게시물">
          <MyLikePosts />
        </TabPanel>
        <TabPanel header="작성한 댓글">
          <MyComments />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default Profile;
