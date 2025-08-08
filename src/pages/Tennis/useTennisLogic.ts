// hooks/useTennisLogic.ts
import { useEffect, useState } from "react";
import type { TableRow } from "../../components/ui/Table/Table.types";

export const useTennisLogic = () => {
    const [players, setPlayers] = useState<TableRow[]>(() => {
        const saved = localStorage.getItem("tennis-players");
        return saved ? JSON.parse(saved) : [];
    });

    const [matches, setMatches] = useState<string[]>(() => {
        const saved = localStorage.getItem("tennis-matches");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("tennis-players", JSON.stringify(players));
    }, [players]);

    useEffect(() => {
        localStorage.setItem("tennis-matches", JSON.stringify(matches));
    }, [matches]);

    const getMatchId = (playerA: string, playerB: string) => {
        const sorted = [playerA.toLowerCase(), playerB.toLowerCase()].sort();
        return `${sorted[0]}-${sorted[1]}`;
    };

    const addPlayer = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed || players.some((p) => p.name.toLowerCase() === trimmed.toLowerCase())) return;

        const newPlayer: TableRow = {
            name: trimmed,
            wins: 0,
            losses: 0,
            points: 0,
            matches: 0,
        };

        setPlayers((prev) => [...prev, newPlayer]);
    };

    const addMatch = (player1: string, player2: string, score1: number, score2: number) => {
        if (!player1 || !player2 || player1 === player2) return;

        const matchId = getMatchId(player1, player2);
        if (matches.includes(matchId)) return;

        const updated = players.map((player) => {
            if (player.name !== player1 && player.name !== player2) return player;

            const isP1 = player.name === player1;
            const ownScore = isP1 ? score1 : score2;
            const opponentScore = isP1 ? score2 : score1;

            const win = ownScore > opponentScore;

            const updatedPlayer = { ...player, matches: (player.matches ?? 0) + 1 };

            if (win) {
                updatedPlayer.wins += 1;
                updatedPlayer.points += 3;
            } else {
                updatedPlayer.losses += 1;
            }

            return updatedPlayer;
        });

        setPlayers(updated);
        setMatches((prev) => [...prev, matchId]);
    };

    const getSortedPlayers = () => {
        return [...players].sort((a, b) => b.points - a.points);
    };

    return {
        players,
        matches,
        addPlayer,
        addMatch,
        getSortedPlayers,
        getMatchId,
    };
};
