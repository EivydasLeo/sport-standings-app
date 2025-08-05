import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ButtonShowcase from "./pages/ButtonShowcase";
import InputShowcase from "./pages/InputShowcase";

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
                            </ul>
                        </div>
                    }
                />
                <Route path="/showcase/buttons" element={<ButtonShowcase />} />
                <Route path="/showcase/inputs" element={<InputShowcase />} />
            </Routes>
        </Router>
    );
}

export default App;
