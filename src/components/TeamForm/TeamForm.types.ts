import type { ButtonProps } from "../ui/Button/Button.types";

export interface TeamFormProps {
    heading?: string;
    placeholder: string;
    inputValue: string;
    buttonLabel?: string;
    buttonVariant: ButtonProps["variant"];
    variant?: "football" | "basketball" | "tennis";
    onInputChange: (value: string) => void;
    onSubmit: () => void;
}
