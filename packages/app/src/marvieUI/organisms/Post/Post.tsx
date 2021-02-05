import React from "react";
import { Link } from "react-router-dom";
import { User_Full } from "../../../generated/graphql";

import * as S from "./Post.styled";
import Avatar from "../../Avatar";
import AddComment from "../AddComment/AddComment";

import { Comment } from "@styled-icons/material/Comment";
import { Favorite } from "@styled-icons/material/Favorite";
import { FavoriteBorder } from "@styled-icons/material/FavoriteBorder";

export type PostProps = {
  user: Pick<User_Full, "name" | "thumb" | "username">;
  liked: boolean;
  datetime: string;
  content: string;
  likes: number;
  comments: any;
};

export const fakeProps: PostProps = {
  user: {
    name: "Marcelo Reis",
    thumb: "https://placekitten.com/41/",
    username: "marcelreis",
  },
  liked: false,
  datetime: "20 April at 4:20 PM",
  content: "hello world",
  likes: 3,
  comments: [],
};

const Post = () => {
  const props = fakeProps;

  return (
    <S.Container>
      <S.Header>
        <Avatar src={props.user.thumb ?? ""} alt="" />
        <S.HeaderText>
          <S.Name>
            <Link to={`/${props.user.username}`}>{props.user.name}</Link>
          </S.Name>
          <S.Datetime>{props.datetime}</S.Datetime>
        </S.HeaderText>
      </S.Header>

      <S.Content>
        We’re interested in your ideas and would be glad to build something
        bigger out of it. Share your ideas about features/design and we’ll bring
        them on to our full case of this product design.
      </S.Content>

      <S.Interactions>
        <S.Interaction>
          <Comment size={"24px"} /> {props.comments.length} Comments
        </S.Interaction>
        <S.Interaction>
          {props.liked ? (
            <Favorite size={"24px"} />
          ) : (
            <FavoriteBorder size={"24px"} />
          )}
          {props.likes} Likes
        </S.Interaction>
      </S.Interactions>

      <AddComment />
    </S.Container>
  );
};

export default Post;
