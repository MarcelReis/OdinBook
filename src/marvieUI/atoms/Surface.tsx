import styled from "styled-components";

type SurfaceProps = {
  variant?: 0 | 1 | 2;
  rounded?: boolean;
};

const Surface = styled.div<SurfaceProps>`
  background: ${({ theme, variant }) => theme.palette.surface[variant ?? 0]};
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme, rounded }) =>
    rounded ? theme.borderRadius[0] : 0};
  padding: 24px;
`;

export default Surface;
