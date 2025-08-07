import { Table } from "../components/ui/Table/Table";

const footballData = [
    { name: "Chelsea", played: 3, wins: 2, draws: 0, losses: 1, points: 6 },
    { name: "Arsenal", played: 3, wins: 1, draws: 1, losses: 1, points: 4 },
];

const basketballData = [
    { name: "Lietuva", wins: 2, draws: 0, losses: 1, points: 6 },
    { name: "Ispanija", wins: 3, draws: 0, losses: 0, points: 9 },
];

const tennisData = [
    {
        name: "Djokovic",
        played: 9,
        wins: 5,
        losses: 4,
        points: 15,
    },
    {
        name: "Alcaraz",
        played: 7,
        wins: 4,
        losses: 3,
        points: 12,
    },
];

export const TableShowcase = () => {
    return (
        <div style={{ display: "grid", gap: "2rem" }}>
            <div>
                <h2>Premier League</h2>
                <Table
                    variant="football"
                    headers={["Team", "P", "W", "D", "L", "Pts"]}
                    rows={footballData}
                />
            </div>

            <div>
                <h2>Eurobasket</h2>
                <Table
                    variant="basketball"
                    headers={["Team", "W", "D", "L", "Pts"]}
                    rows={basketballData}
                />
            </div>

            <div>
                <h2>Wimbledon</h2>
                <Table
                    variant="tennis"
                    headers={["Player", "M", "W", "L", "Pts"]}
                    rows={tennisData}
                />
            </div>
        </div>
    );
};
