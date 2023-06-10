import React from "react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { BsPencil } from "react-icons/bs";
import styles from "../../style/pages/profile/ProfileUserInfo.module.scss";
import classNames from "classnames/bind";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
const ProfileUserInfo = ({ checkUser }) => {
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
            <Button className="mr-3 p-0">
              {checkUser ? (
                <Link
                  to="/profile"
                  className="text-white text-sm font-semibold w-full py-2 px-3"
                >
                  프로필로 돌아가기
                </Link>
              ) : (
                <Link
                  to="/profile/check-password"
                  className="text-white text-sm font-semibold w-full py-2 px-3"
                >
                  회원 정보 수정
                </Link>
              )}
            </Button>
          </div>
        </div>
      </div>
      <p className="mt-5">이름</p>
    </div>
  );
};

export default ProfileUserInfo;
