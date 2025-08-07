import React from "react";
import styles from "./Select.module.scss";
import { type SelectProps } from "./Select.types";

export const Select: React.FC<SelectProps> = ({ options, className, name, ...props }) => {
    return (
        <select
            className={`${styles.select} ${className || ""}`}
            name={name}
            defaultValue=""
            {...props}
        >
            <option value="" disabled>
                {name === "home" ? "Home Team" : "Away Team"}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};
