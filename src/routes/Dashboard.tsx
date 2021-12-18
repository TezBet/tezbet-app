import BigNumber from "bignumber.js";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PlayingCard, ResultCard } from "../components/Dashboard/DashboardItems";
import { BetModal } from "../components/GameList/BetModal";
import { Game, GamesLoaderReturnType } from "../utils/Game";
import { compareGames } from "../utils/utils";
import { WalletContext } from "../utils/WalletContextProvider";
import "./Dashboard.css";

function Dashboard({ gamesLoader }: { gamesLoader: GamesLoaderReturnType }) {
    const { connected, Tezos, account, refreshBalance } = useContext(WalletContext)!;
    const [archive, setArchive] = useState<Array<Game>>();
    const [currentGame, setCurrentGame] = useState<Game | undefined>();

    const refreshArchive = useCallback(() => {
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                s.games.valueMap.forEach((x: any, i: any) => {
                    const startTime = new Date(x.match_timestamp);
                    const hasBet = connected && x.bet_amount_by_user.keyMap.has('"' + account!.address + '"');
                    const zero = new BigNumber(0);

                    g.push({
                        id: s.games.keyMap.get(i),
                        startDate: startTime,
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
                        userBet: hasBet,
                        userCanRedeem: false,

                        userBetA: zero,
                        userBetB: zero,
                        userBetTie: zero,
                    });
                });

                setArchive(g);
            })
            .catch(console.log);
    }, [Tezos, account, connected]);

    useEffect(refreshArchive, [refreshArchive]);

    const onBetClick = useCallback((game: Game) => setCurrentGame(game), [setCurrentGame]);
    const onBetClose = useCallback(() => setCurrentGame(undefined), [setCurrentGame]);
    const onUnBetClick = useCallback(
        (game: Game) => {
            Tezos.wallet
                .at(process.env.REACT_APP_TEZBET_CONTRACT!)
                .then((contract) => contract.methods.unbet_all(game.id).send())
                .then((op) => op.confirmation())
                .then((result) => {
                    if (result.completed) {
                        refreshBalance();
                    } else {
                        alert("Failed");
                    }
                });
        },
        [Tezos, refreshBalance]
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
        return <p>Please connect with your wallet</p>;
    }

    const currentFiltered = gamesLoader.games.filter((game) => game.userBet && game.outcome === -1);
    const redeemableFiltered = gamesLoader.games.filter((game) => game.userBet && game.outcome !== -1);
    const archiveFiltered = typeof archive != "undefined" ? archive.filter((game) => game.userBet) : Array<Game>();

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

                            {currentFiltered
                                .sort((a, b) => compareGames(a, b))
                                .map((game) => (
                                    <PlayingCard game={game} onBetClick={onBetClick} onUnBetClick={onUnBetClick} />
                                ))}
                        </Row>
                    </Col>
                    <Col>
                        <Row className="dashboard-title">
                            <p className="dashboard-title-bold">Bets To Redeem</p>
                        </Row>
                        <Row xs={1} className="g-4">
                            {redeemableFiltered.length <= 0 && <Col className="dashboard-placeholder">No bet to redeem</Col>}

                            {redeemableFiltered
                                .sort((a, b) => compareGames(a, b))
                                .map((game) => (
                                    <ResultCard game={game} onRedeem={onRedeem} />
                                ))}
                        </Row>
                    </Col>
                </Row>
                <Row className="dashboard-title">
                    <p className="dashboard-title-bold">Bets History</p>
                </Row>
                <Row xs={1} md={2} className="g-4">
                    {archiveFiltered.length <= 0 && <Col className="dashboard-placeholder">No bet history</Col>}

                    {archiveFiltered
                        .sort((a, b) => compareGames(a, b))
                        .map((game) => (
                            <ResultCard game={game} onRedeem={onRedeem} />
                        ))}
                </Row>
            </Container>
        </Fragment>
    );
}

export default Dashboard;
