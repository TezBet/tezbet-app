import './GameList.css';
import { Container, Row, Col } from 'react-bootstrap';
import Button from "react-bootstrap/button";

function GameList() {
    return <Container>
        <Row>
            <Game />
            <Game />
            <Game />
            <Game />
            <Game />
            <Game />
        </Row>
    </Container>;
}

function Game() {
    return <Container className="game-item">
            <Row>
                <Col className="game-col-title game-vertical-align">
                    <p>Total: 500XTZ</p>
                </Col>
                <Col className="game-vertical-align">
                    <Row>
                        <Col className="game-col-title game-vertical-align">
                            <p>Team A</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="game-vertical-align"><p>1.5 (500XTZ)</p></Col>
                    </Row>
                </Col>
                <Col xs={1} className="game-score game-vertical-align"><p>2</p></Col>
                <Col className="game-vertical-align">
                    <Row>
                        <Col className="game-col-title">-</Col>
                    </Row>
                    <Row>
                        <Col className="game-vertical-align"><p>1.5 (200XTZ)</p></Col>
                    </Row>
                </Col>
                <Col xs={1} className="game-score game-vertical-align"><p>0</p></Col>
                <Col className="game-vertical-align">
                    <Row>
                        <Col className="game-col-title">Team B</Col>
                    </Row>
                    <Row>
                        <Col>1.5 (200XTZ)</Col>
                    </Row>
                </Col>
                <Col className="game-vertical-align">
                    <Button>BET</Button>
                    <Button>Contract</Button>
                </Col>
            </Row>
        </Container>;
}

export default GameList;