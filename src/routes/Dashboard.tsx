import { Container, Row, Col } from "react-bootstrap";
import { ResultCard } from "../components/Dashboard/DashboardItems";
import "./Dashboard.css";

function Dashboard() {
    return (
        <Container className="dashboard">
            <Row className="dashboard-title">
                <p className="dashboard-title-bold">Bets To Redeem</p>
            </Row>
            <Row xs={1} md={2} className="g-4">
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
