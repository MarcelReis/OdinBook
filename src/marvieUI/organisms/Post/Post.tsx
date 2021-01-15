import React from "react";
import { User, Comment } from "../../../generated/graphql";
import Divisor from "../../atoms/Divisor";

import * as S from "./Post.styled";

export type PostProps = {
  user: Pick<User, "name" | "thumb" | "username">;
  datetime: string;
  content: string;
  comments: Pick<Comment, "user" | "datetime" | "content" | "likes">;
};

const Post = (props: PostProps) => {
  return (
    <S.Container>
      <header>
        <img src="https://placekitten.com/48/48" alt="" />
        <p>{props.user.name}</p>
        <p>{props.datetime}</p>
      </header>

      <Divisor />
    </S.Container>
  );
};

export default Post;
