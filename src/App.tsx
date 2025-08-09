import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FootballPage } from "./pages/Football/FootballPage";
import { TennisPage } from "./pages/Tennis/TennisPage";
import { BasketballPage } from "./pages/Basketball/BasketballPage";

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
                                    <Link to="/football">Football</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/tennis">Tennis</Link>
                                </li>
                                <br />
                                <li>
                                    <Link to="/basketball">Basketball</Link>
                                </li>
                                <br />
                            </ul>
                        </div>
                    }
                />

                <Route path="/football" element={<FootballPage />} />
                <Route path="/tennis" element={<TennisPage />} />
                <Route path="/basketball" element={<BasketballPage />} />
            </Routes>
        </Router>
    );
}

export default App;
