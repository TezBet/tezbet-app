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
    userBet: boolean;
    userCanRedeem: boolean;

    userBetA: BigNumber;
    userBetB: BigNumber;
    userBetTie: BigNumber;
};

type GamesLoaderReturnType = {
    games: Game[];
    refreshGames: () => void;
    scores: any;
}

function GamesLoader(props: any) {
    const { Tezos, connected, account } = useContext(WalletContext)!;
    const [games, setGames] = useState<Array<Game>>([]);
    const [scores, setScores] = useState<any>([]);

    const refreshScores = useCallback(() => {
        fetch("https://tezbet.netlify.app/api/matches?status=IN_PLAY,PAUSED,FINISHED,SUSPENDED")
            .then((r) => r.json())
            .then((result) => {
                const newScores: { [id: number]: any } = {};
                result.matches.forEach((m: any) => {
                    newScores[m.id] = m.score.fullTime;
                });
                setScores(newScores);
            }).catch(console.log);
    }, []);

    const refreshGames = useCallback(() => {
        refreshScores();
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                const zero = new BigNumber(0);

                s.games.valueMap.forEach((x: any, i: any) => {
                    const game:Game = {
                        id: s.games.keyMap.get(i),
                        startDate: new Date(x.match_timestamp),
                        description: "",

                        teamA: x.team_a,
                        teamB: x.team_b,

                        betAmountTeamA: x.bet_amount_on.team_a.dividedBy(1000000),
                        betAmountTeamB: x.bet_amount_on.team_b.dividedBy(1000000),
                        betAmountTie: x.bet_amount_on.tie.dividedBy(1000000),

                        betCountTeamA: x.bets_by_choice.team_a.toNumber(),
                        betCountTeamB: x.bets_by_choice.team_b.toNumber(),
                        betCountTie: x.bets_by_choice.tie.toNumber(),

                        outcome: x.outcome.toNumber(),
                        userCanRedeem: false,
                        userBet: connected && x.bet_amount_by_user.keyMap.has('"' + account!.address + '"'),

                        userBetA: zero,
                        userBetB: zero,
                        userBetTie: zero,
                    };

                    if (game.userBet) {
                        const bet_by_user = x.bet_amount_by_user.valueMap.get('"' + account!.address + '"');

                        game.userCanRedeem = (game.outcome === 10 || (game.outcome === 0 && bet_by_user.team_a > 0)
                            || (game.outcome === 1 && bet_by_user.team_b > 0) || (game.outcome === 2 && bet_by_user.tie > 0));

                        game.userBetA = bet_by_user.team_a;
                        game.userBetB = bet_by_user.team_b;
                        game.userBetTie = bet_by_user.tie;
                    }

                    g.push(game);
                });

                setGames(g);
            });
    }, [Tezos, connected, account, refreshScores]);

    useEffect(refreshGames, [refreshGames]);
    useEffect(() => {
        const refreshTimer = setTimeout(() => refreshGames(), 30000);
        return () => clearTimeout(refreshTimer);
    });

    const cprops: GamesLoaderReturnType = useMemo(() => ({ games, refreshGames, scores }), [refreshGames, games, scores]);
    return props.children(cprops);
}

export { GamesLoader };
export type { Game, GamesLoaderReturnType };

