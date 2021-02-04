import React from "react";

import Post from "../../marvieUI/organisms/Post";
import { Container } from "../../marvieUI/atoms/Container";
import NewPost from "../../marvieUI/organisms/NewPost";

// import * as S from "./Feed.styled";

const FeedPage = () => {
  return (
    <Container>
      <NewPost />
      <Post />
    </Container>
  );
};

export default FeedPage;
