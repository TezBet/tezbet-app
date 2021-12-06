import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';
import GameList from './GameList';
import Header from './Header';


function App() {
    return (
        <div>
            <Header />
            <Container className="main-container">
                <Row>
                    <Col></Col>
                    <Col xs={9}>
                        <GameList />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
