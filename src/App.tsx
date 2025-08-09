import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FootballPage } from "./pages/Football/FootballPage";
import { TennisPage } from "./pages/Tennis/TennisPage";
import { BasketballPage } from "./pages/Basketball/BasketballPage";

const pages = [
    { path: "/football", label: "Football", element: <FootballPage /> },
    { path: "/tennis", label: "Tennis", element: <TennisPage /> },
    { path: "/basketball", label: "Basketball", element: <BasketballPage /> },
];

export default function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <div style={{ padding: "2rem" }}>
                            <h1>UI Showcase</h1>
                            <ul style={{ marginTop: "1rem", listStyle: "none", padding: 0 }}>
                                {pages.map(({ path, label }) => (
                                    <li key={path} style={{ marginBottom: "2rem" }}>
                                        <Link to={path}>{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                />
                {pages.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                ))}
            </Routes>
        </Router>
    );
}
