import './GameList.css';

import { Container, Row, Col, Button, Placeholder } from 'react-bootstrap';
import { Link } from "react-router-dom";

import TZKTLink from './TZKTLink';
import {ReactComponent as ContractIcon} from 'bootstrap-icons/icons/file-earmark-bar-graph.svg';
import {ReactComponent as BetIcon} from 'bootstrap-icons/icons/cash-coin.svg';
import {ReactComponent as MoreIcon} from 'bootstrap-icons/icons/three-dots-vertical.svg';

function GameList() {
    return <Container>
        <Row>
            <GameItem teamA="Italy" teamB="Germany" teamABets={300} teamBBets={345} tieBets={754} teamAScore={2} teamBScore={1} id="tz1VQnqCCqX4K5sP3FNkVSNKTdCAMJDd3E1n" />
            <GameItem teamA="Spain" teamB="France" teamABets={2455} teamBBets={2342} tieBets={234} teamAScore={0} teamBScore={0} />
            <GameItem teamA="France" teamB="England" teamABets={300} teamBBets={500} tieBets={844} teamAScore={4} teamBScore={4} />
            <GameItem teamA="Germany" teamB="Poland" teamABets={300} teamBBets={500} tieBets={235} teamAScore={1} teamBScore={3} />
            <GameItem teamA="Belgium" teamB="Switzerland" teamABets={253} teamBBets={253} tieBets={674} teamAScore={3} teamBScore={2} />
            <GameItem teamA="Ireland" teamB="Scotland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={5} teamBScore={4} />
            <GameItem teamA="Croatia" teamB="Canada" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={3} />
            <GameItem teamA="England" teamB="Poland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={1} />
            <GameItemPlaceholder />
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

function GameItem(props:any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    const oddTeamA  = (total / props.teamABets).toPrecision(2);
    const oddTeamB  = (total / props.teamBBets).toPrecision(2);
    const oddTie    = (total / props.tieBets  ).toPrecision(2);

    return (<Container className="game-item">
            <TZKTLink title="View Contract on tzkt.io" id={props.id}>
                <div className="game-corner-button">
                    <ContractIcon className="game-icon" />
                </div>
            </TZKTLink>
            <Row>
                <Col xs={2} className="game-vertical-align">
                    <Row><p>Total</p></Row>
                    <Row className="game-col-title"><p>{total}XTZ</p></Row>
                </Col>
                <Col xs={2} className="game-vertical-align">
                    <Row><Col className="game-col-title"><p>{props.teamA}</p></Col></Row>
                    <Row><Col><p>{oddTeamA} ({props.teamABets}XTZ)</p></Col></Row>
                </Col>
                <Col>
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
                    <Link title="Bet on this game" to={`/game/${props.id}/bet`}><Button variant="dark" as="span">
                        <BetIcon width={40} height={40} className="game-item-bet-icon" />
                    </Button></Link>
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