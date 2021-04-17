import React from "react";
import { MockedProvider } from "@apollo/client/testing";

import SignUpPage from "../SignUp";
import { render } from "@testing-library/react";

describe("<SignUpPage/>", () => {
  it("Should render the fields", () => {
    render(
      <MockedProvider>
        <SignUpPage />
      </MockedProvider>
    );
  });
});
