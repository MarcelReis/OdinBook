import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ConnectionStatus,
  UserPageQuery,
  UserPageQueryVariables,
} from "../../generated/graphql";
import { Container } from "../../marvieUI/atoms/Container";
import Typography from "../../marvieUI/atoms/Typography";

import * as S from "./User.styled";

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
    return <div>Error!</div>;
  }

  const acceptedConnections =
    data.user.connections?.filter(
      ({ status }) => status === ConnectionStatus.Connected
    ) ?? [];

  return (
    <>
      <S.Header>
        <S.Image>
          <img
            src={data.user.thumb || "https://placekitten.com/250/250"}
            alt=""
          />
        </S.Image>
      </S.Header>

      <Container>
        <Typography as="h1" scale="heading4" textAlign="center">
          {data.user.name}
        </Typography>

        {data.user.connectionStatus === ConnectionStatus.Connected && (
          <div>Friends</div>
        )}

        {data.user.connectionStatus === ConnectionStatus.Waiting && (
          <div>Friend request sent</div>
        )}

        {data.user.connectionStatus === ConnectionStatus.Pending && (
          <div>Pending friend request</div>
        )}

        <div>
          <header>Friends: {acceptedConnections.length}</header>
          <ul>
            {acceptedConnections.map((connection) => (
              <li key={connection.id}>
                <Link to={`/${connection.user.username}`}>
                  <img
                    src={connection.user.thumb ?? "https://placekitten.com/50"}
                    alt=""
                  />
                  {connection.user.firstname} {connection.user.surname}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
};

export default UserPage;
