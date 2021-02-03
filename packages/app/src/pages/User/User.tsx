import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ConnectionStatus,
  UserPageQuery,
  UserPageQueryVariables,
} from "../../generated/graphql";

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

  const acceptedConnections = data.user.connections.filter(
    ({ status }) => status === ConnectionStatus.Connected
  );

  return (
    <div>
      <h1>{data.user.name}</h1>

      <img src={data.user.thumb || "https://placekitten.com/50/50"} alt="" />

      <div>
        <header>Friends: {acceptedConnections.length}</header>
        <ul>
          {acceptedConnections.map((connection) => (
            <li>
              <Link to={`/${connection.user.username}`}>
                {connection.user.firstname} {connection.user.surname}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
