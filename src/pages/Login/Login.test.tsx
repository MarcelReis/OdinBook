import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

import LoginPage, { mutationCreateAccount, queryCreateAccount } from "./Login";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  QueryCreateAccountQuery,
} from "../../generated/graphql";

const queryMock: MockedResponse<QueryCreateAccountQuery> = {
  request: {
    query: queryCreateAccount,
  },
  result: {
    data: {
      deities: [
        {
          id: "1",
          name: "Thor",
          uri: "thor",
        },
        {
          id: "2",
          name: "Odin",
          uri: "odin",
        },
        {
          id: "3",
          name: "Loki",
          uri: "loki",
        },
        {
          id: "4",
          name: "Freya",
          uri: "freya",
        },
      ],
    },
  },
};

const mutationVariables: CreateAccountMutationVariables = {
  firstName: "Marcelo",
  surname: "Reis",
  password: "123456",
  deityID: "1",
};

const mutationMock: MockedResponse<CreateAccountMutation> = {
  request: {
    query: mutationCreateAccount,
    variables: mutationVariables,
  },
  result: {
    data: {
      createAccount: {
        id: "",
        username: "_marcelreis",
      },
    },
  },
};

describe("The <LoginPage />", () => {
  const setup = () =>
    render(
      <MockedProvider mocks={[queryMock, mutationMock]} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

  const getCreateAccountButton = () =>
    screen.getByRole("button", { name: /create new account/i });

  it("Should render the login inputs", () => {
    setup();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(getCreateAccountButton()).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create new account/i })
    ).toBeInTheDocument();
  });

  describe("When clicking the create new account", () => {
    it("Should render the form to create account", async () => {
      setup();

      await waitFor(() => {
        userEvent.click(getCreateAccountButton());
      });

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/surname/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/deity/i)).toBeInTheDocument();

      expect(screen.getAllByLabelText(/password/i)[0]).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: /create$/i })
      ).toBeInTheDocument();
    });

    it("Should load the currently available deities", async () => {
      setup();

      userEvent.click(getCreateAccountButton());

      const deitiesSelect = screen.getByLabelText(/deity/i);

      expect(deitiesSelect).toBeDisabled();
      expect(deitiesSelect).toHaveTextContent(/loading/i);

      await waitFor(() => {
        expect(
          screen.getByRole("option", { name: /thor/i })
        ).toBeInTheDocument();
      });
    });
  });

  describe("When submiting the create account", () => {
    it("Should execute the mutation", () => {});
  });
});
