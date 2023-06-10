import React from "react";

import { TabView, TabPanel } from "primereact/tabview";
import MyPosts from "./MyPosts";
import MyScraps from "./MyScraps";
import MyLikePosts from "./MyLikePosts";
import MyComments from "./MyComments";
import styles from "../../style/pages/profile/Profile.module.scss";
import ProfileLayout from "../../components/ProfileLayout";

const Profile = () => {
  return (
    <ProfileLayout checkUser={false}>
      <div className={styles.container}>
        <TabView>
          <TabPanel header="게시물">
            <MyPosts />
          </TabPanel>
          <TabPanel header="스크랩">
            <MyScraps />
          </TabPanel>
          <TabPanel header="추천한 게시물">
            <MyLikePosts />
          </TabPanel>
          <TabPanel header="작성한 댓글">
            <MyComments />
          </TabPanel>
        </TabView>
      </div>
    </ProfileLayout>
  );
};

export default Profile;
