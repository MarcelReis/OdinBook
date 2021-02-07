import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as S from "./Post.styled";
import Avatar from "../../Avatar";
import AddComment from "../AddComment/AddComment";

import { Comment } from "@styled-icons/material/Comment";
import { Favorite } from "@styled-icons/material/Favorite";
import { FavoriteBorder } from "@styled-icons/material/FavoriteBorder";

export type PropsType = {
  author: {
    name: string;
    username: string;
    thumb: string;
  };
  createdAt: string;
  content: string;
  comments: unknown[];
};

const Post = (props: PropsType) => {
  const [liked, setLiked] = useState(false);

  return (
    <S.Container>
      <S.Header>
        <Avatar src={props.author.thumb} alt="" />
        <S.HeaderText>
          <S.Name>
            <Link to={`/${props.author.username}`}>{props.author.name}</Link>
          </S.Name>
          <S.Datetime>{new Date(props.createdAt).toLocaleString()}</S.Datetime>
        </S.HeaderText>
      </S.Header>

      <S.Content>{props.content}</S.Content>

      <S.Interactions>
        <S.Interaction>
          <Comment size={"24px"} /> {props.comments.length} Comments
        </S.Interaction>
        <S.Interaction>
          {liked ? (
            <Favorite size={"24px"} onClick={() => setLiked((s) => !s)} />
          ) : (
            <FavoriteBorder size={"24px"} onClick={() => setLiked((s) => !s)} />
          )}
        </S.Interaction>
      </S.Interactions>

      <AddComment />
    </S.Container>
  );
};

export default Post;
