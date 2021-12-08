import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Balls from './components/Balls';


function App() {
    return (
        <div>
            <Balls />
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
