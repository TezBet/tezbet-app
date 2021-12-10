import './GameList.css';

import { Container, Row, Col, Placeholder } from 'react-bootstrap';
import { Link } from "react-router-dom";

import {ReactComponent as MoreIcon} from 'bootstrap-icons/icons/three-dots-vertical.svg';
import {BetButton, Odd, CornerButton} from './GameButtons';

function GameList(props:any) {
    if (props.ongoing) {
        return <Container>
            <Row>
                <OngoingGameItem teamA="Italy" teamB="Germany" teamABets={300} teamBBets={345} tieBets={754} teamAScore={2} teamBScore={1} id="tz1VQnqCCqX4K5sP3FNkVSNKTdCAMJDd3E1n" />
                <OngoingGameItem teamA="Spain" teamB="France" teamABets={2455} teamBBets={2342} tieBets={234} teamAScore={0} teamBScore={0} />
                <OngoingGameItem teamA="France" teamB="England" teamABets={300} teamBBets={500} tieBets={844} teamAScore={4} teamBScore={4} />
                <OngoingGameItem teamA="Germany" teamB="Poland" teamABets={300} teamBBets={500} tieBets={235} teamAScore={1} teamBScore={3} />
                <OngoingGameItem teamA="Belgium" teamB="Switzerland" teamABets={253} teamBBets={253} tieBets={674} teamAScore={3} teamBScore={2} />
                <OngoingGameItem teamA="Ireland" teamB="Scotland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={5} teamBScore={4} />
                <OngoingGameItem teamA="Croatia" teamB="Canada" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={3} />
                <OngoingGameItem teamA="England" teamB="Poland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={1} />
                <GameItemPlaceholder />
            </Row>
        </Container>
    }

    return <Container>
        <Row>
            <FutureGameItem teamA="Italy" teamB="Germany" teamABets={3000} teamBBets={3045} tieBets={754} id="gjfdhsjghjfdbg" />
            <FutureGameItem teamA="Ireland" teamB="Scotland" teamABets={3000} teamBBets={5000} tieBets={800} id="fsdfgdsqgqs" />
            <FutureGameItem teamA="Croatia" teamB="Canada" teamABets={4000} teamBBets={3500} tieBets={800} id="hfjdsjfjkds" />
            <FutureGameItem teamA="Suisse" teamB="Helvétie" teamABets={0} teamBBets={200} tieBets={10000} id="zzzzzzzzzzz" />
            <FutureGameItem teamA="IMTBS" teamB="TSP" teamABets={0} teamBBets={0} tieBets={0} id="fffffffffff" />
            <FutureGameItem teamA="Croatia" teamB="Canada" teamABets={50} teamBBets={75} tieBets={25} id="aaaaaaaaaaa" />
        </Row>
    </Container>;
}

function GameItemPlaceholder() {
    return <Container className="game-item game-item-placeholder" style={{textAlign:"left"}}>
        <Row><Placeholder style={{textAlign: "center"}} as="span" animation="glow"><Placeholder xs={4} size="lg" /></Placeholder></Row>
            {[...Array(3)].map((x, i) => <Row key={i}>{[...Array(6)].map((y, j) => 
                <Col key={i + "-" + j} xs={2}>
                    <Placeholder style={{textAlign: "center"}} as="span" animation="glow"><Placeholder xs={12} /></Placeholder>
                </Col>
            )} 
        </Row>)}
    </Container>;
}



function FutureGameItem(props:any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    return (<Container className="game-item">
            <CornerButton contractId={props.id} />
            <Row>
                <Col xs={2} className="game-vertical-align colorsecondary">
                    <Row><p>Total</p></Row>
                    <Row className="game-col-title"><p><span className="colorprimary">{total}</span>XTZ</p></Row>
                </Col>
                <Col xs={8}>
                    <Container className="game-item-hero">
                        <Row><Col><p className="game-item-title">Ligue des Champions</p></Col></Row>
                        <Row>
                            <Col xs={4} className="game-vertical-align game-col-title">
                                <p>{props.teamA}</p>
                            </Col>
                            <Col xs={4} className="game-vertical-align game-col-subtitle">
                                <p>-</p>
                            </Col>
                            <Col xs={4} className="game-vertical-align game-col-title">
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
                <BetButton id={props.id}/>
                </Col>
            </Row>
        </Container>);
}

function OngoingGameItem(props:any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    const oddTeamA  = (total / props.teamABets).toPrecision(2);
    const oddTeamB  = (total / props.teamBBets).toPrecision(2);
    const oddTie    = (total / props.tieBets  ).toPrecision(2);

    return (<Container className="game-item">
            <CornerButton contractId={props.id} />
            <Row>
                <Col xs={2} className="game-vertical-align">
                    <Row><p>Total</p></Row>
                    <Row className="game-col-title"><p>{total}XTZ</p></Row>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <Row><Col className="game-col-title"><p>{props.teamA}</p></Col></Row>
                    <Row><Col><p>{oddTeamA} ({props.teamABets}XTZ)</p></Col></Row>
                </Col>
                <Col xs={4}>
                    <Container className="game-item-hero">
                        <Row><Col><p className="game-item-title">Ligue des Champions</p></Col></Row>
                        <Row>
                            <Col xs={3} className="game-score game-vertical-align"><p>{props.teamAScore}</p></Col>
                            <Col xs={6} className="game-vertical-align">
                                <Row><Col className="game-col-title">-</Col></Row>
                                <Row><Col><p>{oddTie} ({props.tieBets}XTZ)</p></Col></Row>
                            </Col>
                        <Col xs={3} className="game-score game-vertical-align"><p>{props.teamBScore}</p></Col>
                        </Row>
                    </Container>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <Row><Col className="game-col-title"><p>{props.teamB}</p></Col></Row>
                    <Row><Col><p>{oddTeamB} ({props.teamBBets}XTZ)</p></Col></Row>
                </Col>
                <Col xs={1} className="game-vertical-align">
                    <BetButton id={props.id}/>
                </Col>
                <Col xs={1} className="game-vertical-align">
                    <Link to={`/game/${props.id}`} className="game-item-more">
                        <MoreIcon width={20} height={20} className="game-icon" />
                    </Link>
                </Col>
            </Row>
        </Container>);
}

export default GameList;