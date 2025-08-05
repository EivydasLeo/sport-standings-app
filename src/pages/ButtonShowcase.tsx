import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button/Button";

export default function ButtonShowcase() {
    return (
        <div style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <h2>Button Variations</h2>

            <Button variant="primary" size="sm">
                Primary SM
            </Button>
            <Button variant="primary" size="md">
                Primary MD
            </Button>
            <Button variant="primary" size="lg" fullWidth>
                Primary LG Full Width
            </Button>
            <Button variant="secondary" size="md">
                Secondary MD
            </Button>
            <Button variant="accent" size="md">
                Accent
            </Button>
            <Button variant="success" size="md">
                Success
            </Button>

            <Button variant="success" icon="+" size="md">
                Add Player
            </Button>
            <Link to="/"> Back to homepage</Link>
        </div>
    );
}
