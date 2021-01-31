import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { media } from "../../theme";

export const Appbar = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 56px;
  background: ${({ theme }) => theme.palette.surface[1]};
  padding: 0 ${(props) => props.theme.space.xs};
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
  background: ${({ theme }) => theme.palette.surface[1]};
  border: 1px solid ${({ theme }) => theme.palette.text[2]};
  width: 100%;
  z-index: 10;

  ${media.lessThan("md")} {
    right: 0;
    width: 100%;
  }
  ${media.greaterThan("md")} {
    right: 16px;
    max-width: 300px;
    border-radius: 12px;
  }
`;

export const Box = styled.div`
  display: flex;
`;

export const Tag = styled(NavLink)`
  margin: 8px;
  display: flex;
  height: calc(100% - 16px);
  font-weight: bold;
  border-radius: 24px;

  &.on {
    color: ${({ theme }) => theme.palette.green[1]};
    background: ${({ theme }) => theme.palette.green[2]};
  }

  ${media.lessThan("sm")} {
    display: none;
  }
`;

export const Name = styled.p`
  padding: 10px;
`;

export const Image = styled.img`
  border-radius: 16px;
  margin: 4px;
  width: 32px;
  height: 32px;
`;
