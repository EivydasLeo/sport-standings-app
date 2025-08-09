import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TeamScorePanel } from "../../components/TeamScorePanel/TeamScorePanel";
import { Table } from "../../components/ui/Table/Table";
import { footballHeaders } from "../../data/data";
import { useFootballLogic } from "./useFootballLogic";
import { useCallback, useMemo } from "react";
import { useFormState } from "../../hooks/useFormState";
import { isValidPair, isValidScorePair } from "../../utils/validators";
import { filterOptions, type Option } from "../../utils/options";

export const FootballPage: React.FC = () => {
    const { teams, addTeam, addMatch, getSortedTeams, getMatchId, matches } = useFootballLogic();
    const { name, setName, home, setHome, away, setAway, h, setH, a, setA, resetScore, resetName } =
        useFormState();

    const options: Option[] = useMemo(
        () => teams.map((t) => ({ value: t.name, label: t.name })),
        [teams],
    );
    const hasMatch = useCallback(
        (x: string, y: string) => matches.includes(getMatchId(x, y)),
        [matches, getMatchId],
    );

    const homeOpts = useMemo(
        () => filterOptions(options, home, away, hasMatch),
        [options, home, away, hasMatch],
    );

    const awayOpts = useMemo(
        () => filterOptions(options, away, home, hasMatch),
        [options, away, home, hasMatch],
    );

    const disabled = !isValidPair(home, away) || !isValidScorePair(h, a);
    const handleAddTeam = () => {
        addTeam(name);
        resetName();
    };
    const handleAddScore = () => {
        if (disabled) return;
        addMatch(home, away, +h, +a);
        resetScore();
    };

    return (
        <>
            <PageHeader title="Premier League" variant="football" />
            <Layout variant="football">
                <TeamScorePanel
                    addTeamButtonLabel="Team"
                    addTeamButtonVariant="primary"
                    addScoreButtonVariant="primary"
                    teamFormProps={{
                        heading: "Add Team",
                        placeholder: "Team name",
                        inputValue: name,
                        onInputChange: setName,
                        onSubmit: handleAddTeam,
                        buttonLabel: "Add",
                        variant: "football",
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
                        variant: "football",
                        disabled,
                    }}
                />
                <Table variant="football" headers={footballHeaders} rows={getSortedTeams()} />
            </Layout>
        </>
    );
};
