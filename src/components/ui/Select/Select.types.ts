import React from "react";

export interface Option {
    label: string;
    value: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: Option[];
    id?: string;
    name: string;
    entityType?: "team" | "player";
}
