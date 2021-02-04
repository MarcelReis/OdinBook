import styled from "styled-components";
import { media } from "../../theme";

export const Container = styled.div`
  max-width: 575px;
  display: flex;
  gap: 16px;
  flex-direction: column;

  ${media.lessThan("sm")} {
    margin: 24px 16px;
  }
  ${media.greaterThan("sm")} {
    margin: 24px auto;
  }
`;
