import styled, { css } from "styled-components";

type ButtonProps = {
  color?: "red" | "orange" | "yellow" | "green" | "blue" | "purple";
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  square?: boolean;
};

const primary = css<ButtonProps>`
  background-color: ${({ theme, color }) => theme.palette[color ?? "green"][0]};
  color: #fff;
`;
const secondary = css<ButtonProps>`
  background-color: ${({ theme, color }) => theme.palette[color ?? "green"][2]};
  color: ${({ theme, color }) => theme.palette[color ?? "green"][1]};
`;

const squareButton = css<ButtonProps>`
  font-size: 0;
  height: 58px;
  width: 58px;

  svg {
    height: 32px;
  }
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

  ${(props) => props.square && squareButton}

  &:active {
    transform: translateY(2px);
  }
`;

export default Button;
