import { ReactComponent as MoreIcon } from "bootstrap-icons/icons/three-dots-vertical.svg";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { Col, Container, Placeholder, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Game from '../utils/Game';
import { WalletContext } from "../utils/WalletContextProvider";
import { BetModal } from './BetModal';
import { BetButton, CornerButton, CountDown, DateSpan, Multiplier } from "./GameButtons";
import "./GameList.css";

function GameList(props: any) {
    const { Tezos } = useContext(WalletContext)!;
    const [games, setGames] = useState<Array<Game>>([]);
    const [date, setDate] = useState(new Date());
    const [currentGame, setCurrentGame] = useState<Game | undefined>();

    const refreshGames = useCallback(() => {
        const d = new Date();
        d.setUTCSeconds(d.getSeconds() + 30);
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => contract.storage())
            .then((s: any) => {
                const g = Array<Game>();
                s.games.valueMap.forEach((x: any, i: any) => {
                    g.push({
                        id: s.games.keyMap.get(i),
                        startDate: d,
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
        const countdownTimer = setTimeout(() => setDate(new Date()), 1000);

        return () => { clearTimeout(refreshTimer); clearTimeout(countdownTimer); };
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
                    {games.length <= 0 && <GameItemPlaceholder />}
                    {props.ongoing &&
                        games.filter((game) => game.status === 1)
                            .map((game) => <OngoingGameItem {...game} key={game.id} />)
                    }
                    {!props.ongoing &&
                        games.filter((game) => game.status === 0)
                            .map((game) => <FutureGameItem
                                currentDate={date}
                                game={game}
                                key={game.id}
                                onBetClick={() => onBetClick(game)}
                            />)
                    }
                </Row>
            </Container>
        </Fragment>
    );
}

function GameItemPlaceholder() {
    return (
        <Container className="game-item game-item-placeholder" style={{ textAlign: "left" }}>
            <Row>
                <Placeholder style={{ textAlign: "center" }} as="span" animation="glow">
                    <Placeholder xs={4} size="lg" />
                </Placeholder>
            </Row>
            {[...Array(3)].map((x, i) => (
                <Row key={i}>
                    {[...Array(6)].map((y, j) => (
                        <Col key={i + "-" + j} xs={2}>
                            <Placeholder style={{ textAlign: "center" }} as="span" animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

function FutureGameItem({ game, onBetClick, currentDate }: { game: Game; onBetClick: () => void; currentDate: Date }) {
    const total = game.betAmountTeamA.plus(game.betAmountTeamB).plus(game.betAmountTie);
    const distance = game.startDate.getTime() - currentDate!.getTime();

    return (
        <Container
            className="game-item"
            style={
                distance < 0 ? { display: "block", backgroundColor: "red !important" } : { backgroundColor: "green !important" }
            }
        >
            <CornerButton contractId={game.id} />
            <Row className="g-0">
                <Col xs={2} className="game-vertical-align colorsecondary">
                    <Row>
                        <p className="game-title-bold">Total bet</p>
                    </Row>
                    <Row>
                        <p>
                            {" "}
                            <span className="colorprimary game-title game-title-bold">
                                {total.decimalPlaces(1).toString()}
                            </span>{" "}
                            <span className="xtz">ꜩ</span>
                        </p>
                    </Row>
                </Col>
                <Col xs={8}>
                    <Container className="game-item-hero">
                        <Row>
                            <Col xs={4}>
                                <p className="game-item-title-left">{game.description ? game.description : "Match"}</p>
                            </Col>
                            <Col xs={4}>
                                <CountDown distance={distance} />
                            </Col>
                            <Col xs={4}>
                                <DateSpan targetDate={game.startDate} />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="game-vertical-align game-col-title">
                                <p>{game.teamA}</p>
                            </Col>
                            <Col xs={4} className="game-vertical-align game-col-subtitle">
                                <p className="game-tie">TIE</p>
                            </Col>
                            <Col xs={4} className="game-vertical-align game-col-title">
                                <p>{game.teamB}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="game-vertical-align">
                                <Multiplier total={total} betAmount={game.betAmountTeamA} />
                            </Col>
                            <Col xs={4} className="game-vertical-align">
                                <Multiplier total={total} betAmount={game.betAmountTie} />
                            </Col>
                            <Col xs={4} className="game-vertical-align">
                                <Multiplier total={total} betAmount={game.betAmountTeamB} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <p>
                        <BetButton onBetClick={onBetClick} />
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

function OngoingGameItem(props: any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    const multiplierTeamA = (total / props.teamABets).toPrecision(2);
    const multiplierTeamB = (total / props.teamBBets).toPrecision(2);
    const multiplierTie = (total / props.tieBets).toPrecision(2);

    return (
        <Container className="game-item">
            <CornerButton contractId={props.id} />
            <Row>
                <Col xs={2} className="game-vertical-align">
                    <Row>
                        <p>Total</p>
                    </Row>
                    <Row className="game-col-title">
                        <p>{total}XTZ</p>
                    </Row>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <Row>
                        <Col className="game-col-title">
                            <p>{props.teamA}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                {multiplierTeamA} ({props.teamABets}XTZ)
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Container className="game-item-hero">
                        <Row>
                            <Col>
                                <p className="game-item-title">Ligue des Champions</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={3} className="game-score game-vertical-align">
                                <p>{props.teamAScore}</p>
                            </Col>
                            <Col xs={6} className="game-vertical-align">
                                <Row>
                                    <Col className="game-col-title">-</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            {multiplierTie} ({props.tieBets}XTZ)
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs={3} className="game-score game-vertical-align">
                                <p>{props.teamBScore}</p>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <Row>
                        <Col className="game-col-title">
                            <p>{props.teamB}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>
                                {multiplierTeamB} ({props.teamBBets}XTZ)
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} className="game-vertical-align"></Col>
                <Col xs={1} className="game-vertical-align">
                    <Link to={`/game/${props.id}`} className="game-item-more">
                        <MoreIcon width={20} height={20} className="game-icon" />
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default GameList;
