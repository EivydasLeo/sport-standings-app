import React from "react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import styles from "./TeamForm.module.scss";
import type { TeamFormProps } from "./TeamForm.types";
import clsx from "clsx";

export const TeamForm: React.FC<TeamFormProps> = ({
    heading,
    placeholder,
    buttonLabel,
    buttonVariant,
    variant,
    inputValue,
    onInputChange,
    onSubmit,
}) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className={clsx(styles.column, variant && styles[variant])}>
            {heading && <h3>{heading}</h3>}
            <form className={styles.controls} onSubmit={handleSubmit}>
                <Input
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key >= "0" && e.key <= "9") {
                            e.preventDefault();
                        }
                    }}
                    onPaste={(e) => {
                        const paste = e.clipboardData.getData("text");
                        if (/\d/.test(paste)) {
                            e.preventDefault();
                        }
                    }}
                />
                <Button variant={buttonVariant} type="submit">
                    {buttonLabel}
                </Button>
            </form>
        </div>
    );
};
