import styled from "styled-components";
import IconButton from "../../atoms/IconButton";

export const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.pallete.surface[1]};
  border-radius: 16px;
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.pallete.surface[2]};
  color: ${({ theme }) => theme.pallete.text[0]};
  border: none;
  border-radius: 8px;
  padding: 4px 48px 4px 8px;
  font-size: 16px;
`;

export const PostButton = styled(IconButton)`
  margin: 4px;
  position: absolute;
  right: 16px;
  top: 16px;

  svg {
    padding: 6px;
    height: 36px;
    width: 36px;
  }
`;
