import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "@react-spectrum/provider";
import { defaultTheme } from "@adobe/react-spectrum";

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider theme={defaultTheme}>{children}</Provider>
);

export * from "@testing-library/react";

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { ...options, wrapper: AllProviders });

export { customRender as render };
