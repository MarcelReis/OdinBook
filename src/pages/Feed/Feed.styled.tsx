import styled from "styled-components";

export const Container = styled.div`
  max-width: 600px;
  margin: 24px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

export const CreatePost = styled.div`
  padding: 16px 24px;
  height: 100px;
  background: ${({ theme }) => theme.pallete.surface[1]};
  border-radius: 16px;
`;
