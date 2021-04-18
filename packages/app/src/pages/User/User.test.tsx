import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Route } from "react-router-dom";
import { loader } from "graphql.macro";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

import UserPage from "./User";
import { GetUserQuery } from "../../generated/graphql";

const query = loader("./GetUser.graphql");

const getUserSucceeded: MockedResponse<GetUserQuery> = {
  request: {
    query: query,
    variables: { username: "marcelreis" },
  },
  result: {
    data: {
      user: {
        id: Math.random().toString(36),
        firstname: "Marcelo",
        surname: "Reis",
        thumb: "https://placekitten.com/50",
      },
    },
  },
};

describe("<UserPage />", () => {
  it("Should query and render the user info", async () => {
    render(
      <MockedProvider addTypename={false} mocks={[getUserSucceeded]}>
        <MemoryRouter initialEntries={["/marcelreis"]}>
          <Route path="/:username">
            <UserPage />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();

    expect(await screen.findByText("Marcelo Reis")).toBeInTheDocument();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
