import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ButtonShowcase from "./pages/ButtonShowcase";
import InputShowcase from "./pages/InputShowcase";
import { SelectShowcase } from "./pages/SelectShowcase";
import { TableShowcase } from "./pages/TableShowcase";
import { Football } from "./pages/Football";

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div style={{ padding: "2rem" }}>
                            <h1>UI Showcase</h1>
                            <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                                <li>
                                    <Link to="/showcase/buttons">Button Showcase</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/showcase/inputs">Input Showcase</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/showcase/select">Select Showcase</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/showcase/tables">Tables Showcase</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/football">PremierLeaguePage</Link>
                                </li>
                                <br />
                            </ul>
                        </div>
                    }
                />
                <Route path="/showcase/buttons" element={<ButtonShowcase />} />
                <Route path="/showcase/inputs" element={<InputShowcase />} />
                <Route path="/showcase/select" element={<SelectShowcase />} />
                <Route path="/showcase/tables" element={<TableShowcase />} />
                <Route path="/football" element={<Football />} />
            </Routes>
        </Router>
    );
}

export default App;
