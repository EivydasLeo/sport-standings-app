export type Option = { label: string; value: string };

export interface ScoreFormProps {
    heading?: string;
    variant?: "football" | "basketball" | "tennis";
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
}
