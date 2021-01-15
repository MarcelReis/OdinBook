import styled from "styled-components";

export const Container = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme.palette.surface[1]};
  border-radius: 16px;
`;

export const Header = styled.header`
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const Name = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.text[0]};
`;

export const Datetime = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text[1]};
`;

export const Content = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.text[0]};
  line-height: 1.5;
  padding-bottom: 24px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.text[2]};
`;

export const Interactions = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 16px 4px;
  margin-bottom: 16px;
  border-bottom: 2px solid ${({ theme }) => theme.palette.text[2]};
`;

export const Interaction = styled.li`
  color: ${({ theme }) => theme.palette.text[1]};

  svg {
    margin-right: 16px;
  }
`;
