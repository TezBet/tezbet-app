import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import GameList from "./components/GameList/GameList";
import NotFound from "./routes/NotFound";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<GameList future />} />
                    <Route path="ongoing" element={<GameList ongoing />} />
                    <Route path="dashboard" element={<GameList played />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
