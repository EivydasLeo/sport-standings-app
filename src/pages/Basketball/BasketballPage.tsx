import React, { useMemo, useState } from "react";
import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TeamScorePanel } from "../../components/TeamScorePanel/TeamScorePanel";
import { MatchResults } from "../../components/MatchResults/MatchResults";
import { Table } from "../../components/ui/Table/Table";
import { useBasketballLogic } from "./useBasketBallLogic";
import type { Option } from "../../components/ui/Select/Select.types";
import basketballIcon from "../../assets/basketball.svg";
import { normalizeName, COUNTRY_CODE_BY_NAME } from "../../data/data";
import { basketballHeaders } from "../../data/data";

export const BasketballPage: React.FC = () => {
    const { teams, matches, addTeam, addMatch, getSortedTeams, getMatchId, matchIds } =
        useBasketballLogic();

    const [newTeam, setNewTeam] = useState("");
    const [home, setHome] = useState("");
    const [away, setAway] = useState("");
    const [hScore, setHScore] = useState("");
    const [aScore, setAScore] = useState("");

    const teamOptions: Option[] = useMemo(
        () => teams.map((t) => ({ value: t.name, label: t.name })),
        [teams],
    );

    const filteredHomeOptions = useMemo(() => {
        return teamOptions.filter((opt) => {
            if (!away) return true;
            return !matchIds.has(getMatchId(opt.value, away)) && opt.value !== away;
        });
    }, [teamOptions, away, matchIds, getMatchId]);

    const filteredAwayOptions = useMemo(() => {
        return teamOptions.filter((opt) => {
            if (!home) return true;
            return !matchIds.has(getMatchId(opt.value, home)) && opt.value !== home;
        });
    }, [teamOptions, home, matchIds, getMatchId]);

    const handleAddTeam = () => {
        const key = normalizeName(newTeam);
        const code = COUNTRY_CODE_BY_NAME[key];
        addTeam(newTeam, code);
        setNewTeam("");
    };

    const handleAddScore = () => {
        if (!home || !away || home === away) return;
        if (hScore === "" || aScore === "") return;

        const hs = Number(hScore);
        const as = Number(aScore);
        if (Number.isNaN(hs) || Number.isNaN(as) || hs < 0 || as < 0) return;

        addMatch(home, away, hs, as);

        setHome("");
        setAway("");
        setHScore("");
        setAScore("");
    };

    const isAddDisabled =
        !home ||
        !away ||
        home === away ||
        hScore === "" ||
        aScore === "" ||
        Number(hScore) < 0 ||
        Number(aScore) < 0;

    const tableRows = useMemo(() => {
        const sorted = getSortedTeams();
        return sorted.map((t) => ({
            ...t,
            flag: t.countryCode,
        }));
    }, [getSortedTeams]);
    return (
        <>
            <PageHeader icon={basketballIcon} title="EUROBASKET" variant="basketball" />

            <Layout variant="basketball">
                <TeamScorePanel
                    addTeamButtonVariant="secondary"
                    addScoreButtonVariant="secondary"
                    addTeamButtonLabel="Team"
                    teamFormProps={{
                        heading: "Add Team",
                        placeholder: "Team name",
                        inputValue: newTeam,
                        onInputChange: setNewTeam,
                        onSubmit: handleAddTeam,
                        buttonLabel: "Add",
                        buttonVariant: "secondary",
                        variant: "basketball",
                    }}
                    scoreFormProps={{
                        heading: "Add Score",
                        homeTeam: home,
                        awayTeam: away,
                        homeTeamOptions: filteredHomeOptions,
                        awayTeamOptions: filteredAwayOptions,
                        homeScore: hScore,
                        awayScore: aScore,
                        onHomeTeamChange: setHome,
                        onAwayTeamChange: setAway,
                        onHomeScoreChange: setHScore,
                        onAwayScoreChange: setAScore,
                        onSubmit: handleAddScore,
                        buttonLabel: "Add Score",
                        buttonVariant: "secondary",
                        variant: "basketball",
                        disabled: isAddDisabled,
                    }}
                />

                <MatchResults
                    matches={matches}
                    teams={teams.map((t) => ({ name: t.name, countryCode: t.countryCode }))}
                />

                <div>
                    <h4 style={{ color: "white" }}>Score Table:</h4>
                    <Table variant="basketball" headers={basketballHeaders} rows={tableRows} />
                </div>
            </Layout>
        </>
    );
};
