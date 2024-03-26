import { ReactNode } from "react";

export interface IButton{
    children?: ReactNode;
    className?: string;
    type?: "submit" | "reset" | "button";
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}