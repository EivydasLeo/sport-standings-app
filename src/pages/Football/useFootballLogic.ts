import type { TableRow } from "../../components/ui/Table/Table.types";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import { makePairId } from "../../utils/matchId";
import { applyResult } from "../../utils/points";

const TEAMS_KEY = "football_teams";
const MATCHES_KEY = "football_matches";

export const useFootballLogic = () => {
    const [teams, setTeams] = useLocalStorageState<TableRow[]>(TEAMS_KEY, []);
    const [matches, setMatches] = useLocalStorageState<string[]>(MATCHES_KEY, []);

    const getMatchId = (a: string, b: string) => makePairId(a, b, "-");

    const addTeam = (teamName: string) => {
        const name = teamName.trim();
        if (!name || /\d/.test(name)) return;
        if (teams.some((t) => t.name.toLowerCase() === name.toLowerCase())) return;

        const newTeam: TableRow = {
            name,
            wins: 0,
            draws: 0,
            losses: 0,
            points: 0,
            played: 0,
        };
        setTeams((prev) => [...prev, newTeam]);
    };

    const addMatch = (home: string, away: string, homeScore: number, awayScore: number) => {
        if (!home || !away || home === away) return;
        if ([homeScore, awayScore].some((v) => Number.isNaN(v) || v < 0)) return;

        const id = getMatchId(home, away);
        if (matches.includes(id)) return;

        setTeams((prev) =>
            prev.map((team) => {
                if (team.name !== home && team.name !== away) return team;
                const isHome = team.name === home;
                return applyResult(
                    team,
                    isHome ? homeScore : awayScore,
                    isHome ? awayScore : homeScore,
                    true,
                    "played",
                );
            }),
        );
        setMatches((prev) => [...prev, id]);
    };

    const getSortedTeams = () => [...teams].sort((a, b) => b.points - a.points);

    return { teams, matches, addTeam, addMatch, getSortedTeams, getMatchId };
};
