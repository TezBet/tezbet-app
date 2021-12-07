import './Footer.css';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <Container fluid className="footer">
            <Row>
                <Col></Col>
                <Col><p>Copyright TezBet</p></Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Footer;