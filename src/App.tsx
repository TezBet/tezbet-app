import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from "react-router-dom";


function App() {
    return (
        <div>
            <Header />
            <Container className="main-container">
                <Row>
                    <Col></Col>
                    <Col xs={9}>
                        <Outlet />
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default App;
