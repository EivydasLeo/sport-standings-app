import React, { useCallback, useMemo } from "react";
import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TeamScorePanel } from "../../components/TeamScorePanel/TeamScorePanel";
import { MatchResults } from "../../components/MatchResults/MatchResults";
import { Table } from "../../components/ui/Table/Table";
import { useBasketballLogic } from "./useBasketBallLogic";
import type { Option } from "../../components/ui/Select/Select.types";
import basketballIcon from "../../assets/basketball.svg";
import { normalizeName, COUNTRY_CODE_BY_NAME, basketballHeaders } from "../../data/data";
import { useFormState } from "../../hooks/useFormState";
import { isValidPair, isValidScorePair } from "../../utils/validators";
import { filterOptions } from "../../utils/options";

export const BasketballPage: React.FC = () => {
    const { teams, matches, addTeam, addMatch, getSortedTeams, getMatchId, matchIds } =
        useBasketballLogic();
    const { name, setName, home, setHome, away, setAway, h, setH, a, setA, resetScore, resetName } =
        useFormState();

    const options: Option[] = useMemo(
        () => teams.map((t) => ({ value: t.name, label: t.name })),
        [teams],
    );
    const hasMatch = useCallback(
        (a: string, b: string) => matchIds.has(getMatchId(a, b)),
        [matchIds, getMatchId],
    );

    const homeOpts = useMemo(
        () => filterOptions(options, home, away, hasMatch),
        [options, home, away, hasMatch],
    );

    const awayOpts = useMemo(
        () => filterOptions(options, away, home, hasMatch),
        [options, away, home, hasMatch],
    );

    const handleAddTeam = () => {
        const key = normalizeName(name);
        const code = COUNTRY_CODE_BY_NAME[key];
        addTeam(name, code);
        resetName();
    };

    const disabled = !isValidPair(home, away) || !isValidScorePair(h, a);
    const handleAddScore = () => {
        if (disabled) return;
        addMatch(home, away, +h, +a);
        resetScore();
    };

    const tableRows = useMemo(
        () => getSortedTeams().map((t) => ({ ...t, flag: t.countryCode })),
        [getSortedTeams],
    );

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
                        inputValue: name,
                        onInputChange: setName,
                        onSubmit: handleAddTeam,
                        buttonLabel: "Add",
                        buttonVariant: "secondary",
                        variant: "basketball",
                    }}
                    scoreFormProps={{
                        heading: "Add Score",
                        homeTeam: home,
                        awayTeam: away,
                        homeTeamOptions: homeOpts,
                        awayTeamOptions: awayOpts,
                        homeScore: h,
                        awayScore: a,
                        onHomeTeamChange: setHome,
                        onAwayTeamChange: setAway,
                        onHomeScoreChange: setH,
                        onAwayScoreChange: setA,
                        onSubmit: handleAddScore,
                        buttonLabel: "Add Score",
                        buttonVariant: "secondary",
                        variant: "basketball",
                        disabled,
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
