import React from "react";
import styles from "./Select.module.scss";
import { type SelectProps } from "./Select.types";

export const Select: React.FC<SelectProps> = ({
    options,
    className,
    name,
    value,
    entityType = "team",
    ...props
}) => {
    const getPlaceholder = () => {
        if (entityType === "player") {
            return name === "home" ? "Player 1" : "Player 2";
        } else {
            return name === "home" ? "Home Team" : "Away Team";
        }
    };
    return (
        <select
            className={`${styles.select} ${className || ""}`}
            name={name}
            value={value}
            {...props}
        >
            <option value="" disabled>
                {getPlaceholder()}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
