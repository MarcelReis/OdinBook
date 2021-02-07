import React from "react";
import { Link } from "react-router-dom";

import Post from "../../marvieUI/organisms/Post";
import { Container } from "../../marvieUI/atoms/Container";
import NewPost from "../../marvieUI/organisms/NewPost";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/client";
import { FeedPageQuery } from "../../generated/graphql";

const query = loader("./FeedQuery.graphql");

// import * as S from "./Feed.styled";

const FeedPage = () => {
  const { data } = useQuery<FeedPageQuery>(query);

  return (
    <Container>
      <NewPost />
      {data?.posts.map((post) => (
        <Post
          author={{
            name: post.user.name!,
            username: post.user.username,
            thumb: "https://placekitten.com/50",
          }}
          createdAt={post.createdAt}
          content={post.content}
          comments={[]}
        />
      ))}

      <Link to="/users">Users</Link>
    </Container>
  );
};

export default FeedPage;
