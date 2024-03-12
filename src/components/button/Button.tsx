import { IButton } from "../../interface/button.interface";

const Button = ({ children, className, type, onClick }: IButton) => {
  return <button className={className} type={type} onClick={onClick}>{children}</button>;
};

export default Button;
