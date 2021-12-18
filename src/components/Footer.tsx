import { Col, Container, Row } from "react-bootstrap";
import "./Footer.css";

function Footer() {
    return (
        <Container fluid className="footer">
            <Row>
                <Col></Col>
                <Col>
                    <div className="footer-text">
                        <span><a target="_blank" rel="noreferrer"
                            href="https://github.com/TezBet/tezbet-whitepaper/blob/main/TezBet_whitepaper.pdf">Whitepaper</a>
                        </span>
                        <span><a target="_blank" rel="noreferrer" href="https://github.com/TezBet">Github</a></span>
                        <span>Copyright TezBet {new Date().getFullYear()}</span>
                    </div>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    );
}

export default Footer;
