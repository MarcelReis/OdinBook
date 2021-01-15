import styled from "styled-components";
import IconButton from "../../atoms/IconButton";

export const Container = styled.div`
  position: relative;
  grid-template-columns: 42px 1fr;
  display: grid;
  gap: 16px;
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.palette.surface[2]};
  color: ${({ theme }) => theme.palette.text[0]};
  border: none;
  border-radius: 8px;
  padding: 4px 48px 4px 8px;
  font-size: 16px;
`;

export const PostButton = styled(IconButton)`
  margin: 1px;
  position: absolute;
  right: 0;
  top: 0;

  svg {
    height: 32px;
    width: 32px;
  }
`;
