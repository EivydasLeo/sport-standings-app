import React from "react";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import styles from "./AddTeamForm.module.scss";
import type { AddTeamFormProps } from "./AddTeamForm.types";
import clsx from "clsx";

export const AddTeamForm: React.FC<AddTeamFormProps> = ({
    heading,
    placeholder,
    buttonLabel,
    variant,
}) => {
    return (
        <div className={clsx(styles.formWrapper, variant && styles[variant])}>
            {heading && <h3>{heading}</h3>}
            <div className={styles.controls}>
                <Input placeholder={placeholder} />
                <Button>{buttonLabel}</Button>
            </div>
        </div>
    );
};
