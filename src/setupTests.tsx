import React from "react";
import { render, RenderOptions } from "@testing-library/react";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

import { ThemeProvider } from "styled-components";
import { darkTheme } from "./theme";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <ThemeProvider theme={darkTheme}>{children}</ThemeProvider>
);

export * from "@testing-library/react";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { ...options, wrapper: AllProviders });

export { customRender as render };
