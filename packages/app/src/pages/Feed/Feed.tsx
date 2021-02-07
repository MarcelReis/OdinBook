import React, { useState } from "react";
import { Link } from "react-router-dom";

import Post from "../../marvieUI/organisms/Post";
import { Container } from "../../marvieUI/atoms/Container";
import NewPost from "../../components/NewPost";
import { loader } from "graphql.macro";
import { useMutation, useQuery } from "@apollo/client";
import {
  CreatePostMutation,
  CreatePostMutationVariables,
  FeedPageQuery,
} from "../../generated/graphql";

const query = loader("./FeedQuery.graphql");
const createPostMutation = loader("./CreatePost.graphql");

// import * as S from "./Feed.styled";

const FeedPage = () => {
  const { data } = useQuery<FeedPageQuery>(query);
  const [createdPosts, setcreatedPosts] = useState<
    CreatePostMutation["createPost"]["posts"]
  >([]);
  const [createPost] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(createPostMutation);

  const allPosts = [...(createdPosts ?? []), ...(data?.posts ?? [])];

  return (
    <Container>
      <NewPost
        onSubmit={(content) => {
          createPost({ variables: { content } }).then((result) =>
            setcreatedPosts((state) => [
              ...(state ?? []),
              ...(result.data?.createPost.posts ?? []),
            ])
          );
        }}
      />
      {allPosts.map((post) => (
        <Post
          key={post.id}
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
