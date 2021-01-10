import styled from "styled-components";

type DivisorProps = {};

const Divisor = styled.hr<DivisorProps>`
  background: #000;
  opacity: 0.1;
  height: 2px;
  margin: 24px 0;
  border: none;
`;

export default Divisor;
