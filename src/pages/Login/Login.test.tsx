import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./Login";

describe("The <LoginPage />", () => {
  const setup = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

  it("Should render", () => {
    setup();
  });
});
