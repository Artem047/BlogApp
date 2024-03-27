import { IInput } from "../../interface/input.interface";

const Input = ({ placeholder, type, name, onChange, readonly, value, className }: IInput) => {
  return <input onChange={onChange} required name={name} type={type} placeholder={placeholder} className={className} readOnly={readonly} defaultValue={value} />;
};

export default Input;

