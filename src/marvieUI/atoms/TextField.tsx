import styled from "styled-components";
import { StyledIcon } from "styled-icons/types";

const Container = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 38px 1fr;

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
    width: calc(100% - 24px);
    background: #000;
    opacity: 0.1;
    border-radius: 8px;
  }
`;

const Label = styled.label`
  width: 38px;
  height: 48px;
  color: ${({ theme }) => theme.pallete.yellow[1]};
  background-color: ${({ theme }) => theme.pallete.yellow[2]};
  border-radius: 12px;
  font-size: 0;

  svg {
    margin: 14px 9px;
  }
`;

const Input = styled.input`
  background-color: inherit;
  border: none;
  padding: 2px 8px;
  width: 100%;
  border-radius: 12px 0 0 12px;
  font-size: 18px;
  color: ${({ theme }) => theme.pallete.text[1]};
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
};

const TextField = (props: TextFieldProps) => {
  return (
    <Container>
      <Label htmlFor={props.id}>
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
