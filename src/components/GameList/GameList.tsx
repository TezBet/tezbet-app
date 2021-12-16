import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Game from "../../utils/Game";
import { WalletContext } from "../../utils/WalletContextProvider";
import { BetModal } from "./BetModal";
import { CurrentDateContextProvider } from "./Counter";
import { FutureGameItem, GameItemPlaceholder, OngoingGameItem, PlayedGameItem } from "./GameItem";
import "./GameList.css";

function GameList(props: any) {
    const { Tezos, connected, account, refreshBalance } = useContext(WalletContext)!;
    const [games, setGames] = useState<Array<Game>>([]);
    const [currentGame, setCurrentGame] = useState<Game | undefined>();

    const refreshGames = useCallback(() => {
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                s.games.valueMap.forEach((x: any, i: any) => {
                    g.push({
                        id: s.games.keyMap.get(i),
                        startDate: new Date(),
                        description: "test",

                        teamA: x.team_a,
                        teamB: x.team_b,

                        betAmountTeamA: x.bet_amount_on.team_a.dividedBy(1000000),
                        betAmountTeamB: x.bet_amount_on.team_b.dividedBy(1000000),
                        betAmountTie: x.bet_amount_on.tie.dividedBy(1000000),

                        betCountTeamA: x.bets_by_choice.team_a.toNumber(),
                        betCountTeamB: x.bets_by_choice.team_b.toNumber(),
                        betCountTie: x.bets_by_choice.tie.toNumber(),

                        status: x.status.toNumber(),

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

    const onBetClick = useCallback((game: Game) => setCurrentGame(game), [setCurrentGame]);
    const onBetClose = useCallback(() => setCurrentGame(undefined), [setCurrentGame]);
    const onRedeem = useCallback(
        (game: Game) => {
            if (!game.userbet) {
                alert("There is no bet to redeem here for you!");
            } else {
                Tezos.wallet
                    .at(process.env.REACT_APP_TEZBET_CONTRACT!)
                    .then((contract) => contract.methods.redeem_tez(game.id).send())
                    .then((op) => op.confirmation())
                    .then((result) => {
                        if (result.completed) {
                            refreshBalance();
                        } else {
                            alert("Fail to redeem");
                        }
                    });
            }
        },
        [Tezos.wallet, refreshBalance]
    );

    return (
        <Fragment>
            {props.future && typeof currentGame != "undefined" && (
                <BetModal show={true} currentGame={currentGame} onBetClose={onBetClose} />
            )}
            <Container>
                <Row>
                    <CurrentDateContextProvider>
                        {games.length <= 0 && <GameItemPlaceholder />}
                        {props.ongoing &&
                            games
                                .filter((game) => game.status === 1)
                                .map((game) => <OngoingGameItem game={game} key={game.id} />)}
                        {props.future &&
                            games
                                .filter((game) => game.status === 0)
                                .map((game) => <FutureGameItem game={game} key={game.id} onBetClick={() => onBetClick(game)} />)}
                        {props.played &&
                            games
                                .filter((game) => game.status === 2)
                                .map((game) => <PlayedGameItem onRedeem={() => onRedeem(game)} game={game} key={game.id} />)}
                    </CurrentDateContextProvider>
                </Row>
            </Container>
        </Fragment>
    );
}

export default GameList;
