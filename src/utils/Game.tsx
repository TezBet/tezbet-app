import BigNumber from "bignumber.js";
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WalletContext } from './WalletContextProvider';

type Game = {
    id: string;
    startDate: Date;
    description?: string;

    teamA: string;
    teamB: string;

    betAmountTeamA: BigNumber;
    betAmountTeamB: BigNumber;
    betAmountTie: BigNumber;

    betCountTeamA: number;
    betCountTeamB: number;
    betCountTie: number;

    outcome: number;
    userbet: boolean;
};

type GamesLoaderReturnType = {
    games: Game[];
    refreshGames: () => void;
}

function GamesLoader(props: any) {
    const { Tezos, connected, account } = useContext(WalletContext)!;
    const [games, setGames] = useState<Array<Game>>([]);

    const refreshGames = useCallback(() => {
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                s.games.valueMap.forEach((x: any, i: any) => {
                    const startTime = new Date(x.match_timestamp);

                    g.push({
                        id: s.games.keyMap.get(i),
                        startDate: startTime,
                        description: "test",

                        teamA: x.team_a,
                        teamB: x.team_b,

                        betAmountTeamA: x.bet_amount_on.team_a.dividedBy(1000000),
                        betAmountTeamB: x.bet_amount_on.team_b.dividedBy(1000000),
                        betAmountTie: x.bet_amount_on.tie.dividedBy(1000000),

                        betCountTeamA: x.bets_by_choice.team_a.toNumber(),
                        betCountTeamB: x.bets_by_choice.team_b.toNumber(),
                        betCountTie: x.bets_by_choice.tie.toNumber(),

                        outcome: x.outcome.toNumber(),
                        userbet: connected && x.bet_amount_by_user.keyMap.has('"' + account!.address + '"'),
                    });
                });

                setGames(g);
            });
    }, [Tezos, connected, account]);

    useEffect(() => refreshGames(), [refreshGames]);
    useEffect(() => {
        const refreshTimer = setTimeout(() => refreshGames(), 10000);
        return () => clearTimeout(refreshTimer);
    });

    const cprops: GamesLoaderReturnType = useMemo(() => ({ games, refreshGames }), [refreshGames, games]);
    return props.children(cprops);
}

export { GamesLoader };
export type { Game, GamesLoaderReturnType };

