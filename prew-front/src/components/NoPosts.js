import React from "react";
import { BsPencilSquare } from "react-icons/bs";
const NoPosts = () => {
  return (
    <div className="flex flex-column justify-content-center text-center">
      <div className="pt-7 pb-3">
        <BsPencilSquare className="text-7xl" />
      </div>
      <h3 className="pb-2">게시물이 존재하지 않습니다.</h3>
      <a href="#" className="text-primary no-underline">
        게시물 쓰러 가기
      </a>
    </div>
  );
};

export default NoPosts;
