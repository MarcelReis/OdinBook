import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { useParams } from "react-router-dom";
import { UserPageQuery, UserPageQueryVariables } from "../../generated/graphql";

export const query = loader("./UserPage.graphql");

const UserPage = () => {
  const { user: username } = useParams<{ user: string }>();

  const { data, loading, error } = useQuery<
    UserPageQuery,
    UserPageQueryVariables
  >(query, {
    variables: { username },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Not found</div>;
  }

  return (
    <div>
      <h1>{data.user.name}</h1>

      <img src={data.user.thumb || "https://placekitten.com/50/50"} alt="" />

      <div>
        <header>Friends: {data.user.friends.length}</header>
        <ul>
          {data.user.friends.map((friend) => (
            <li>{friend.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
