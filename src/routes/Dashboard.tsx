import { Fragment, useCallback, useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PlayingCard, ResultCard } from "../components/Dashboard/DashboardItems";
import { BetModal } from "../components/GameList/BetModal";
import { Game, GamesLoaderReturnType } from "../utils/Game";
import { compareGames } from "../utils/utils";
import { WalletContext } from "../utils/WalletContextProvider";
import "./Dashboard.css";

function Dashboard({ gamesLoader }: { gamesLoader: GamesLoaderReturnType }) {
    const { connected, Tezos, refreshBalance } = useContext(WalletContext)!;
    const [currentGame, setCurrentGame] = useState<Game | undefined>();

    const onBetClick = useCallback((game: Game) => setCurrentGame(game), [setCurrentGame]);
    const onBetClose = useCallback(() => {
        setCurrentGame(undefined);
        gamesLoader.refreshGames();
    }, [setCurrentGame, gamesLoader]);

    const onUnBetClick = useCallback(
        (game: Game) => {
            Tezos.wallet
                .at(process.env.REACT_APP_TEZBET_CONTRACT!)
                .then((contract) => contract.methodsObject.unbet_all(game.id).send())
                .then((op) => op.confirmation())
                .then((result) => {
                    if (result.completed) {
                        refreshBalance();
                        gamesLoader.refreshGames();
                    } else {
                        alert("Failed to unbet");
                    }
                });
        },
        [Tezos, refreshBalance, gamesLoader]
    );

    const onRedeem = useCallback(
        (game: Game) => {
            Tezos.wallet
                .at(process.env.REACT_APP_TEZBET_CONTRACT!)
                .then((contract) => contract.methods.redeem_tez(game.id).send())
                .then((op) => op.confirmation())
                .then((result) => {
                    if (result.completed) {
                        refreshBalance();
                        gamesLoader.refreshGames();
                    } else {
                        alert("Failed");
                    }
                });
        },
        [Tezos, refreshBalance, gamesLoader]
    );

    if (!connected) {
        return (
        <div className="dashboard-container center">
            <div className="dashboard-title-bold">
                You need to connect your wallet first!
            </div>
        </div>);
    }

    const userGames = gamesLoader.games.filter((game) => game.userBet);

    const currentFiltered = userGames.filter((game) => game.outcome === -1);
    const redeemableFiltered = userGames.filter((game) => game.outcome !== -1);
    const archiveFiltered = typeof gamesLoader.archive != "undefined" ?
        gamesLoader.archive.slice().filter((game) => game.userBet)
        : Array<Game>();

    return (
        <Fragment>
            {typeof currentGame != "undefined" && <BetModal show={true} currentGame={currentGame} onBetClose={onBetClose} />}
            <Container className="dashboard">
                <Row>
                    <Col>
                        <Row className="dashboard-title">
                            <p className="dashboard-title-bold">Current Bets</p>
                        </Row>
                        <Row xs={1} className="g-4">
                            {currentFiltered.length <= 0 && <Col className="dashboard-placeholder">No bet currently open</Col>}

                            {currentFiltered.slice()
                                .sort((a, b) => compareGames(a, b))
                                .map((game) => (
                                    <PlayingCard key={game.id} game={game} onBetClick={onBetClick} onUnBetClick={onUnBetClick} />
                                ))}
                        </Row>
                    </Col>
                    <Col>
                        <Row className="dashboard-title">
                            <p className="dashboard-title-bold">Bets To Redeem</p>
                        </Row>
                        <Row xs={1} className="g-4">
                            {redeemableFiltered.length <= 0 && <Col className="dashboard-placeholder">No bet to redeem</Col>}

                            {redeemableFiltered.slice()
                                .sort((a, b) => compareGames(a, b))
                                .map((game) => (
                                    <ResultCard key={game.id} game={game} onRedeem={onRedeem} />
                                ))}
                        </Row>
                    </Col>
                </Row>
                <Row className="dashboard-title">
                    <p className="dashboard-title-bold">Bets History</p>
                </Row>
                <Row xs={1} md={2} className="g-4">
                    {archiveFiltered.length <= 0 && <Col className="dashboard-placeholder">No bet history</Col>}

                    {archiveFiltered.slice()
                        .sort((a, b) => compareGames(a, b))
                        .map((game) => (
                            <ResultCard key={game.id} game={game} onRedeem={onRedeem} />
                        ))}
                </Row>
            </Container>
        </Fragment>
    );
}

export default Dashboard;
