import {
  Button,
  Flex,
  Form,
  ProgressCircle,
  Text,
  TextArea,
  View,
} from "@adobe/react-spectrum";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { ComponentProps, useState } from "react";

import GenericError from "../../components/GenericError";
import GenericLoading from "../../components/GenericLoading";
import Post from "../../components/Post";
import Avatar from "../../components/Avatar";

import {
  FeedPageQuery,
  CreatePostMutation,
  CreatePostMutationVariables,
} from "../../generated/graphql";

const query = loader("./FeedPage.graphql");
const mutation = loader("./CreatePost.graphql");

function FeedPage() {
  const [postText, setPostText] = useState("");
  const [createdPosts, setCreatedPosts] = useState<
    ComponentProps<typeof Post>[]
  >([]);

  const { data, loading, error } = useQuery<FeedPageQuery>(query);
  const [createPost, result] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(mutation);

  const posts: ComponentProps<typeof Post>[] =
    data?.posts.map((post) => ({
      id: post.id,
      content: post.content,
      createdAt: post.createdAt,
      user: {
        id: post.user.id,
        fullName: post.user.firstname + " " + post.user.surname,
        thumb: post.user.thumb!,
        username: post.user.username,
      },
    })) ?? [];

  const submit = async () => {
    const { data } = await createPost({ variables: { content: postText } });
    if (!data || !data.createPost.posts) {
      return;
    }
    setPostText("");

    const newPost: ComponentProps<typeof Post> = {
      id: data.createPost.posts[0].id,
      createdAt: data.createPost.posts[0].createdAt,
      content: data.createPost.posts[0].content,
      user: {
        fullName:
          data.createPost.posts[0].user.firstname +
          " " +
          data.createPost.posts[0].user.surname,
        thumb: data.createPost.posts[0].user.thumb!,
        username: "",
      },
    };

    setCreatedPosts((s) => [newPost, ...s]);
  };

  if (loading) {
    return <GenericLoading />;
  }

  if (!data || error) {
    return <GenericError />;
  }

  return (
    <View maxWidth="640px" margin="auto" paddingTop="size-150">
      <View
        backgroundColor="gray-200"
        padding="size-75"
        marginX="size-75"
        borderRadius="regular"
        overflow="hidden"
      >
        <Form isDisabled={result.loading}>
          <Flex alignItems="center" gap="size-150">
            <Avatar src={data.user.thumb!} />

            <TextArea
              aria-label="Create a post"
              label=""
              placeholder="Write something..."
              flexGrow={1}
              isQuiet
              value={postText}
              onChange={setPostText}
            />
          </Flex>
          <Flex
            marginTop="size-150"
            justifyContent="end"
            alignItems="center"
            gap="size-150"
          >
            {result.loading ? (
              <View>
                <Text>
                  <ProgressCircle
                    aria-label="Loading..."
                    isIndeterminate
                    size="S"
                    margin="0px 7px -2px 0px"
                  />
                  Posting...
                </Text>
              </View>
            ) : (
              <></>
            )}

            <Button justifySelf="flex-end" variant="cta" onPress={submit}>
              Post
            </Button>
          </Flex>
        </Form>
      </View>
      <Flex
        direction="column"
        marginY="size-150"
        marginX="size-75"
        gap="size-150"
      >
        <>
          {createdPosts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </>
        <>
          {posts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </>
      </Flex>
    </View>
  );
}

export default FeedPage;
