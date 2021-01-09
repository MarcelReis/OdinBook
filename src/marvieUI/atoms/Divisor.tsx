import styled from "styled-components";

type DivisorProps = {};

const Divisor = styled.hr<DivisorProps>`
  background: ${({ theme }) => theme.pallete.text[2]};
  height: 2px;
  margin: 24px 0;
  border: none;
`;

export default Divisor;
