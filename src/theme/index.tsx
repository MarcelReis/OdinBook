import { createGlobalStyle, DefaultTheme, css } from "styled-components";

import styledReset from "styled-reset";

const styledBase = css`
  body {
    font-family: "Source Sans Pro", sans-serif;
    background: ${({ theme }) => theme.pallete.background};
    color: ${({ theme }) => theme.pallete.text[0]};
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${styledReset}
  ${styledBase}
`;

export const darkTheme: DefaultTheme = {
  pallete: {
    background: "#1F2E35",

    surface: ["", "", ""],
    text: ["#FFFFFF", "#96A7AF", "#475E69", "#30444E"],

    red: ["#FF464F", "", ""],
    orange: ["#FF8A34", "", ""],
    yellow: ["#FFBC25", "", ""],
    green: ["#25C685", "", ""],
    blue: ["#005DF2", "", ""],
    purple: ["#6952DC", "", ""],
  },
};
