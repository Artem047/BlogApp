import { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    type: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    readonly?: boolean;
    className?: string;
    value?: string | undefined;
}