import type { ScoreForm } from "../ScoreForm/ScoreForm";
import type { TeamForm } from "../TeamForm/TeamForm";
import type { ButtonProps } from "../ui/Button/Button.types";

export interface TeamScorePanelProps {
    addTeamButtonVariant?: ButtonProps["variant"];
    addScoreButtonVariant?: ButtonProps["variant"];
    buttonSize?: ButtonProps["size"];
    addTeamButtonLabel: string;
    teamFormProps: React.ComponentProps<typeof TeamForm>;
    scoreFormProps: React.ComponentProps<typeof ScoreForm>;
}
