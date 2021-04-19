import { View } from "@adobe/react-spectrum";

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
    <View
      backgroundColor="gray-200"
      padding="size-75"
      marginX="size-75"
      borderRadius="regular"
      overflow="hidden"
      width="100%"
    >
      {props.content}
    </View>
  );
}

export default Post;
