import type { ButtonProps } from "../ui/Button/Button.types";

export type Option = { label: string; value: string };

export interface ScoreFormProps {
    heading?: string;
    variant?: "football" | "basketball" | "tennis";
    buttonVariant?: ButtonProps["variant"];
    homeTeamOptions: Option[];
    awayTeamOptions: Option[];
    homeTeam: string;
    awayTeam: string;
    homeScore: string;
    awayScore: string;
    buttonLabel?: string;
    onHomeTeamChange: (value: string) => void;
    onAwayTeamChange: (value: string) => void;
    onHomeScoreChange: (value: string) => void;
    onAwayScoreChange: (value: string) => void;
    onSubmit: () => void;
    disabled?: boolean;
    entityType?: "team" | "player";
}
