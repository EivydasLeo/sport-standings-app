import { useEffect, useMemo } from "react";
import type { TableRow } from "../../components/ui/Table/Table.types";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import { makePairId } from "../../utils/matchId";
import { applyResult } from "../../utils/points";
import { COUNTRY_CODE_BY_NAME, normalizeName } from "../../data/data";

export type Team = TableRow & { countryCode?: string };
export type PlayedMatch = { home: string; away: string; homeScore: number; awayScore: number };

const TEAMS_KEY = "basketball-teams";
const MATCHES_KEY = "basketball-matches";

export const useBasketballLogic = () => {
    const [teams, setTeams] = useLocalStorageState<Team[]>(TEAMS_KEY, []);
    const [matches, setMatches] = useLocalStorageState<PlayedMatch[]>(MATCHES_KEY, []);

    const getMatchId = (a: string, b: string) => makePairId(a, b, "__");

    const matchIds = useMemo(
        () => new Set(matches.map((m) => getMatchId(m.home, m.away))),
        [matches],
    );

    useEffect(() => {
        if (!teams.length) return;
        const fixed = teams.map((t) => {
            if (t.countryCode) return t;
            const cc = COUNTRY_CODE_BY_NAME[normalizeName(t.name)];
            return { ...t, countryCode: cc?.toUpperCase() };
        });
        if (JSON.stringify(fixed) !== JSON.stringify(teams)) {
            setTeams(fixed);
        }
    }, [teams, setTeams]);

    const addTeam = (name: string, countryCode?: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (teams.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) return;

        const guessed = (
            countryCode ?? COUNTRY_CODE_BY_NAME[normalizeName(trimmed)]
        )?.toUpperCase();
        const newTeam: Team = {
            name: trimmed,
            countryCode: guessed,
            wins: 0,
            losses: 0,
            draws: 0,
            played: 0,
            points: 0,
        };
        setTeams((prev) => [...prev, newTeam]);
    };

    const addMatch = (home: string, away: string, hs: number, as: number) => {
        if (!home || !away || home === away) return;
        if ([hs, as].some((v) => Number.isNaN(v) || v < 0)) return;

        const id = getMatchId(home, away);
        if (matchIds.has(id)) return;

        setTeams((prev) =>
            prev.map((team) => {
                if (team.name !== home && team.name !== away) return team;
                const isHome = team.name === home;
                return applyResult(team, isHome ? hs : as, isHome ? as : hs, true, "played");
            }),
        );
        setMatches((prev) => [...prev, { home, away, homeScore: hs, awayScore: as }]);
    };

    const getSortedTeams = () => {
        return [...teams].sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if ((b.wins ?? 0) !== (a.wins ?? 0)) return (b.wins ?? 0) - (a.wins ?? 0);
            return (b.draws ?? 0) - (a.draws ?? 0);
        });
    };

    return { teams, matches, addTeam, addMatch, getSortedTeams, getMatchId, matchIds };
};
