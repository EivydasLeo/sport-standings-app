import React from "react";
import { Select } from "../ui/Select/Select";
import { Input } from "../ui/Input/Input";
import { Button } from "../ui/Button/Button";
import styles from "./ScoreForm.module.scss";
import clsx from "clsx";
import type { ScoreFormProps } from "./ScoreForm.types";

export const ScoreForm: React.FC<ScoreFormProps> = ({
    heading,
    variant,
    homeTeamOptions,
    awayTeamOptions,
    homeTeam,
    awayTeam,
    homeScore,
    awayScore,
    buttonLabel,
    disabled,
    onHomeTeamChange,
    onAwayTeamChange,
    onHomeScoreChange,
    onAwayScoreChange,
    onSubmit,
}) => {
    return (
        <div className={clsx(styles.column, variant && styles[variant])}>
            {heading && <h3>{heading}</h3>}

            <div className={styles.row}>
                <Select
                    name="home"
                    value={homeTeam}
                    options={homeTeamOptions}
                    onChange={(e) => onHomeTeamChange(e.target.value)}
                />
                <Select
                    name="away"
                    value={awayTeam}
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

            <Button fullWidth onClick={onSubmit} disabled={disabled}>
                {buttonLabel}
            </Button>
        </div>
    );
};
