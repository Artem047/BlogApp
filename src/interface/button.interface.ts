import React, { ReactNode } from "react";

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children?: ReactNode;
    className: string;
    type?: "submit" | "reset" | "button";
}