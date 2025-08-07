import React from "react";
import { Select } from "../ui/Select/Select";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import styles from "./AddScoreForm.module.scss";
import clsx from "clsx";
import type { AddScoreFormProps } from "./AddScoreForm.types";

export const AddScoreForm: React.FC<AddScoreFormProps> = ({
    heading,
    variant,
    homeTeamOptions,
    awayTeamOptions,
    homeScore,
    awayScore,
    buttonLabel,
    onHomeTeamChange,
    onAwayTeamChange,
    onHomeScoreChange,
    onAwayScoreChange,
    onSubmit,
}) => {
    return (
        <div className={clsx(styles.formWrapper, variant && styles[variant])}>
            {heading && <h3>{heading}</h3>}

            <div className={styles.row}>
                <Select
                    name="home"
                    options={homeTeamOptions}
                    onChange={(e) => onHomeTeamChange(e.target.value)}
                />
                <Select
                    name="away"
                    options={awayTeamOptions}
                    onChange={(e) => onAwayTeamChange(e.target.value)}
                />
            </div>

            <div className={styles.row}>
                <Input
                    placeholder="Home Score"
                    type="number"
                    value={homeScore}
                    onChange={(e) => onHomeScoreChange(e.target.value)}
                />
                <Input
                    placeholder="Away Score"
                    type="number"
                    value={awayScore}
                    onChange={(e) => onAwayScoreChange(e.target.value)}
                />
            </div>

            <Button fullWidth onClick={onSubmit}>
                {buttonLabel}
            </Button>
        </div>
    );
};
