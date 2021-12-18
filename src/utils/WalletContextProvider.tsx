import { AccountInfo, NetworkType } from '@airgap/beacon-sdk';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { TezosToolkit } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

type WalletContextType = {
    wallet: BeaconWallet | undefined,
    account: AccountInfo | undefined,
    connected: boolean,
    connect: () => void,
    disconnect: () => void,
    Tezos: TezosToolkit,
    balance: BigNumber,
    refreshBalance: () => void,
    connecting: boolean,
};

interface WalletProviderProps {
    network: NetworkType;
    name: string;
    rpc: string;
    children: any;
}

function WalletContextProvider(props: WalletProviderProps) {
    const [wallet, setWallet] = useState<BeaconWallet | undefined>(undefined);
    const [account, setAccount] = useState<AccountInfo | undefined>(undefined);
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(new BigNumber(0));
    const [connecting, setConnecting] = useState(false);

    const options = useMemo(() => ({
        name: props.name,
        preferredNetwork: props.network,
    }), [props.network, props.name]);
    useEffect(() => { if (typeof wallet == 'undefined') setWallet(new BeaconWallet(options)) }, [wallet, options]);

    const refreshAccount = useCallback(() => {
        wallet?.client.getActiveAccount()
            .then((a) => {
                setAccount(a);
                setConnected(typeof a != 'undefined');
                setConnecting(false);
            });
    }, [wallet]);
    useEffect(() => refreshAccount(), [refreshAccount, wallet]);

    const connect = useCallback(() => {
        if (connecting) return;
        setConnecting(true);
        wallet!.requestPermissions({ network: { type: props.network } })
            .then((_) => refreshAccount())
            .catch((err) => {console.log(JSON.stringify(err, null, 2)); setConnecting(false);});
    }, [wallet, refreshAccount, props.network, connecting]);

    const disconnect = useCallback(() => {
        wallet!.clearActiveAccount();
        wallet!.disconnect();
        setConnected(false);
        setAccount(undefined);
    }, [wallet]);

    const Tezos = useMemo(() => {
        const t = new TezosToolkit(props.rpc);
        t.setWalletProvider(wallet);
        return t;
    }, [wallet, props.rpc]);

    const refreshBalance = useCallback(() => {
        if (connected) Tezos.tz.getBalance(account!.address).then((b) => setBalance(b.dividedBy(1000000)));
    }, [account, connected, Tezos])
    useEffect(() => refreshBalance(), [refreshBalance]);

    const value = useMemo(() => ({
        account,
        wallet,
        connected,
        connect,
        disconnect,
        Tezos: Tezos,
        balance,
        refreshBalance,
        connecting,
    }), [account, wallet, connected, connect, disconnect, Tezos, balance, refreshBalance, connecting]);

    return <WalletContext.Provider value={value} >
        {props.children}
    </WalletContext.Provider>
}

export { WalletContextProvider, WalletContext };
export type { WalletContextType };

