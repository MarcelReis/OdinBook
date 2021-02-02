import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { GetUsersQuery } from "../../generated/graphql";

const query = loader("./Users.graphql");

function UsersPage() {
  const { data, loading, error } = useQuery<GetUsersQuery>(query);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error</div>;
  }

  return (
    <ul>
      {data.users.map((user) => (
        <li key={user.username}>
          <Link to={`/${user.username}`}>
            {user.firstname} {user.surname}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default UsersPage;
