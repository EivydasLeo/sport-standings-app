import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "success" | "icon";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    icon?: React.ReactNode;
}
