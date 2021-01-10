import { createGlobalStyle, DefaultTheme, css } from "styled-components";

import styledReset from "styled-reset";

const styledBase = css`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html,
  body {
    height: 100%;
  }

  html {
    font-size: 16px;
  }

  body {
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
`;

export const GlobalStyle = createGlobalStyle`
  ${styledReset}
  ${styledBase}
`;

export const darkTheme: DefaultTheme = {
  pallete: {
    background: "linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)",

    surface: [
      "linear-gradient(138.13deg, #2A3C44 25.75%, #23343C 100%)",
      "#2A3C44",
      "linear-gradient(138.13deg, #22343C 25.87%, #1F2E35 100%)",
    ],
    text: ["#FFFFFF", "#96A7AF", "#475E69", "#30444E"],

    red: ["#FF464F", "#FF575F", "#623A42"],
    orange: ["#FF8A34", "#FF974A", ""],
    yellow: ["#FFBC25", "#FFC542", "#625B39"],
    green: ["#25C685", "#3DD598", "#286053"],
    blue: ["#005DF2", "#0062FF", "#163E72"],
    purple: ["#6952DC", "#755FE2", "#393D69"],
  },

  borderRadius: ["12px", "24px"],
  boxShadow: ["0px 1px 14px #19282F"],
};
