import React from "react";

import * as S from "./AddComment.styled";
import Avatar from "../../atoms/Avatar";
import { Comment } from "@styled-icons/material/Comment";

const AddComment = () => {
  return (
    <S.Container>
      <Avatar size="sm" src={"https://placekitten.com/40/40"} />
      <S.Input type="text" placeholder="Write a comment..." />
      <S.PostButton>
        <Comment />
      </S.PostButton>
    </S.Container>
  );
};

export default AddComment;
