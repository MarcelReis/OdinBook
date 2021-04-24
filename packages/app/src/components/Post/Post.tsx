import { ActionButton, Flex, Heading, Text, View } from "@adobe/react-spectrum";
import { Link } from "react-router-dom";
import Delete from "@spectrum-icons/workflow/Delete";
import { loader } from "graphql.macro";

import Avatar from "../Avatar";
import { useMutation } from "@apollo/client";
import {
  DeleteUserPostMutation,
  DeleteUserPostMutationVariables,
} from "../../generated/graphql";

type PostProps = {
  id: string;
  deletable?: boolean;
  content: string;
  createdAt: string;
  user: {
    fullName: string;
    thumb: string;
    username: string;
  };
};

const DELETE_USER_POST = loader("./DeletePost.graphql");

function Post(props: PostProps) {
  const [deleteUserPostMutation] = useMutation<
    DeleteUserPostMutation,
    DeleteUserPostMutationVariables
  >(DELETE_USER_POST);

  const deletePost = () => {
    deleteUserPostMutation({
      variables: { id: props.id },
      update(cache) {
        cache.evict({ id: `Post:${props.id}` });
      },
    });
  };

  return (
    <View backgroundColor="gray-200" borderRadius="regular" overflow="hidden">
      <Flex gap="size-150" margin="size-75" alignItems="center">
        <Avatar src={props.user.thumb} username={props.user.username} />
        <Flex direction="column">
          <Heading level={3} margin={0}>
            <Link
              to={`/user/${props.user.username}/`}
              style={{ textDecoration: "none" }}
            >
              {props.user.fullName}
            </Link>
          </Heading>
          <Text>{props.createdAt}</Text>
        </Flex>
        {props.deletable ? (
          <ActionButton
            marginStart="auto"
            aria-label="Delete Post"
            onPress={deletePost}
          >
            <Delete />
          </ActionButton>
        ) : (
          <></>
        )}
      </Flex>
      <View
        marginTop="size-150"
        padding="size-150"
        UNSAFE_style={{ fontSize: "20px" }}
        backgroundColor="gray-75"
      >
        {props.content}
      </View>
    </View>
  );
}

export default Post;
