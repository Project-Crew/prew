import React from "react";
import styles from "../../style/pages/profile/MyComments.module.scss";

import classNames from "classnames/bind";
const cx = classNames.bind(styles);
const MyComments = () => {
  const myDummyComments = [
    {
      id: 1,
      postingId: 1,
      postingTitle: "포스팅입니다",
      content: "내가 단 댓글이다~~!!",
      date: "2023.05.04",
      author: "myPost",
      likes: 15,
    },
    {
      id: 2,
      postingId: 1,
      postingTitle: "포스팅입니다1",
      content: "내가 단 댓글이다~~!!",
      date: "2023.05.04",
      author: "myPost",
      likes: 15,
    },
    {
      id: 3,
      postingId: 2,
      postingTitle: "포스팅입니다2",
      content: "내가 단 댓글이다~~!!",
      date: "2023.05.04",
      author: "myPost",
      likes: 15,
    },
    {
      id: 4,
      postingId: 3,
      postingTitle: "포스팅입니다3",
      content: "내가 단 댓글이다~~!!",
      date: "2023.05.04",
      author: "myPost",
      likes: 15,
    },
  ];
  return (
    <ul className={styles.container}>
      {myDummyComments.map((v) => (
        <li className={cx("flex py-3 align-items-center")}>
          <div className={cx("flex-1")}>
            <p className={cx("text-lg pb-2")}>{v.content}</p>
            <p className={cx("pb-1")}>
              <span className={cx("mr-1")}>게시물</span>
              <strong className={cx("mr-1")}>{v.postingTitle}</strong>에 단 댓글
            </p>
            <p className={cx("text-500")}>
              <span className={cx("mr-3")}>{v.date}</span>
              <span>추천수 {v.likes}</span>
            </p>
          </div>
          <div className={cx(styles.btnGroup)}>
            <button
              className={cx(
                "mr-2 py-1 font-medium surface-600 text-white border-none border-round-sm"
              )}
            >
              수정
            </button>
            <button
              className={cx(
                "py-1 font-medium bg-red-500 border-none text-white border-round-sm"
              )}
            >
              삭제
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MyComments;
