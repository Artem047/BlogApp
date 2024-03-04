import { IInput } from "../../interface/input.interface";

const Input = ({ placeholder, type }: IInput) => {
  return <input required type={type} placeholder={placeholder} className="w-full h-16 placeholder:text-lg rounded-xl outline-none text-lg px-6" />;
};

export default Input;
