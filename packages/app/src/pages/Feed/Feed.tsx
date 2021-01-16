import React from "react";

import NewPost from "../../marvieUI/organisms/NewPost";

import * as S from "./Feed.styled";

import Post from "../../marvieUI/organisms/Post";

const FeedPage = () => {
  return (
    <S.Container>
      <NewPost />
      <Post />
    </S.Container>
  );
};

export default FeedPage;
