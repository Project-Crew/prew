import React, { useEffect, useState } from "react";
import styles from "../../style/pages/profile/MyPosts.module.scss";
import classNames from "classnames/bind";
import { Tooltip } from "primereact/tooltip";
import NoPosts from "../../components/NoPosts";
const cx = classNames.bind(styles);
const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const dummyPosts = [
    {
      id: 1,
      title: "내가쓴 게시물 제목이다.1",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "myPost",
    },
    {
      id: 2,
      title: "내가쓴 게시물 제목이다.2",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "eun",
    },
    {
      id: 3,
      title: "내가쓴 게시물 제목이다.3",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "h",
    },
    {
      id: 4,
      title: `내가쓴 게시물 제목이다.
      내가쓴 게시물 제목이다.
        내가쓴 게시물 제목이다.
        내가쓴 게시물 제목이다.내가쓴 게시물 제목이다.`,
      content: "게시물 내용",
      date: "2023.05.04",
      author: "myPost",
    },
  ];
  useEffect(() => {
    const posts = dummyPosts.filter((v) => v.author === "myPost");
    setMyPosts(posts);
  }, []);

  return (
    <ul className={styles.container}>
      {myPosts.length > 0 ? (
        myPosts.map((v) => (
          <li className="flex target py-3">
            <Tooltip target={`.title${v.id}`} mouseTrack>
              {v.title}
            </Tooltip>
            <span className={cx("flex-1", `title${v.id}`, styles.title)}>
              {v.title.length > 50 ? v.title.slice(0, 50) + "..." : v.title}
            </span>
            <span className={styles.date}>{v.date}</span>
          </li>
        ))
      ) : (
        <NoPosts />
      )}
    </ul>
  );
};

export default MyPosts;
