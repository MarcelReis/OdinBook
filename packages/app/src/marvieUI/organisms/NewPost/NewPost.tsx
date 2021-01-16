import React from "react";
import { Send } from "@styled-icons/material/Send";

import * as S from "./NewPost.styled";
import Avatar from "../../atoms/Avatar";

const NewPost = () => {
  return (
    <S.Container>
      <Avatar src={"https://placekitten.com/40/40"} />
      <S.Input type="text" />
      <S.PostButton>
        <Send />
      </S.PostButton>
    </S.Container>
  );
};

export default NewPost;
