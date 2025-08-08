export interface TeamFormProps {
    heading?: string;
    placeholder: string;
    inputValue: string;
    buttonLabel?: string;
    variant?: "football" | "basketball" | "tennis";
    onInputChange: (value: string) => void;
    onSubmit: () => void;
}
