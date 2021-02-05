import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";

import * as S from "./Users.styled";

import { Container } from "../../marvieUI/atoms/Container";
import Avatar from "../../marvieUI/Avatar";
import Typography from "../../marvieUI/atoms/Typography";

import ConnectionButton from "../../components/ConnectionButton";
import { GetUsersQuery } from "../../generated/graphql";

const query = loader("./Users.graphql");

const getUser = () => Math.ceil(Math.random() * 100);

function UsersPage() {
  const { data, loading, error } = useQuery<GetUsersQuery>(query);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error!</div>;
  }

  return (
    <Container>
      <ul>
        {data.users.map((user) => (
          <S.ListItem key={user.username}>
            <Avatar
              alt=""
              size="lg"
              src={`https://randomuser.me/api/portraits/${
                Math.random() > 0.5 ? "women" : "men"
              }/${getUser()}.jpg`}
            />

            <Link to={`/${user.username}`}>
              <Typography scale="subtitle1">
                {user.firstname} {user.surname}
              </Typography>
            </Link>
            <ConnectionButton
              status={user.connectionStatus}
              username={user.username}
            />
          </S.ListItem>
        ))}
      </ul>
    </Container>
  );
}

export default UsersPage;
