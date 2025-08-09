import React, { useState } from "react";
import styles from "./TeamScorePanel.module.scss";
import { Button } from "../ui/Button/Button";
import { TeamForm } from "../TeamForm/TeamForm";
import { ScoreForm } from "../ScoreForm/ScoreForm";
import type { TeamScorePanelProps } from "./TeamScorePanel.types";

export const TeamScorePanel: React.FC<TeamScorePanelProps> = ({
    addTeamButtonVariant,
    addScoreButtonVariant,
    addTeamButtonLabel,
    buttonSize,
    teamFormProps,
    scoreFormProps,
}) => {
    const [isAddTeamVisible, setIsAddTeamVisible] = useState(false);
    const [isAddScoreVisible, setIsAddScoreVisible] = useState(false);

    const onToggleAddTeam = () => {
        setIsAddTeamVisible((prev) => !prev);
        setIsAddScoreVisible(false);
    };

    const onToggleAddScore = () => {
        setIsAddScoreVisible((prev) => !prev);
        setIsAddTeamVisible(false);
    };

    return (
        <>
            <div className={styles.controls}>
                <Button
                    icon={isAddTeamVisible ? "−" : "＋"}
                    size={buttonSize}
                    variant={addTeamButtonVariant}
                    onClick={onToggleAddTeam}
                >
                    {isAddTeamVisible
                        ? ` Close ${addTeamButtonLabel}`
                        : ` Add ${addTeamButtonLabel}`}
                </Button>

                <Button
                    icon={isAddScoreVisible ? "−" : "＋"}
                    size={buttonSize}
                    variant={addScoreButtonVariant}
                    onClick={onToggleAddScore}
                >
                    {isAddScoreVisible ? "Close Score" : "Add Score"}
                </Button>
            </div>

            {isAddTeamVisible && <TeamForm {...teamFormProps} />}
            {isAddScoreVisible && <ScoreForm {...scoreFormProps} />}
        </>
    );
};
