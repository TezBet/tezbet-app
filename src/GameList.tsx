import './GameList.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

function GameList() {
    return <Container>
        <Row>
            <Game teamA="Italy" teamB="Germany" teamABets={300} teamBBets={345} tieBets={754} teamAScore={2} teamBScore={1} />
            <Game teamA="Spain" teamB="France" teamABets={2455} teamBBets={2342} tieBets={234} teamAScore={0} teamBScore={0} />
            <Game teamA="France" teamB="England" teamABets={300} teamBBets={500} tieBets={844} teamAScore={4} teamBScore={4} />
            <Game teamA="Germany" teamB="Poland" teamABets={300} teamBBets={500} tieBets={235} teamAScore={1} teamBScore={3} />
            <Game teamA="Belgium" teamB="Switzerland" teamABets={253} teamBBets={253} tieBets={674} teamAScore={3} teamBScore={2} />
            <Game teamA="Ireland" teamB="Scotland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={5} teamBScore={4} />
            <Game teamA="Croatia" teamB="Canada" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={3} />
            <Game teamA="England" teamB="Poland" teamABets={300} teamBBets={500} tieBets={800} teamAScore={0} teamBScore={1} />
        </Row>
    </Container>;
}

function Game(props:any) {
    const total = props.teamABets + props.teamBBets + props.tieBets;
    const oddTeamA  = (total / props.teamABets).toPrecision(2);
    const oddTeamB  = (total / props.teamBBets).toPrecision(2);
    const oddTie    = (total / props.tieBets  ).toPrecision(2);

    return <Container className="game-item">
            <Row>
                <Col className="game-vertical-align">
                    <Row><p>Total</p></Row>
                    <Row className="game-col-title"><p>{total}XTZ</p></Row>
                </Col>
                <Col className="game-vertical-align">
                    <Row><Col className="game-col-title game-vertical-align"><p>{props.teamA}</p></Col></Row>
                    <Row><Col className="game-vertical-align"><p>{oddTeamA} ({props.teamABets}XTZ)</p></Col></Row>
                </Col>
                <Col xs={1} className="game-score game-vertical-align"><p>{props.teamAScore}</p></Col>
                <Col xs={1} className="game-vertical-align">
                    <Row><Col className="game-col-title">-</Col></Row>
                    <Row><Col className="game-vertical-align"><p>{oddTie} ({props.tieBets}XTZ)</p></Col></Row>
                </Col>
                <Col xs={1} className="game-score game-vertical-align"><p>{props.teamBScore}</p></Col>
                <Col className="game-vertical-align">
                    <Row><Col className="game-col-title"><p>{props.teamB}</p></Col></Row>
                    <Row><Col>{oddTeamB} ({props.teamBBets}XTZ)</Col></Row>
                </Col>
                <Col className="game-vertical-align">
                    <Button>BET</Button>
                    <Button>Contract</Button>
                </Col>
            </Row>
        </Container>;
}

export default GameList;