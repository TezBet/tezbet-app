import React from 'react';
import ReactDOM from 'react-dom';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import GameList from './components/GameList';
import Dashboard from './routes/Dashboard';
import NotFound from './routes/NotFound';
import Game from './routes/Game';

ReactDOM.render(
<BrowserRouter>
    <React.StrictMode>
        <WalletProvider name="tezbet" clientType="beacon">
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<GameList />} />
                    <Route path="ongoing" element={<GameList ongoing />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    <Route path="game">
                        <Route index element={<NotFound />} />
                        <Route path=":gameId">
                            <Route index element={<Game />} />
                            <Route path="bet" element={<Game bet />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </WalletProvider>
    </React.StrictMode>
</BrowserRouter>,
document.getElementById('root'),
);