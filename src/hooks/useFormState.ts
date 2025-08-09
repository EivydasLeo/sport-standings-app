import { useState } from "react";

export function useFormState() {
    const [name, setName] = useState("");
    const [home, setHome] = useState("");
    const [away, setAway] = useState("");
    const [h, setH] = useState("");
    const [a, setA] = useState("");

    const resetScore = () => {
        setHome("");
        setAway("");
        setH("");
        setA("");
    };
    const resetName = () => setName("");

    return { name, setName, home, setHome, away, setAway, h, setH, a, setA, resetScore, resetName };
}
