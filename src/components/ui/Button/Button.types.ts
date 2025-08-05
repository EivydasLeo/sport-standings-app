import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "success";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
}
