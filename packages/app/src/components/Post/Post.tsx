import { Flex, Heading, Text, View } from "@adobe/react-spectrum";
import Avatar from "../Avatar";

type PropsType = {
  id: string;
  content: string;
  createdAt: string;
  user: {
    fullName: string;
    thumb: string;
    username: string;
  };
};

function Post(props: PropsType) {
  return (
    <View backgroundColor="gray-200" borderRadius="regular" overflow="hidden">
      <Flex gap="size-150" margin="size-75" alignItems="center">
        <Avatar src={props.user.thumb} />
        <Flex direction="column">
          <Heading level={3} margin={0}>
            {props.user.fullName}
          </Heading>
          <Text>{props.createdAt}</Text>
        </Flex>
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
