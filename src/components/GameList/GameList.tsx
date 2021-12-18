import { Fragment, useCallback, useContext, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Game, GamesLoaderReturnType } from "../../utils/Game";
import { compareGames } from '../../utils/utils';
import { WalletContext } from "../../utils/WalletContextProvider";
import { BetModal } from "./BetModal";
import { CurrentDateContextProvider } from "./Counter";
import { FutureGameItem, GameItemPlaceholder, OngoingGameItem, PlayedGameItem } from "./GameItem";
import "./GameList.css";

function GameList({ gamesLoader, future }: { gamesLoader: GamesLoaderReturnType, future?: boolean }) {
    const { Tezos, refreshBalance } = useContext(WalletContext)!;
    const [currentGame, setCurrentGame] = useState<Game | undefined>();

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

    const nowTime = new Date().getTime();

    return (
        <Fragment>
            {future && typeof currentGame != "undefined" && (
                <BetModal show={true} currentGame={currentGame} onBetClose={onBetClose} />
            )}
            <Container>
                <Row>
                    <CurrentDateContextProvider>
                        {gamesLoader.games.length <= 0 && <GameItemPlaceholder />}
                        {!future &&
                            gamesLoader.games
                                .filter((game) => game.startDate.getTime() <= nowTime)
                                .sort((a, b) => compareGames(b, a))
                                .map((game) => game.outcome === -1 ?
                                    <OngoingGameItem game={game} key={game.id} />
                                    :
                                    <PlayedGameItem onRedeem={() => onRedeem(game)} game={game} key={game.id} />
                                )}
                        {future &&
                            gamesLoader.games
                                .filter((game) => game.startDate.getTime() > nowTime)
                                .sort((a, b) => compareGames(a, b))
                                .map((game) => <FutureGameItem game={game} key={game.id} onBetClick={() => onBetClick(game)} />)}
                    </CurrentDateContextProvider>
                </Row>
            </Container>
        </Fragment>
    );
}

export default GameList;
