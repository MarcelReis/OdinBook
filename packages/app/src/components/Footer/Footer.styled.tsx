import styled from "styled-components";
import Surface from "../../marvieUI/atoms/Surface";

export const StyledSurface = styled(Surface)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 64px;
`;

export const Spacer = styled.div`
  height: 64px;
`;

export const Text = styled.small`
  display: inline-block;
  width: 100%;
  text-align: center;
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
`;
