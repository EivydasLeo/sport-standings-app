import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";
import { type InputProps } from "./Input.types";

export const Input: React.FC<InputProps> = ({
    label,
    error,

    className,
    ...props
}) => {
    return (
        <label className={clsx(styles.label, className)}>
            {label}
            <input
                id={props.id}
                name={props.name}
                min={0}
                className={clsx(styles.input, error && styles.error)}
                {...props}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </label>
    );
};
