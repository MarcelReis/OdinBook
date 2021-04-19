import {
  Button,
  Flex,
  Form,
  Image,
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
  >([
    {
      id: "-MYeBIrp3m9kSYyJ72f6",
      createdAt: "2021-04-19T12:53:18.987Z",
      content: "This is another test post",
      user: {
        fullName: "Marcelo Reis",
        thumb: "https://randomuser.me/api/portraits/men/17.jpg",
        username: "_marcelreis",
      },
    },
  ]);

  const { data, loading, error } = useQuery<FeedPageQuery>(query);
  const [createPost, result] = useMutation<
    CreatePostMutation,
    CreatePostMutationVariables
  >(mutation);

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

    setCreatedPosts((s) => [...s, newPost]);
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
            <View
              borderRadius="large"
              overflow="hidden"
              height="size-500"
              width="size-500"
              flexGrow={0}
              borderWidth="thick"
              borderColor="gray-100"
            >
              <Image alt="" src={data.user.thumb!} width="100%" height="100%" />
            </View>
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
      <Flex flex-direction="column" marginTop="size-150">
        {createdPosts.map((props) => (
          <Post {...props} key={props.id} />
        ))}
      </Flex>
    </View>
  );
}

export default FeedPage;
