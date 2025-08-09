import { Layout } from "../../components/layout/Layout";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { Table } from "../../components/ui/Table/Table";
import { TeamScorePanel } from "../../components/TeamScorePanel/TeamScorePanel";
import { useTennisLogic } from "./useTennisLogic";
import { tennisHeader } from "../../data/data";
import TennisIcon from "../../assets/tennis.svg";
import { useCallback, useMemo } from "react";
import { useFormState } from "../../hooks/useFormState";
import { isValidPair, isValidScorePair } from "../../utils/validators";
import { filterOptions, type Option } from "../../utils/options";

export const TennisPage: React.FC = () => {
    const { players, matches, addPlayer, addMatch, getSortedPlayers, getMatchId } =
        useTennisLogic();
    const { name, setName, home, setHome, away, setAway, h, setH, a, setA, resetScore, resetName } =
        useFormState();

    const options: Option[] = useMemo(
        () => players.map((p) => ({ value: p.name, label: p.name })),
        [players],
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
    const handleAddPlayer = () => {
        addPlayer(name);
        resetName();
    };
    const handleAddScore = () => {
        if (disabled) return;
        addMatch(home, away, +h, +a);
        resetScore();
    };

    return (
        <>
            <PageHeader icon={TennisIcon} title="Wimbledon" variant="tennis" />
            <Layout variant="tennis">
                <TeamScorePanel
                    addTeamButtonVariant="success"
                    addScoreButtonVariant="accent"
                    addTeamButtonLabel="Player"
                    buttonSize="lg"
                    teamFormProps={{
                        heading: "Add Player",
                        placeholder: "Enter player name",
                        inputValue: name,
                        onInputChange: setName,
                        onSubmit: handleAddPlayer,
                        buttonLabel: "Add",
                        buttonVariant: "success",
                        variant: "tennis",
                    }}
                    scoreFormProps={{
                        entityType: "player",
                        heading: "Add Score",
                        buttonVariant: "accent",
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
                        variant: "tennis",
                        disabled,
                    }}
                />
                <Table variant="tennis" headers={tennisHeader} rows={getSortedPlayers()} />
            </Layout>
        </>
    );
};
