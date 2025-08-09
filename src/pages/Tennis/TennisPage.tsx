import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Table } from "../../components/ui/Table/Table";
import { TeamScorePanel } from "../../components/TeamScorePanel/TeamScorePanel";
import { useTennisLogic } from "./useTennisLogic";
import { tennisHeader } from "../../data/data";
import Tennis from "../../assets/tennis.svg";
import { useState } from "react";

export const TennisPage: React.FC = () => {
    const { players, matches, addPlayer, addMatch, getSortedPlayers, getMatchId } =
        useTennisLogic();

    const [playerName, setPlayerName] = useState("");
    const [player1, setPlayer1] = useState("");
    const [player2, setPlayer2] = useState("");
    const [score1, setScore1] = useState("");
    const [score2, setScore2] = useState("");

    const handleAddPlayer = () => {
        addPlayer(playerName);
        setPlayerName("");
    };

    const handleAddScore = () => {
        if (!player1 || !player2 || player1 === player2 || score1 === "" || score2 === "") return;

        addMatch(player1, player2, +score1, +score2);
        setPlayer1("");
        setPlayer2("");
        setScore1("");
        setScore2("");
    };

    const playerOptions1 = players
        .filter((p) => p.name !== player2)
        .filter((p) => {
            if (!player2) return true;
            return !matches.includes(getMatchId(p.name, player2));
        })
        .map((p) => ({ value: p.name, label: p.name }));

    const playerOptions2 = players
        .filter((p) => p.name !== player1)
        .filter((p) => {
            if (!player1) return true;
            return !matches.includes(getMatchId(p.name, player1));
        })
        .map((p) => ({ value: p.name, label: p.name }));

    const formDisabled =
        !player1 || !player2 || player1 === player2 || score1 === "" || score2 === "";

    return (
        <>
            <PageHeader icon={Tennis} title="Wimbledon" variant="tennis" />
            <Layout variant="tennis">
                <TeamScorePanel
                    addTeamButtonVariant="success"
                    addScoreButtonVariant="accent"
                    addTeamButtonLabel="Player"
                    buttonSize="lg"
                    teamFormProps={{
                        heading: "Add Player",
                        placeholder: "Enter player name",
                        inputValue: playerName,
                        onInputChange: setPlayerName,
                        onSubmit: handleAddPlayer,
                        buttonLabel: "Add",
                        buttonVariant: "success",
                        variant: "tennis",
                    }}
                    scoreFormProps={{
                        entityType: "player",
                        heading: "Add Score",
                        buttonVariant: "accent",
                        homeTeam: player1,
                        awayTeam: player2,
                        homeTeamOptions: playerOptions1,
                        awayTeamOptions: playerOptions2,
                        homeScore: score1,
                        awayScore: score2,
                        onHomeTeamChange: setPlayer1,
                        onAwayTeamChange: setPlayer2,
                        onHomeScoreChange: setScore1,
                        onAwayScoreChange: setScore2,
                        onSubmit: handleAddScore,
                        buttonLabel: "Add Score",
                        variant: "tennis",
                        disabled: formDisabled,
                    }}
                />
                <Table variant="tennis" headers={tennisHeader} rows={getSortedPlayers()} />
            </Layout>
        </>
    );
};
