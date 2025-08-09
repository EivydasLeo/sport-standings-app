import React from "react";
import styles from "./Layout.module.scss";
import type { LayoutProps } from "./Layout.types";
import clsx from "clsx";

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
    return <div className={clsx(styles.layout, variant && styles[variant])}>{children}</div>;
};
