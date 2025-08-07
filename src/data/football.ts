import type { TableRow } from "../components/ui/Table/Table.types";

export const footballHeaders = ["Team", "P", "W", "D", "L", "Pts"];

export const footballStandings: TableRow[] = [
    { name: "Man U", played: 3, wins: 2, draws: 1, losses: 0, points: 7 },
    { name: "Liverpool", played: 3, wins: 2, draws: 0, losses: 1, points: 6 },
    { name: "Arsenal", played: 3, wins: 1, draws: 2, losses: 0, points: 5 },
    { name: "Chelsea", played: 3, wins: 1, draws: 1, losses: 1, points: 4 },
];

export const footballHomeTeamOptions = [
    { value: "arsenal", label: "Arsenal" },
    { value: "chelsea", label: "Chelsea" },
];

export const footballAwayTeamOptions = [
    { value: "arsenal", label: "Arsenal" },
    { value: "chelsea", label: "Chelsea" },
];
