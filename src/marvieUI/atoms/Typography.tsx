import styled from "styled-components";

type TypographyProps = {
  contrast?: 0 | 1 | 2 | 3;
};

const Typography = styled.span<TypographyProps>`
  color: ${({ theme, contrast }) => theme.palette.text[contrast ?? 0]};
`;

export default Typography;
