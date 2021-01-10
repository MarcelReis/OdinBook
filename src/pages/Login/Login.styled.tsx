import styled from "styled-components";
import Button from "../../marvieUI/atoms/Button";

import { media } from "../../theme";

export const MainGrid = styled.div`
  display: grid;
  max-width: 1200px;
  margin: auto;
  place-items: center;

  padding: ${(props) => props.theme.space.md};

  ${media.lessThan("sm")} {
    grid-template-columns: 1fr;
  }
  ${media.between("sm", "md")} {
    grid-template-columns: 1fr 1fr;
  }
  ${media.greaterThan("md")} {
    grid-template-columns: 3fr 2fr;
  }
`;

export const LoginBox = styled.div`
  width: 100%;

  ${media.greaterThan("sm")} {
    padding: ${(props) => props.theme.space.sm};
    border-radius: 24px;
    background: ${({ theme }) => theme.pallete.surface[1]};
  }
`;

export const SocialButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
`;

export const FacebookButton = styled(Button)`
  background: #3b5998;
`;
export const GithubkButton = styled(Button)`
  background: #24292e;
`;
export const TwitterButton = styled(Button)`
  background: #1da1f2;
`;
