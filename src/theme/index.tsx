import { makeVar, useReactiveVar } from "@apollo/client";
import { createGlobalStyle, DefaultTheme, css } from "styled-components";
import { ThemeProvider as Provider } from "styled-components";

import styledReset from "styled-reset";

type BreakingPointKeys = "xs" | "sm" | "md" | "lg" | "xl";

const breakpoints: Record<BreakingPointKeys, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
};

export const media = {
  lessThan: (bp: BreakingPointKeys) =>
    `@media (max-width: ${breakpoints[bp]}px)`,
  greaterThan: (bp: BreakingPointKeys) =>
    `@media (min-width: ${breakpoints[bp]}px)`,
  between: (bp1: BreakingPointKeys, bp2: BreakingPointKeys) =>
    `@media (min-width: ${breakpoints[bp1]}px) and (max-width: ${breakpoints[bp2]}px)`,
};

const styledBase = css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    height: 100%;
    font-size: 16px;
  }

  body {
    min-height: 100%;
    position: relative;
    box-sizing: border-box;
    font-family: "Source Sans Pro", sans-serif;
    background: ${({ theme }) => theme.pallete.background};
    color: ${({ theme }) => theme.pallete.text[0]};
  }

  hr {
    background: ${({ theme }) => theme.pallete.text[2]};
    height: 2px;
    border: none;
  }

  button {
    font-size: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${styledReset}
  ${styledBase}
`;

const commonTheme: Pick<DefaultTheme, "space"> = {
  space: {
    xxs: "4px",
    xs: "8px",
    sm: "16px",
    md: "24px",
    lg: "32px",
    xl: "40px",
    xxl: "48px",
  },
};

export const darkTheme: DefaultTheme = {
  ...commonTheme,
  pallete: {
    background: "linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)",

    surface: [
      "linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)",
      "#30444E",
      "#2A3C44",
    ],

    text: ["#FFFFFF", "#96A7AF", "#475E69", "#30444E"],

    red: ["#FF464F", "#FF575F", "#623A42"],
    orange: ["#FF8A34", "#FF974A", "#624D3B"],
    yellow: ["#FFBC25", "#FFC542", "#625B39"],
    green: ["#25C685", "#3DD598", "#286053"],
    blue: ["#005DF2", "#0062FF", "#163E72"],
    purple: ["#6952DC", "#755FE2", "#393D69"],
  },

  borderRadius: ["12px", "24px"],
  boxShadow: ["0px 1px 14px #19282F"],
};

export const lightTheme: DefaultTheme = {
  ...commonTheme,
  pallete: {
    background: "#FFFFFF",

    surface: ["#FFFFFF", "#EDF1FA", "#FFFFFF"],

    text: ["#1A3B34", "#899A96", "#E4E9F3", "#EDF1FA"],

    red: ["#FF464F", "#FF575F", "#FFE5E7"],
    orange: ["#FF8A34", "#FF974A", "#FFEFE3"],
    yellow: ["#FFBC25", "#FFC542", "#FEF3D9"],
    green: ["#25C685", "#3DD598", "#D4F5E9"],
    blue: ["#005DF2", "#0062FF", "#E3EEFF"],
    purple: ["#6952DC", "#755FE2", "#EDEAFD"],
  },

  borderRadius: ["12px", "24px"],
  boxShadow: ["0px 1px 14px #ECECFD"],
};

const darkmode = makeVar(localStorage.getItem("darkMode") !== "false");

export const useDarkMode = () => {
  const isDarkmode = useReactiveVar(darkmode);

  const toggleDarkmode = () => {
    localStorage.setItem("darkMode", (!isDarkmode).toString());
    darkmode(!isDarkmode);
  };

  return { isDarkmode, toggleDarkmode };
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const isDarkmode = useReactiveVar(darkmode);

  return (
    <Provider theme={isDarkmode ? darkTheme : lightTheme}>
      {children}
      <GlobalStyle />
    </Provider>
  );
};
