import React from "react";
import { Select } from "../components/ui/Select/Select";
import { Link } from "react-router-dom";

export const SelectShowcase: React.FC = () => {
    return (
        <div style={{ margin: "0 auto", padding: "2rem" }}>
            <h2 style={{ marginBottom: "1rem" }}>Select Variations</h2>

            <div style={{ marginBottom: "1rem" }}>
                <Select
                    options={[
                        { label: "Home Team", value: "home" },
                        { label: "Away Team", value: "away" },
                    ]}
                    name={"test"}
                />
            </div>

            <div style={{ marginBottom: "1rem" }}>
                <Select
                    options={[
                        { label: "Lithuania", value: "lt" },
                        { label: "Spain", value: "es" },
                        { label: "Germany", value: "de" },
                    ]}
                    name={"test"}
                />
            </div>
            <br />
            <br />
            <Link to="/">Back to homepage</Link>
        </div>
    );
};
