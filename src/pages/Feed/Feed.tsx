import React from "react";

import NewPost from "../../marvieUI/organisms/NewPost";

import * as S from "./Feed.styled";

const FeedPage = () => {
  return (
    <S.Container>
      <NewPost />
    </S.Container>
  );
};

export default FeedPage;
