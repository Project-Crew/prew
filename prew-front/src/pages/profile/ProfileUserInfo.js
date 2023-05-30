import React from "react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { BsPencil } from "react-icons/bs";
import styles from "../../style/pages/profile/ProfileUserInfo.module.scss";
import classNames from "classnames/bind";
import { Button } from "primereact/button";
const cx = classNames.bind(styles);
const ProfileUserInfo = () => {
  return (
    <div className="pt-8 pb-5">
      <div className="h-8rem flex align-items-center">
        <div className={cx(styles.avatarContainer)}>
          <div className={styles.avatar}>
            <Avatar
              className="w-8rem h-8rem"
              icon="pi pi-user"
              size="xlarge"
              shape="circle"
            />
            <div className={cx("badge")}>
              <BsPencil />
            </div>
          </div>
        </div>

        <div className="ml-8 h-full flex flex-column justify-content-between">
          <p>닉네임</p>
          <div>
            <span className="mr-5">게시물 10</span>
            <span className="mr-5">스크랩 5</span>
            <span className="mr-5">클릭한 추천 수 11</span>
            <span className="mr-5">작성한 댓글 수 5</span>
          </div>
          <div>eunhee@naver.com</div>
          <div>
            <Button
              className="mr-3 py-2 text-sm"
              label="비밀번호 변경하러 가기"
            />
            <Button className="py-2 text-sm" label="닉네임 변경하러 가기" />
          </div>
        </div>
      </div>
      <p className="mt-5">이름</p>
    </div>
  );
};

export default ProfileUserInfo;
