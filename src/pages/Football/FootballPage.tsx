import { useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TeamForm } from "../../components/TeamForm/TeamForm";
import { ScoreForm } from "../../components/ScoreForm/ScoreForm";
import { Table } from "../../components/ui/Table/Table";
import { footballHeaders } from "../../data/data";
import { useFootballLogic } from "./useFootballLogic";

export const FootballPage: React.FC = () => {
    const { teams, addTeam, addMatch, getSortedTeams, getMatchId, matches } = useFootballLogic();

    const [newTeam, setNewTeam] = useState("");
    const [homeTeam, setHomeTeam] = useState("");
    const [awayTeam, setAwayTeam] = useState("");
    const [homeScore, setHomeScore] = useState("");
    const [awayScore, setAwayScore] = useState("");

    const handleAddTeam = () => {
        addTeam(newTeam);
        setNewTeam("");
    };

    const handleAddMatch = () => {
        if (
            !homeTeam ||
            !awayTeam ||
            homeTeam === awayTeam ||
            homeScore === "" ||
            awayScore === "" ||
            isNaN(Number(homeScore)) ||
            isNaN(Number(awayScore))
        ) {
            return;
        }

        addMatch(homeTeam, awayTeam, +homeScore, +awayScore);

        setHomeTeam("");
        setAwayTeam("");
        setHomeScore("");
        setAwayScore("");
    };

    const isAddScoreDisabled =
        !homeTeam ||
        !awayTeam ||
        homeTeam === awayTeam ||
        homeScore === "" ||
        awayScore === "" ||
        isNaN(Number(homeScore)) ||
        isNaN(Number(awayScore));

    const filteredHomeTeamOptions = teams
        .filter((team) => team.name !== awayTeam)
        .filter((team) => {
            if (!awayTeam) return true;
            const matchId = getMatchId(team.name, awayTeam);
            return !matches.includes(matchId);
        })
        .map((team) => ({ value: team.name, label: team.name }));

    const filteredAwayTeamOptions = teams
        .filter((team) => team.name !== homeTeam)
        .filter((team) => {
            if (!homeTeam) return true;
            const matchId = getMatchId(team.name, homeTeam);
            return !matches.includes(matchId);
        })
        .map((team) => ({ value: team.name, label: team.name }));

    return (
        <>
            <PageHeader title="Premier League" variant="football" />
            <Layout variant="football">
                <TeamForm
                    heading="Add Team"
                    variant="football"
                    inputValue={newTeam}
                    onInputChange={setNewTeam}
                    onSubmit={handleAddTeam}
                    placeholder="Team name"
                    buttonLabel="Add"
                />

                <ScoreForm
                    heading="Add Score"
                    variant="football"
                    homeTeam={homeTeam}
                    awayTeam={awayTeam}
                    homeTeamOptions={filteredHomeTeamOptions}
                    awayTeamOptions={filteredAwayTeamOptions}
                    homeScore={homeScore}
                    awayScore={awayScore}
                    onHomeTeamChange={setHomeTeam}
                    onAwayTeamChange={setAwayTeam}
                    onHomeScoreChange={setHomeScore}
                    onAwayScoreChange={setAwayScore}
                    onSubmit={handleAddMatch}
                    buttonLabel="Add Score"
                    disabled={isAddScoreDisabled}
                />

                <Table variant="football" headers={footballHeaders} rows={getSortedTeams()} />
            </Layout>
        </>
    );
};
