import styled, { css } from "styled-components";
import { StyledIcon } from "styled-icons/types";

const Container = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 38px 1fr;
  overflow: hidden;

  height: 58px;
  padding-top: 4px;
  width: 100%;

  &::after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    left: 56px;
    height: 2px;
    width: calc(100% - 32px);
    background: #000;
    opacity: 0.1;
    border-radius: 8px;
  }
`;

const labelColor = css<{ valid?: boolean }>`
  color: ${({ theme, valid }) =>
    theme.palette[valid ? "green" : valid === false ? "red" : "yellow"][1]};
  background-color: ${({ theme, valid }) =>
    theme.palette[valid ? "green" : valid === false ? "red" : "yellow"][2]};
`;

const Label = styled.label<{ valid?: boolean }>`
  width: 38px;
  height: 48px;
  color: ${({ theme }) => theme.palette.yellow[1]};
  background-color: ${({ theme }) => theme.palette.yellow[2]};
  border-radius: 12px;
  font-size: 0;

  svg {
    margin: 14px 9px;
  }

  ${labelColor}
`;

const Input = styled.input`
  background-color: inherit;
  border: none;
  padding: 2px 8px;
  width: 100%;
  border-radius: 12px 0 0 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.palette.text[1]};
`;

type InputProps = Pick<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "value" | "type" | "id" | "onChange" | "placeholder"
>;

type TextFieldProps = InputProps & {
  label: string;
  icon: StyledIcon;
  valid?: boolean;
};

const TextField = (props: TextFieldProps) => {
  return (
    <Container>
      <Label htmlFor={props.id} valid={props.valid}>
        <span> {props.label}</span>
        <props.icon size="20px" title={props.label} />
      </Label>
      <Input
        id={props.id}
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
      />
    </Container>
  );
};

export default TextField;
