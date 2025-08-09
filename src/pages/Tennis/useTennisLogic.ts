import type { TableRow } from "../../components/ui/Table/Table.types";
import { useLocalStorageState } from "../../utils/useLocalStorageState";
import { makePairId } from "../../utils/matchId";
import { applyResult } from "../../utils/points";

const PLAYERS_KEY = "tennis-players";
const MATCHES_KEY = "tennis-matches";

export const useTennisLogic = () => {
    const [players, setPlayers] = useLocalStorageState<TableRow[]>(PLAYERS_KEY, []);
    const [matches, setMatches] = useLocalStorageState<string[]>(MATCHES_KEY, []);

    const getMatchId = (a: string, b: string) => makePairId(a, b, "-");

    const addPlayer = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (players.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return;

        const newPlayer: TableRow = {
            name: trimmed,
            wins: 0,
            losses: 0,
            points: 0,
            matches: 0,
        };
        setPlayers((prev) => [...prev, newPlayer]);
    };

    const addMatch = (p1: string, p2: string, s1: number, s2: number) => {
        if (!p1 || !p2 || p1 === p2) return;
        if ([s1, s2].some((v) => Number.isNaN(v) || v < 0)) return;

        const id = getMatchId(p1, p2);
        if (matches.includes(id)) return;

        setPlayers((prev) =>
            prev.map((player) => {
                if (player.name !== p1 && player.name !== p2) return player;
                const isP1 = player.name === p1;
                return applyResult(player, isP1 ? s1 : s2, isP1 ? s2 : s1, false, "matches");
            }),
        );
        setMatches((prev) => [...prev, id]);
    };

    const getSortedPlayers = () => [...players].sort((a, b) => b.points - a.points);

    return { players, matches, addPlayer, addMatch, getSortedPlayers, getMatchId };
};
