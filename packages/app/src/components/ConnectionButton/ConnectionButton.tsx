import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import React from "react";
import {
  ConnectionStatus,
  CreateFriendConnectionMutation,
  CreateFriendConnectionMutationVariables,
} from "../../generated/graphql";

import { Clear } from "@styled-icons/material/Clear";
import { Check } from "@styled-icons/material/Check";

import Button from "../../marvieUI/atoms/Button";

const createConnectionMutation = loader("./CreateFriendConnection.graphql");

type PropsType = {
  status?: ConnectionStatus | null | undefined;
  username: string;
};

function ConnectionButton(props: PropsType) {
  const [createConnection] = useMutation<
    CreateFriendConnectionMutation,
    CreateFriendConnectionMutationVariables
  >(createConnectionMutation);

  if (props.status === ConnectionStatus.Connected) {
    return <div>Friends</div>;
  }

  if (props.status === ConnectionStatus.Waiting) {
    return <div>Pending</div>;
  }

  if (props.status === ConnectionStatus.Pending) {
    return (
      <div>
        <Button
          square
          color="green"
          variant="primary"
          onClick={() => alert("In development")}
          title="Accept"
        >
          <Check />
          Accept
        </Button>
        <Button
          square
          color="red"
          variant="secondary"
          onClick={() => alert("In development")}
          title="Refuse"
        >
          <Clear />
          Refuse
        </Button>
      </div>
    );
  }

  if (props.status !== ConnectionStatus.Self)
    return (
      <Button
        color="blue"
        onClick={() =>
          createConnection({
            variables: { input: { username: props.username } },
          })
        }
      >
        Add Friend
      </Button>
    );

  return null;
}

export default ConnectionButton;
