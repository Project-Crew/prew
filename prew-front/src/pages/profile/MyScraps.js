import React from "react";
import NoPosts from "../../components/NoPosts";
import classNames from "classnames/bind";
import styles from "../../style/pages/profile/MyScraps.module.scss";

const cx = classNames.bind(styles);
const MyScraps = () => {
  const dummyPosts = [
    {
      id: 1,
      topic: "프로젝트",
      title: "내가쓴 게시물 제목이다.1",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "myPost",
      total_personnel: 3,
      now_personnel: 1,
      place: "오프라인",
      skill: ["django", "backend"],
      expired_date: "2023.06.01(목)",
    },
    {
      id: 2,
      topic: "스터디",
      title: "내가쓴 게시물 제목이다.2",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "eun",
      total_personnel: 3,
      now_personnel: 1,
      place: "오프라인",
      skill: ["django", "backend"],
      expired_date: "2023.06.01(목)",
    },
    {
      id: 3,
      topic: "공모전",
      title: "내가쓴 게시물 제목이다.3",
      content: "게시물 내용",
      date: "2023.05.04",
      author: "h",
      total_personnel: 3,
      now_personnel: 1,
      place: "오프라인",
      skill: ["django", "backend"],
      expired_date: "2023.06.01(목)",
    },
    {
      id: 4,
      topic: "프로젝트",
      title: `내가쓴 게시물 제목이다.
      내가쓴 게시물 제목이다.
        내가쓴 게시물 제목이다.
        내가쓴 게시물 제목이다.내가쓴 게시물 제목이다.`,
      content: "게시물 내용",
      date: "2023.05.04",
      author: "myPost",
      total_personnel: 3,
      now_personnel: 1,
      place: "오프라인",
      skill: ["django", "backend"],
      expired_date: "2023.06.01(목)",
    },
  ];
  return (
    <ul>
      {dummyPosts.length > 0 ? (
        dummyPosts.map((v) => (
          <li className={cx()}>
            <div>
              <p>{v.topic}</p>
              <p>
                {v.title.length > 50 ? v.title.slice(0, 50) + "..." : v.title}
              </p>
              <p>
                <span>모집 입원 {v.total_personnel}</span>
                <span>{v.place}</span>
                <span>{v.skill.length > 0 && v.skill[0]}</span>
              </p>
            </div>
            <div>
              <p>~{v.expired_date}</p>
              <p>
                모집된 인원 {v.now_personnel}/{v.total_personnel}
              </p>
            </div>
          </li>
        ))
      ) : (
        <NoPosts />
      )}
    </ul>
  );
};

export default MyScraps;
