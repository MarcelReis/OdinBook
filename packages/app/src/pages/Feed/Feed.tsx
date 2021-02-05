import React from "react";
import { Link } from "react-router-dom";

import Post from "../../marvieUI/organisms/Post";
import { Container } from "../../marvieUI/atoms/Container";
import NewPost from "../../marvieUI/organisms/NewPost";

// import * as S from "./Feed.styled";

const FeedPage = () => {
  return (
    <Container>
      <NewPost />
      <Post />
      <Link to="/users">Users</Link>
    </Container>
  );
};

export default FeedPage;
