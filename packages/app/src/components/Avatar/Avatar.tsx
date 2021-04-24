import { View, Image } from "@adobe/react-spectrum";
import { Link } from "react-router-dom";

type AvatarProps = {
  src: string;
  username?: string;
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
      {props.username ? (
        <Link
          to={`/user/${props.username}/`}
          style={{ textDecoration: "none" }}
        >
          <Image alt="" src={props.src} width="100%" height="100%" />
        </Link>
      ) : (
        <Image alt="" src={props.src} width="100%" height="100%" />
      )}
    </View>
  );
}

export default Avatar;
