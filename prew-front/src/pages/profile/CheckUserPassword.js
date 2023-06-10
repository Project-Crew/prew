import React from "react";
import ProfileLayout from "../../components/ProfileLayout";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CheckUserPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    if (data.userPassword === "1234") {
      navigate("/profile/change-password");
      //임시 비밀번호
    }
  };
  return (
    <ProfileLayout checkUser={true}>
      <div className="border-top-2 surface-border py-8">
        <p className="text-center text-lg font-semibold">비밀번호 입력</p>
        <form
          className="flex flex-column w-7 mt-3 mx-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="password"
            className="h-3rem text-lg"
            {...register("userPassword", { required: true })}
          />
          {errors.userPassword && (
            <div className="text-sm text-red-600">비밀번호를 입력해주세요</div>
          )}
          <Button
            type="submit"
            label="확인"
            className="font-semibold mt-5 h-3rem"
          />
          <Button
            type="button"
            severity="secondary"
            outlined
            className="mt-2 p-0 h-3rem"
          >
            <Link
              className="w-full h-full flex align-items-center justify-content-center font-semibold py-2 px-3"
              to="/profile"
            >
              취소
            </Link>
          </Button>
        </form>
      </div>
    </ProfileLayout>
  );
};

export default CheckUserPassword;
