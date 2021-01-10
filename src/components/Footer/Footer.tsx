import React from "react";

import * as S from "./Footer.styled";

const Footer = () => {
  return (
    <S.Spacer>
      <S.StyledSurface variant={2}>
        <S.Text>
          &copy; Copyright {new Date().getFullYear()},{" "}
          <S.Link href="https://marcelreis.dev">Marcelo Reis</S.Link>
        </S.Text>
      </S.StyledSurface>
    </S.Spacer>
  );
};

export default Footer;
