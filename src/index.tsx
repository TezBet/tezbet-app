import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WalletProvider } from '@tezos-contrib/react-wallet-provider';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider name="tezbet" clientType="beacon">
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);