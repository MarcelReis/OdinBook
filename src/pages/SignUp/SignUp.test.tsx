import { render, screen, waitFor } from "../../setupTests";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";

import SignUp, { mutationCreateAccount, queryCreateAccount } from "./SignUp";
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
  email: "test@marcelreis.dev",
  password: "123456",
  deityID: "thor",
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

describe("The <SignUpPage />", () => {
  const setup = () =>
    render(
      <MockedProvider mocks={[queryMock, mutationMock]} addTypename={false}>
        <SignUp />
      </MockedProvider>
    );

  describe("When clicking the create new account", () => {
    it("Should load the currently available deities", async () => {
      setup();

      const deitiesSelect = screen.getByLabelText(/deity/i);

      expect(deitiesSelect).toBeDisabled();
      expect(deitiesSelect).toHaveTextContent(/loading/i);

      expect(
        await screen.findByRole("option", { name: /thor/i })
      ).toBeInTheDocument();
      expect(deitiesSelect).not.toBeDisabled();
    });
  });

  describe("When filling the input fields and submitting", () => {
    it("Should disabled the 'Create' button", async () => {
      setup();

      expect(
        await screen.findByRole("option", { name: /thor/i })
      ).toBeInTheDocument();

      userEvent.type(
        screen.getByLabelText(/first name/i),
        mutationVariables.firstName
      );
      userEvent.type(
        screen.getByLabelText(/surname/i),
        mutationVariables.surname
      );
      userEvent.type(screen.getByLabelText(/email/i), mutationVariables.email!);
      userEvent.type(
        screen.getByLabelText(/password/i),
        mutationVariables.password
      );

      userEvent.selectOptions(screen.getByLabelText(/deity/i), "thor");

      const createAccountButton = screen.getByRole("button", {
        name: "Create",
      });
      expect(createAccountButton).not.toBeDisabled();

      userEvent.click(createAccountButton);
      expect(createAccountButton).toBeDisabled();

      await waitFor(() => {
        expect(createAccountButton).not.toBeDisabled();
      });
    });
  });

  describe("When trying to submit without filling", () => {
    it("Should display an error", async () => {
      setup();

      expect(
        await screen.findByRole("option", { name: /thor/i })
      ).toBeInTheDocument();

      expect(screen.queryByRole("alert")).not.toBeInTheDocument();

      userEvent.click(
        screen.getByRole("button", {
          name: "Create",
        })
      );

      expect(screen.getByRole("alert")).toHaveTextContent(
        /fill all required fields/i
      );
    });
  });
});
