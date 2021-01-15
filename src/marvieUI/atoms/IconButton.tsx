import styled from "styled-components";

type IconButtonProps = {};

const IconButton = styled.button<IconButtonProps>`
  margin: 8px;
  height: 40px;
  width: 40px;
  padding: 0;
  border: none;
  border-radius: 24px;
  cursor: pointer;
  color: ${({ theme }) => theme.palette.text[0]};
  background: ${({ theme }) => theme.palette.surface[2]};

  svg {
    padding: 4px;
    height: 40px;
    width: 40px;
  }
`;

export default IconButton;
