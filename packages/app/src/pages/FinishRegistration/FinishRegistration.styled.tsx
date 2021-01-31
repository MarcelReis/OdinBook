import styled from "styled-components";
import { media } from "../../theme";

export const Container = styled.div`
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin: auto;
  max-width: 600px;
`;

type GridProps = {
  span?: { sm?: number; md?: number; lg?: number };
};

export const Grid = styled.div<GridProps>`
  grid-column: span ${(props) => props.span?.sm ?? 1};

  ${media.greaterThan("md")} {
    grid-column: span ${(props) => props.span?.md ?? props.span?.sm ?? 1};
  }
  ${media.greaterThan("lg")} {
    grid-column: span
      ${(props) => props.span?.lg ?? props.span?.md ?? props.span?.sm ?? 1};
  }
`;
