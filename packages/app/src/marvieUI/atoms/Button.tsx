import styled, { css } from "styled-components";

type ButtonProps = {
  color?: "red" | "orange" | "yellow" | "green" | "blue" | "purple";
  variant?: "primary" | "secondary";
};

const primary = css<ButtonProps>`
  background-color: ${({ theme, color }) => theme.palette[color ?? "green"][0]};
  color: #fff;
`;
const secondary = css<ButtonProps>`
  background-color: ${({ theme, color }) => theme.palette[color ?? "green"][2]};
  color: ${({ theme, color }) => theme.palette[color ?? "green"][1]};
`;

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 12px;
  padding: 4px 12px;
  width: 100%;
  height: 58px;
  font-weight: bold;
  cursor: pointer;
  ${({ variant }) => (variant === "secondary" ? secondary : primary)}
  transition: transform 200ms ease;

  &:active {
    transform: translateY(2px);
  }
`;

export default Button;
