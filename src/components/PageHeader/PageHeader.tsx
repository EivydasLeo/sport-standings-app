import React from "react";
import clsx from "clsx";
import styles from "./PageHeader.module.scss";
import type { PageHeaderProps } from "./PageHeader.types";

export const PageHeader: React.FC<PageHeaderProps> = ({ title, icon, variant, className }) => {
    return (
        <header className={clsx(styles.header, variant && styles[variant], className)}>
            {icon && <img src={icon}></img>}
            <h2 className={styles.title}>{title}</h2>
        </header>
    );
};
