export interface IInput{
    placeholder: string;
    type: string;
    name?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}