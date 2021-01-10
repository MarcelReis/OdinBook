import styled from "styled-components";
import Button from "../../marvieUI/atoms/Button";

export const LoginBox = styled.div`
  margin: auto;
  max-width: 400px;
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

export const Box = styled.div`
  margin: 16px 32px;
`;
