import styled from "styled-components";
import { media } from "../../theme";

export const Appbar = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 56px;
  background: ${({ theme }) => theme.pallete.surface[1]};
  padding: 0px ${(props) => props.theme.space.xs};
`;

export const Title = styled.h2`
  font-size: 32px;
  line-height: 56px;
  padding: 0 16px;
  transition: filter 500ms ease 0s;
  filter: drop-shadow(rgba(255, 255, 255, 0.5) 0px 0px 2px);

  &:hover {
    filter: drop-shadow(rgba(255, 255, 255, 0.75) 0px 0px 8px);
  }
`;

export const Menu = styled.div`
  position: absolute;
  top: 56px;
  padding: 24px;
  background: ${({ theme }) => theme.pallete.surface[1]};
  border: 1px solid ${({ theme }) => theme.pallete.text[2]};
  width: 100%;

  ${media.lessThan("md")} {
    right: 0px;
    width: 100%;
  }
  ${media.greaterThan("md")} {
    right: 16px;
    max-width: 300px;
    border-radius: 12px;
  }
`;
