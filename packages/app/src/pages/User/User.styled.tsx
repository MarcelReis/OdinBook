import styled from "styled-components";

export const Header = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${(props) => props.theme.palette.surface[2]};
  border-radius: 0 0 12px 12px;
  max-width: 900px;
  margin: auto;
  margin-bottom: 32px;
`;

export const Image = styled.div`
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
  bottom: -10%;

  width: 200px;
  padding: 0 32px;
  padding-top: 100%;
  max-width: 100%;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
