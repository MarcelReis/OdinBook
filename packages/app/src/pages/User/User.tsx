import { useQuery } from "@apollo/client";
import { Flex, View, Image, Heading, Header } from "@adobe/react-spectrum";
import { loader } from "graphql.macro";
import { useParams } from "react-router";
import GenericLoading from "../../components/GenericLoading";
import { GetUserQuery, GetUserQueryVariables } from "../../generated/graphql";
import Post from "../../components/Post";
import { ComponentProps } from "react";

const query = loader("./GetUser.graphql");

function UserPage() {
  const { username } = useParams<{ username: string }>();
  const { loading, data, error } = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >(query, {
    variables: { username },
  });

  if (loading) {
    return <GenericLoading />;
  }

  if (!data || error) {
    return <div>Error</div>;
  }

  const posts: ComponentProps<typeof Post>[] =
    data?.user.posts?.map((post) => ({
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

  return (
    <>
      <Header>
        <View backgroundColor="blue-400" height="size-1700" position="relative">
          <View
            borderRadius="large"
            overflow="hidden"
            left="50%"
            top="size-1200"
            position="absolute"
            backgroundColor="gray-500"
            borderColor="gray-100"
            borderWidth="thicker"
            UNSAFE_style={{ transform: "translateX(-50%)" }}
          >
            <Image
              src={data.user.thumb!}
              alt="Sky and roof"
              height="size-1000"
              width="size-1000"
            />
          </View>
        </View>
        <View maxWidth="size-6000" marginX="auto" paddingTop="size-600">
          <Flex justifyContent="center">
            <Heading level={1}>
              {data.user.firstname} {data.user.surname}
            </Heading>
          </Flex>
        </View>
      </Header>
      <View maxWidth="640px" margin="auto" paddingTop="size-150">
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
    </>
  );
}

export default UserPage;
