export interface TableRow {
    name: string;
    flag?: string;
    played?: number;
    matches?: number;
    wins: number;
    draws?: number;
    losses: number;
    points: number;
    result?: "success" | "fail";
}

export interface TableProps {
    headers: string[];
    rows: TableRow[];
    variant?: "football" | "basketball" | "tennis";
}
