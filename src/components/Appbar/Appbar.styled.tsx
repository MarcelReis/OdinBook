import styled from "styled-components";

export const Appbar = styled.header`
  display: flex;
  height: 50px;
  background: ${({ theme }) => theme.pallete.surface[1]};
`;
