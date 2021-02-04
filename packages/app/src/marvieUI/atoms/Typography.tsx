import styled from "styled-components";

type Scale =
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "heading5"
  | "heading6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "button"
  | "caption"
  | "overline";

type TypographyProps = {
  contrast?: 0 | 1 | 2 | 3;
  scale?: Scale;
};

const fontSize: Record<Scale, number> = {
  heading1: 6,
  heading2: 3.75,
  heading3: 3,
  heading4: 2.125,
  heading5: 1.5,
  heading6: 1.25,
  subtitle1: 1,
  subtitle2: 0.875,
  body1: 1,
  body2: 0.875,
  button: 0.875,
  caption: 0.625,
  overline: 0.75,
};

const fontWeight: Record<Scale, string> = {
  heading1: "300",
  heading2: "300",
  heading3: "400",
  heading4: "400",
  heading5: "400",
  heading6: "500",
  subtitle1: "400",
  subtitle2: "500",
  body1: "400",
  body2: "400",
  button: "500",
  caption: "400",
  overline: "400",
};

const letterSpacing: Record<Scale, string> = {
  heading1: "-1.5px",
  heading2: "-0.5px",
  heading3: "-0px",
  heading4: "0.25px",
  heading5: "0px",
  heading6: "0.15px",
  subtitle1: "0.15px",
  subtitle2: "0.1px",
  body1: "0.5px",
  body2: "0.25px",
  button: "1.25px",
  caption: "0.4px",
  overline: "1.5px",
};

const Typography = styled.span<TypographyProps>`
  color: ${({ theme, contrast }) => theme.palette.text[contrast ?? 0]};
  font-size: ${({ scale }) => fontSize[scale ?? "body1"]}rem;
  font-weight: ${({ scale }) => fontWeight[scale ?? "body1"]};
  letter-spacing: ${({ scale }) => letterSpacing[scale ?? "body1"]};
`;

export default Typography;
