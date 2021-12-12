import "./GameList.css";

import { Container, Row, Col, Placeholder } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReactComponent as MoreIcon } from "bootstrap-icons/icons/three-dots-vertical.svg";

import {
    BetButton,
    Odd,
    CornerButton,
    DateSpan,
    CountDown,
} from "./GameButtons";

function GameList(props: any) {
    if (props.ongoing) {
        return (
            <Container>
                <Row>
                    <OngoingGameItem
                        teamA="Italy"
                        teamB="Germany"
                        teamABets={300}
                        teamBBets={345}
                        tieBets={754}
                        teamAScore={2}
                        teamBScore={1}
                        id="tz1VQnqCCqX4K5sP3FNkVSNKTdCAMJDd3E1n"
                    />
                    <OngoingGameItem
                        teamA="Spain"
                        teamB="France"
                        teamABets={2455}
                        teamBBets={2342}
                        tieBets={234}
                        teamAScore={0}
                        teamBScore={0}
                    />
                    <OngoingGameItem
                        teamA="France"
                        teamB="England"
                        teamABets={300}
                        teamBBets={500}
                        tieBets={844}
                        teamAScore={4}
                        teamBScore={4}
                    />
                    <OngoingGameItem
                        teamA="Germany"
                        teamB="Poland"
                        teamABets={300}
                        teamBBets={500}
                        tieBets={235}
                        teamAScore={1}
                        teamBScore={3}
                    />
                    <OngoingGameItem
                        teamA="Belgium"
                        teamB="Switzerland"
                        teamABets={253}
                        teamBBets={253}
                        tieBets={674}
                        teamAScore={3}
                        teamBScore={2}
                    />
                    <OngoingGameItem
                        teamA="Ireland"
                        teamB="Scotland"
                        teamABets={300}
                        teamBBets={500}
                        tieBets={800}
                        teamAScore={5}
                        teamBScore={4}
                    />
                    <OngoingGameItem
                        teamA="Croatia"
                        teamB="Canada"
                        teamABets={300}
                        teamBBets={500}
                        tieBets={800}
                        teamAScore={0}
                        teamBScore={3}
                    />
                    <OngoingGameItem
                        teamA="England"
                        teamB="Poland"
                        teamABets={300}
                        teamBBets={500}
                        tieBets={800}
                        teamAScore={0}
                        teamBScore={1}
                    />
                    <GameItemPlaceholder />
                </Row>
            </Container>
        );
    }
    let cheatDate = new Date();
    cheatDate.setMinutes(cheatDate.getMinutes() + 20);
    const date1 = cheatDate;
    const date2 = cheatDate;
    cheatDate.setMinutes(cheatDate.getMinutes() + 45);
    const date3 = cheatDate;
    cheatDate.setHours(cheatDate.getHours() + 1);

    return (
        <Container>
            <Row>
                <FutureGameItem
                    date={date1}
                    teamA="Italy"
                    teamB="Germany"
                    description="Champions' league"
                    teamABets={3000}
                    teamBBets={3045}
                    tieBets={754}
                    id="gjfdhsjghjfdbg"
                />
                <FutureGameItem
                    date={date2}
                    teamA="Ireland"
                    teamB="Scotland"
                    description="Champions' league"
                    teamABets={3000}
                    teamBBets={5000}
                    tieBets={800}
                    id="fsdfgdsqgqs"
                />
                <FutureGameItem
                    date={date3}
                    teamA="Croatia"
                    teamB="Canada"
                    description="Match amical"
                    teamABets={4000}
                    teamBBets={3500}
                    tieBets={800}
                    id="hfjdsjfjkds"
                />
                <FutureGameItem
                    date={date3}
                    teamA="Suisse"
                    teamB="Helvétie"
                    teamABets={0}
                    teamBBets={200}
                    tieBets={10000}
                    id="zzzzzzzzzzz"
                />
                <FutureGameItem
                    date={date3}
                    description="Taupin Divin"
                    teamA="IMTBS"
                    teamB="TSP"
                    teamABets={0}
                    teamBBets={0}
                    tieBets={0}
                    id="fffffffffff"
                />
                <FutureGameItem
                    date={cheatDate}
                    description="CotCodINT"
                    teamA="Poule"
                    teamB="Renard"
                    teamABets={50}
                    teamBBets={75}
                    tieBets={25}
                    id="aaaaaaaaaaa"
                />
            </Row>
        </Container>
    );
}

function GameItemPlaceholder() {
    return (
        <Container
            className="game-item game-item-placeholder"
            style={{ textAlign: "left" }}
        >
            <Row>
                <Placeholder
                    style={{ textAlign: "center" }}
                    as="span"
                    animation="glow"
                >
                    <Placeholder xs={4} size="lg" />
                </Placeholder>
            </Row>
            {[...Array(3)].map((x, i) => (
                <Row key={i}>
                    {[...Array(6)].map((y, j) => (
                        <Col key={i + "-" + j} xs={2}>
                            <Placeholder
                                style={{ textAlign: "center" }}
                                as="span"
                                animation="glow"
                            >
                                <Placeholder xs={12} />
                            </Placeholder>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

interface FutureGameItemProps {
    date: Date;
    description?: string;
    teamA: string;
    teamB: string;
    id: string;
    teamABets: number;
    teamBBets: number;
    tieBets: number;
}

function FutureGameItem(props: FutureGameItemProps) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    console.log(typeof total);
    return (
        <Container className="game-item">
            <CornerButton contractId={props.id} />
            <Row className="g-0">
                <Col xs={2} className="game-vertical-align colorsecondary">
                    <Row>
                        <p className="game-title-bold">Total bet</p>
                    </Row>
                    <Row>
                        <p>
                            {" "}
                            <span className="colorprimary game-title game-title-bold">
                                {total}
                            </span>{" "}
                            <span className="xtz">ꜩ</span>
                        </p>
                    </Row>
                </Col>
                <Col xs={8}>
                    <Container className="game-item-hero">
                        <Row>
                            <Col xs={4}>
                                <p className="game-item-title-left">
                                    {props.description
                                        ? props.description
                                        : "Match"}
                                </p>
                            </Col>
                            <Col xs={4}>
                                <CountDown />
                            </Col>
                            <Col xs={4}>
                                <DateSpan targetDate={props.date} />
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={4}
                                className="game-vertical-align game-col-title"
                            >
                                <p>{props.teamA}</p>
                            </Col>
                            <Col
                                xs={4}
                                className="game-vertical-align game-col-subtitle"
                            >
                                <p className="game-tie">TIE</p>
                            </Col>
                            <Col
                                xs={4}
                                className="game-vertical-align game-col-title"
                            >
                                <p>{props.teamB}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={4} className="game-vertical-align">
                                <Odd bets={total} bet={props.teamABets} />
                            </Col>
                            <Col xs={4} className="game-vertical-align">
                                <Odd bets={total} bet={props.tieBets} />
                            </Col>
                            <Col xs={4} className="game-vertical-align">
                                <Odd bets={total} bet={props.teamBBets} />
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <p>
                        <BetButton id={props.id} />
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

function OngoingGameItem(props: any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    const oddTeamA = (total / props.teamABets).toPrecision(2);
    const oddTeamB = (total / props.teamBBets).toPrecision(2);
    const oddTie = (total / props.tieBets).toPrecision(2);

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
                                {oddTeamA} ({props.teamABets}XTZ)
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={4}>
                    <Container className="game-item-hero">
                        <Row>
                            <Col>
                                <p className="game-item-title">
                                    Ligue des Champions
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                xs={3}
                                className="game-score game-vertical-align"
                            >
                                <p>{props.teamAScore}</p>
                            </Col>
                            <Col xs={6} className="game-vertical-align">
                                <Row>
                                    <Col className="game-col-title">-</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p>
                                            {oddTie} ({props.tieBets}XTZ)
                                        </p>
                                    </Col>
                                </Row>
                            </Col>
                            <Col
                                xs={3}
                                className="game-score game-vertical-align"
                            >
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
                                {oddTeamB} ({props.teamBBets}XTZ)
                            </p>
                        </Col>
                    </Row>
                </Col>
                <Col xs={1} className="game-vertical-align">
                    <BetButton id={props.id} />
                </Col>
                <Col xs={1} className="game-vertical-align">
                    <Link to={`/game/${props.id}`} className="game-item-more">
                        <MoreIcon
                            width={20}
                            height={20}
                            className="game-icon"
                        />
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default GameList;
