import {
  Button,
  Flex,
  Form,
  ProgressCircle,
  Text,
  TextArea,
  View,
} from "@adobe/react-spectrum";
import { makeReference, useMutation, useQuery } from "@apollo/client";
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
      deletable: !!post.owner,
      user: {
        id: post.user.id,
        fullName: post.user.firstname + " " + post.user.surname,
        thumb: post.user.thumb!,
        username: post.user.username,
      },
    })) ?? [];

  const submit = async () => {
    const { data } = await createPost({
      variables: { content: postText },
      update(cache, result) {
        cache.modify({
          id: cache.identify(makeReference("ROOT_QUERY")),
          fields: {
            posts(currentRefs) {
              const post = result.data?.createPost.posts![0]!;
              const newRef = { __ref: `Post:${post.id}` };

              return [newRef, ...currentRefs];
            },
          },
        });
      },
    });
    if (!data || !data.createPost.posts) {
      return;
    }
    setPostText("");
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
        {posts.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </Flex>
    </View>
  );
}

export default FeedPage;
