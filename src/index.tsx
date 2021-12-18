import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import GamedRoutes from './routes/GamedRoute';
import NotFound from "./routes/NotFound";

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<GamedRoutes home />} />
                    <Route path="live" element={<GamedRoutes live />} />
                    <Route path="dashboard" element={<GamedRoutes dashboard />} />

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </React.StrictMode>
    </BrowserRouter>,
    document.getElementById("root")
);
