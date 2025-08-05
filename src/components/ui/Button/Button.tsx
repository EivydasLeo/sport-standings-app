import React from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";
import { type ButtonProps } from "./Button.types";

export const Button: React.FC<ButtonProps> = ({
    variant = "primary",
    size = "md",
    icon,
    className,
    children,
    ...props
}) => {
    return (
        <button
            className={clsx(styles.button, styles[variant], styles[size], className)}
            {...props}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {children && <span>{children}</span>}
        </button>
    );
};
