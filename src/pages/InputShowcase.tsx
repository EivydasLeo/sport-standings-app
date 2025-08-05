import { Input } from "../components/ui/Input/Input";
import { Link } from "react-router-dom";

export default function InputShowcase() {
    return (
        <div style={{ padding: "2rem" }}>
            <h2>Input Variations</h2>

            <div
                style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" }}
            >
                <Input label="Default" placeholder="Default input" name="test" />

                <Input
                    label="With Error"
                    placeholder="Something wrong"
                    error="This field is required"
                    name="test"
                />
            </div>
            <br />
            <br />
            <Link to="/">Back to homepage</Link>
        </div>
    );
}
