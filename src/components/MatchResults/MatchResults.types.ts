export type MatchResultsItem = {
    home: string;
    away: string;
    homeScore: number;
    awayScore: number;
};
export type MatchResultsTeamRef = {
    name: string;
    countryCode?: string;
};
export interface MatchResultsProps {
    matches: MatchResultsItem[];
    teams: MatchResultsTeamRef[];
    flagWidth?: number;
}
