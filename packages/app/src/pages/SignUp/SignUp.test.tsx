import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { loader } from "graphql.macro";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SignUpPage from ".";
import { FinishSignUpMutation } from "../../generated/graphql";
import { MemoryRouter } from "react-router";
import { Route, Switch } from "react-router-dom";

const mutation = loader("./FinishSignUp.graphql");

const finishSignUpSucceeded: MockedResponse<FinishSignUpMutation> = {
  request: {
    query: mutation,
    variables: {
      input: { firstname: "Marcelo", surname: "Reis", username: "marcelreis" },
    },
  },
  result: {
    data: {
      createUser: {
        id: "l9asdFSzlkvSAzxf",
        username: "marcelreis",
        firstname: "Marcelo",
        connections: [],
      },
    },
  },
};

describe("<SignUpPage/>", () => {
  it("Should not permit submission if invalid fields", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <SignUpPage />
      </MockedProvider>
    );

    userEvent.click(screen.getByRole("button"));
    expect(screen.getByRole("button")).toBeDisabled();

    userEvent.type(screen.getByLabelText(/First Name/i), "Marcelo");
    userEvent.type(screen.getByLabelText(/Last Name/i), "Reis");
    userEvent.type(screen.getByLabelText(/Username/i), "marcelreis");

    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("Should create the mutation after a valid submit and redirect to user profile", async () => {
    const username = "marcelreis";

    render(
      <MemoryRouter>
        <MockedProvider mocks={[finishSignUpSucceeded]} addTypename={false}>
          <Switch>
            <Route path={`/user/${username}`}>Success</Route>
            <Route>
              <SignUpPage />
            </Route>
          </Switch>
        </MockedProvider>
      </MemoryRouter>
    );

    userEvent.type(screen.getByLabelText(/First Name/i), "Marcelo");
    userEvent.type(screen.getByLabelText(/Last Name/i), "Reis");
    userEvent.type(screen.getByLabelText(/Username/i), username);

    const button = screen.getByRole("button");
    expect(button).toBeEnabled();

    userEvent.click(button);

    expect(await screen.findByText("Loading...")).toBeInTheDocument();

    expect(await screen.findByText("Success")).toBeInTheDocument();
  });
});
