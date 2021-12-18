import { Fragment, useCallback, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Game, GamesLoaderReturnType } from "../../utils/Game";
import { compareGames } from '../../utils/utils';
import { BetModal } from "./BetModal";
import { CurrentDateContextProvider } from "./Counter";
import { FutureGameItem, GameItemPlaceholder, OngoingGameItem } from "./GameItem";
import "./GameList.css";

function GameList({ gamesLoader, future }: { gamesLoader: GamesLoaderReturnType, future?: boolean }) {
    const [currentGame, setCurrentGame] = useState<Game | undefined>();
    const onBetClick = useCallback((game: Game) => setCurrentGame(game), [setCurrentGame]);
    const onBetClose = useCallback(() => setCurrentGame(undefined), [setCurrentGame]);
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
                                .filter((game) => game.startDate.getTime() <= nowTime && game.outcome === -1)
                                .sort((a, b) => compareGames(b, a))
                                .map((game) => <OngoingGameItem game={game} key={game.id} score={gamesLoader.scores[game.id]} />)}
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
