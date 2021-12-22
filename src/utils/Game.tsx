import BigNumber from "bignumber.js";
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { WalletContext } from './WalletContextProvider';

type Game = {
    id: number;
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
    archive: Game[];
}

const zero = new BigNumber(0);

function GamesLoader(props: any) {
    const { Tezos, connected, account, loaded } = useContext(WalletContext)!;
    const [games, setGames] = useState<Array<Game>>([]);
    const [archive, setArchive] = useState<Array<Game>>([]);
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
        if (!loaded) return;
        refreshScores();

        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                const arch = Array<Game>();

                s.archived_games.valueMap.forEach((x: any, i: any) =>
                    arch.push(loadGame(x, s.archived_games.keyMap.get(i), account, connected, true))
                );
                s.games.valueMap.forEach((x: any, i: any) => g.push(loadGame(x, s.games.keyMap.get(i), account, connected)));

                setArchive(arch);
                setGames(g);
            });
    }, [connected, loaded, account, Tezos.wallet, refreshScores]);

    useEffect(refreshGames, [refreshGames]);
    useEffect(() => {
        const refreshTimer = setTimeout(() => refreshGames(), 30000);
        return () => clearTimeout(refreshTimer);
    });

    const cprops: GamesLoaderReturnType = useMemo(() => ({ games, refreshGames, scores, archive }), [refreshGames, games, scores, archive]);
    return props.children(cprops);
}

function loadGame(x: any, id: number, account: any, connected: boolean, archive: boolean = false) {
    const game: Game = {
        id: id,
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
        userBet: connected && x.bet_amount_by_user.keyMap.has('"' + account.address + '"'),

        userBetA: zero,
        userBetB: zero,
        userBetTie: zero,
    };

    if (game.userBet) {
        const bet_by_user = x.bet_amount_by_user.valueMap.get('"' + account.address + '"');

        game.userCanRedeem = !archive && (game.outcome === 10 || (game.outcome === 0 && bet_by_user.team_a > 0)
            || (game.outcome === 1 && bet_by_user.team_b > 0) || (game.outcome === 2 && bet_by_user.tie > 0));

        game.userBetA = bet_by_user.team_a.dividedBy(1000000);
        game.userBetB = bet_by_user.team_b.dividedBy(1000000);
        game.userBetTie = bet_by_user.tie.dividedBy(1000000);
    }

    return game;
}

export { GamesLoader };
export type { Game, GamesLoaderReturnType };

