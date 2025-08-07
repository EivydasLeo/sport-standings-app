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
    variant,
}) => {
    return (
        <div className={clsx(styles.column, variant && styles[variant])}>
            {heading && <h3>{heading}</h3>}
            <div className={styles.controls}>
                <Input placeholder={placeholder} />
                <Button>{buttonLabel}</Button>
            </div>
        </div>
    );
};
