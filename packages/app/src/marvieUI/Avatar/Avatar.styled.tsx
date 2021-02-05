import styled, { css } from "styled-components";

type AvatarProps = {
  size?: "sm" | "md" | "lg";
};

const sizeMap: Record<"sm" | "md" | "lg", number> = {
  sm: 42,
  md: 48,
  lg: 60,
};

const size = css<AvatarProps>`
  width: ${({ size }) => sizeMap[size ?? "md"]}px;
  height: ${({ size }) => sizeMap[size ?? "md"]}px;
`;

export const Avatar = styled.img<AvatarProps>`
  ${size};
  border-radius: 50%;
  background: ${({ theme }) => theme.palette.surface[2]};
  border: none;
`;
