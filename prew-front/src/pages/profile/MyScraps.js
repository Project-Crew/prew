import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import NoPosts from "../../components/NoPosts";
import classNames from "classnames/bind";
import styles from "../../style/pages/profile/MyScraps.module.scss";

import { Checkbox } from "primereact/checkbox";

const cx = classNames.bind(styles);
const MyScraps = () => {
  const [selected, setSelected] = useState([]);
  const onSelectedChange = (e) => {
    let _selectedCategories = [...selected];

    if (e.checked) {
      _selectedCategories.push(e.value);
    } else
      _selectedCategories = _selectedCategories.filter(
        (category) => category.id !== e.value.id
      );

    setSelected(_selectedCategories);
  };
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
    <ul className={styles.container}>
      {dummyPosts.length > 0 ? (
        dummyPosts.map((v) => (
          <li className={cx("flex py-3")}>
            <div key={v.id} className="flex align-items-center pr-4">
              {/* <input type="checkbox" /> */}
              {/* <Controller
                name="checkbox"
                control={control}
                render={({ field }) => <Checkbox {...field} />}
              /> */}
              <Checkbox
                inputId={v.id}
                name="category"
                value={v}
                onChange={onSelectedChange}
                checked={selected.some((item) => item.id === v.id)}
              />
            </div>
            <div className={cx("flex-1 line-height-4")}>
              <p>{v.topic}</p>
              <p className={cx("font-semibold")}>
                {v.title.length > 50 ? v.title.slice(0, 50) + "..." : v.title}
              </p>
              <p>
                <span className="pr-2">모집 입원 {v.total_personnel}명</span>
                <span className="pr-2">{v.place}</span>
                <span>{v.skill.length > 0 && v.skill[0]}</span>
              </p>
            </div>
            <div
              className={cx(
                "flex flex-column justify-content-center text-right text-500"
              )}
            >
              <p className={cx("py-1")}>~{v.expired_date}</p>
              <p className={cx("py-1")}>
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
