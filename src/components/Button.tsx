import { IButton } from "../interface/button.interface";

const Button = ({ children, className, type }: IButton) => {
  return <button className={className} type={type}>{children}</button>;
};

export default Button;
