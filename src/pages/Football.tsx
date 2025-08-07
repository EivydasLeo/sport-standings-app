import { Link } from "react-router-dom";
import { Layout } from "../components/layout/Layout";
import { PageHeader } from "../components/PageHeader/PageHeader";
import { TeamForm } from "../components/TeamForm/TeamForm";
import { ScoreForm } from "../components/ScoreForm/ScoreForm";
import {
    footballAwayTeamOptions,
    footballHeaders,
    footballHomeTeamOptions,
    footballStandings,
} from "../data/football";
import { Table } from "../components/ui/Table/Table";

export const Football = () => {
    return (
        <>
            <PageHeader title={"Premier League"} variant="football" />
            <Layout variant="football">
                <TeamForm
                    variant="football"
                    heading="Add Team"
                    placeholder={"Team name"}
                    buttonLabel={"Add"}
                />
                <ScoreForm
                    variant="football"
                    heading="Add Score"
                    homeTeamOptions={footballHomeTeamOptions}
                    awayTeamOptions={footballAwayTeamOptions}
                    homeScore=""
                    awayScore=""
                    onHomeTeamChange={() => {}}
                    onAwayTeamChange={() => {}}
                    onHomeScoreChange={() => {}}
                    onAwayScoreChange={() => {}}
                    onSubmit={() => {}}
                    buttonLabel="Add Score"
                />
                <Table variant="football" headers={footballHeaders} rows={footballStandings} />
            </Layout>
            <Link to="/">Back to homepage</Link>
        </>
    );
};
