import React, { useState } from "react";
import ProfileLayout from "../../components/ProfileLayout";
import ProfileUserInfo from "./ProfileUserInfo";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import styles from "../../style/pages/profile/ChangeUserInfo.module.scss";
import classNames from "classnames/bind";
import { useForm } from "react-hook-form";

const cx = classNames.bind(styles);

const ChangeUserInfo = () => {
  const [curPwView, setCurPwView] = useState(false);
  const [newPwView, setNewPwView] = useState(false);
  const [newCheckPwView, setNewCheckPwView] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <ProfileLayout checkUser={true}>
      <div className={styles.container}>
        <form
          className="flex flex-column w-7 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label for="nickname">닉네임 변경</label>
          <div className="flex">
            <InputText
              type="text"
              id="nickname"
              className="mr-3 flex-1"
              {...register("nickname")}
            />
            <Button
              type="button"
              label="중복확인"
              className={cx(
                styles.reCheckBtn,
                "text-center px-3 text-base font-normal"
              )}
            />
          </div>
          <label for="curPassword" className="mt-4">
            현재 비밀번호
          </label>
          <div className="p-input-icon-right w-full">
            <i
              className="pi pi-eye"
              onMouseDown={() => setCurPwView(true)}
              onMouseUp={() => setCurPwView(false)}
            />
            <InputText
              type={curPwView ? "text" : "password"}
              id="curPassword"
              className="w-full"
              {...register("curPassword")}
            />
          </div>
          <label for="newPassword" className="mt-2">
            새 비밀번호
          </label>
          <div className="p-input-icon-right">
            <i
              className="pi pi-eye"
              onMouseDown={() => setNewPwView(true)}
              onMouseUp={() => setNewPwView(false)}
            />
            <InputText
              type={newPwView ? "text" : "password"}
              id="newPassword"
              className="w-full"
              {...register("newPassword")}
            />
          </div>
          <label for="checkNewPassword" className="mt-2">
            새 비밀번호 확인
          </label>
          <div className="p-input-icon-right">
            <i
              className="pi pi-eye"
              onMouseDown={() => setNewCheckPwView(true)}
              onMouseUp={() => setNewCheckPwView(false)}
            />
            <InputText
              type={newCheckPwView ? "text" : "password"}
              id="checkNewPassword"
              className="w-full"
              {...register("checkNewPassword")}
            />
          </div>
          <Button type="submit" label="저장" className="mt-3" />
        </form>
      </div>
    </ProfileLayout>
  );
};

export default ChangeUserInfo;
