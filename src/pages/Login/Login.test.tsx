import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "../../setupTests";

import LoginPage from "./Login";

describe("The <LoginPage />", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

  it("Should render the login inputs", () => {
    setup();

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create new account/i })
    ).toBeInTheDocument();
  });
});
