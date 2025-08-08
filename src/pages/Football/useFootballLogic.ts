import { useState } from "react";
import type { TableRow } from "../../components/ui/Table/Table.types";

export const useFootballLogic = () => {
    const [teams, setTeams] = useState<TableRow[]>([]);
    const [matches, setMatches] = useState<string[]>([]);

    const getMatchId = (teamA: string, teamB: string) => {
        const sorted = [teamA.toLowerCase(), teamB.toLowerCase()].sort();
        return `${sorted[0]}-${sorted[1]}`;
    };

    const addTeam = (teamName: string) => {
        const name = teamName.trim();
        if (!name || teams.some((t) => t.name.toLowerCase() === name.toLowerCase())) return;

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

        const matchId = getMatchId(home, away);
        if (matches.includes(matchId)) return;

        const updatedTeams = teams.map((team) => {
            if (team.name !== home && team.name !== away) return team;

            const isHome = team.name === home;
            const goalsFor = isHome ? homeScore : awayScore;
            const goalsAgainst = isHome ? awayScore : homeScore;

            const win = goalsFor > goalsAgainst;
            const draw = goalsFor === goalsAgainst;

            const updatedTeam = { ...team, played: (team.played ?? 0) + 1 };

            if (win) {
                updatedTeam.wins += 1;
                updatedTeam.points += 3;
            } else if (draw) {
                updatedTeam.draws = (updatedTeam.draws ?? 0) + 1;
                updatedTeam.points += 1;
            } else {
                updatedTeam.losses += 1;
            }

            return updatedTeam;
        });

        setTeams(updatedTeams);
        setMatches((prev) => [...prev, matchId]);
    };

    const getSortedTeams = () => {
        return [...teams].sort((a, b) => b.points - a.points);
    };

    return {
        teams,
        matches,
        addTeam,
        addMatch,
        getSortedTeams,
        getMatchId,
    };
};
