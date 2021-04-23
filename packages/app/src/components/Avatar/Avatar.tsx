import { View, Image } from "@adobe/react-spectrum";

type AvatarProps = {
  src: string;
};

function Avatar(props: AvatarProps) {
  return (
    <View
      borderRadius="large"
      overflow="hidden"
      height="size-500"
      width="size-500"
      flexGrow={0}
      borderWidth="thick"
      borderColor="gray-100"
    >
      <Image alt="" src={props.src} width="100%" height="100%" />
    </View>
  );
}

export default Avatar;
