import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

function Footer() {
    return (
        <Container fluid className="footer">
            <Row>
                <Col></Col>
                <Col>
                    <p>Copyright TezBet</p>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Footer;
