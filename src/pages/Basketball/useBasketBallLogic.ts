import { useEffect, useMemo, useState } from "react";
import type { TableRow } from "../../components/ui/Table/Table.types";
import { COUNTRY_CODE_BY_NAME, normalizeName } from "../../data/countryCode";

export type Team = TableRow & {
    countryCode?: string;
};

export type PlayedMatch = {
    home: string;
    away: string;
    homeScore: number;
    awayScore: number;
};

const TEAMS_KEY = "basketball-teams";
const MATCHES_KEY = "basketball-matches";

export const useBasketballLogic = () => {
    const [teams, setTeams] = useState<Team[]>(() => {
        const saved = localStorage.getItem(TEAMS_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    const [matches, setMatches] = useState<PlayedMatch[]>(() => {
        const saved = localStorage.getItem(MATCHES_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(TEAMS_KEY, JSON.stringify(teams));
    }, [teams]);

    useEffect(() => {
        localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
    }, [matches]);

    useEffect(() => {
        if (!teams.length) return;
        const fixed = teams.map((t) =>
            t.countryCode ? t : { ...t, countryCode: COUNTRY_CODE_BY_NAME[normalizeName(t.name)] },
        );
        if (JSON.stringify(fixed) !== JSON.stringify(teams)) {
            setTeams(fixed);
        }
    }, []);

    const getMatchId = (a: string, b: string) => {
        const [x, y] = [a.toLowerCase(), b.toLowerCase()].sort();
        return `${x}__${y}`;
    };

    const matchIds = useMemo(
        () => new Set(matches.map((m) => getMatchId(m.home, m.away))),
        [matches],
    );

    const addTeam = (name: string, countryCode?: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;
        if (teams.some((t) => t.name.toLowerCase() === trimmed.toLowerCase())) return;

        const guessed = countryCode ?? COUNTRY_CODE_BY_NAME[normalizeName(trimmed)];

        const newTeam: Team = {
            name: trimmed,
            countryCode: guessed?.toUpperCase(),
            wins: 0,
            losses: 0,
            draws: 0,
            played: 0,
            points: 0,
        };
        setTeams((prev) => [...prev, newTeam]);
    };

    const addMatch = (home: string, away: string, homeScore: number, awayScore: number) => {
        if (!home || !away || home === away) return;
        if (homeScore < 0 || awayScore < 0) return;

        const id = getMatchId(home, away);
        if (matchIds.has(id)) return;

        const updated = teams.map((team) => {
            if (team.name !== home && team.name !== away) return team;

            const isHome = team.name === home;
            const own = isHome ? homeScore : awayScore;
            const opp = isHome ? awayScore : homeScore;

            const win = own > opp;
            const draw = own === opp;

            const t: Team = { ...team, played: (team.played ?? 0) + 1 };

            if (win) {
                t.wins += 1;
                t.points += 3;
            } else if (draw) {
                t.draws = (t.draws ?? 0) + 1;
                t.points += 1;
            } else {
                t.losses += 1;
            }
            return t;
        });

        setTeams(updated);
        setMatches((prev) => [...prev, { home, away, homeScore, awayScore }]);
    };

    const getSortedTeams = () => {
        return [...teams].sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.wins !== a.wins) return b.wins - a.wins;
            return (b.draws ?? 0) - (a.draws ?? 0);
        });
    };

    return {
        teams,
        matches,
        addTeam,
        addMatch,
        getSortedTeams,
        getMatchId,
        matchIds,
    };
};
