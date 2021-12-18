import { Container, Row, Col } from "react-bootstrap";
import { ResultCard, PlayingCard } from "../components/Dashboard/DashboardItems";
import "./Dashboard.css";

function Dashboard() {
    return (
        <Container className="dashboard">
            <Row>
                <Col>
                    <Row className="dashboard-title">
                        <p className="dashboard-title-bold">Live Bets</p>
                    </Row>
                    <Row xs={1} className="g-4">
                        {false && <Col className="dashboard-placeholder">No bet currently open</Col>}
                        <Col>
                            <PlayingCard />
                        </Col>
                        <Col>
                            <PlayingCard />
                        </Col>
                        <Col>
                            <PlayingCard />
                        </Col>
                        <Col>
                            <PlayingCard />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row className="dashboard-title">
                        <p className="dashboard-title-bold">Bets To Redeem</p>
                    </Row>
                    <Row xs={1} className="g-4">
                        {false && <Col className="dashboard-placeholder">No bet to redeem</Col>}
                        <Col>
                            <ResultCard />
                        </Col>
                        <Col>
                            <ResultCard />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="dashboard-title">
                <p className="dashboard-title-bold">Bets History</p>
            </Row>
            <Row xs={1} md={2} className="g-4">
                {false && <Col className="dashboard-placeholder">No bet in history</Col>}
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
                <Col>
                    <ResultCard />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;
