import { IButton } from "../../interface/button.interface";

const Button = ({ children, className, type, onClick, onSubmit }: IButton) => {
  return <button className={className} type={type} onClick={onClick} onSubmit={onSubmit}>{children}</button>;
};

export default Button;
