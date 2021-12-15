import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Game from '../../utils/Game';
import { WalletContext } from "../../utils/WalletContextProvider";
import { BetModal } from './BetModal';
import { CurrentDateContextProvider } from './Countdown';
import { FutureGameItem, GameItemPlaceholder, OngoingGameItem } from "./GameItem";
import "./GameList.css";

function GameList(props: any) {
    const { Tezos } = useContext(WalletContext)!;
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
                    });
                });

                setGames(g);
            });
    }, [Tezos]);

    useEffect(() => refreshGames(), [refreshGames]);
    useEffect(() => {
        const refreshTimer = setTimeout(() => refreshGames(), 10000);
        return () => clearTimeout(refreshTimer);
    });

    const onBetClick = useCallback((game: Game) => setCurrentGame(game), [setCurrentGame]);
    const onBetClose = useCallback(() => setCurrentGame(undefined), [setCurrentGame]);

    return (
        <Fragment>
            {!props.ongoing && typeof currentGame != "undefined" &&
                <BetModal show={true} currentGame={currentGame} onBetClose={onBetClose} />
            }
            <Container>
                <Row>
                    <CurrentDateContextProvider>
                        {games.length <= 0 && <GameItemPlaceholder />}
                        {props.ongoing &&
                            games.filter((game) => game.status === 1)
                                .map((game) => <OngoingGameItem game={game} key={game.id} />)
                        }
                        {!props.ongoing &&
                            games.filter((game) => game.status === 0)
                                .map((game) => <FutureGameItem
                                    game={game}
                                    key={game.id}
                                    onBetClick={() => onBetClick(game)}
                                />)
                        }
                    </CurrentDateContextProvider>
                </Row>
            </Container>
        </Fragment>
    );
}

export default GameList;