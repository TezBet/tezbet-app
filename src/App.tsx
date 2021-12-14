import { NetworkType } from '@airgap/beacon-sdk';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Outlet } from "react-router-dom";
import './App.css';
import Balls from './components/Balls';
import Footer from './components/Footer';
import Header from './components/Header';
import { WalletContextProvider } from './utils/WalletContextProvider';

function App() {
    return (
        <WalletContextProvider network={NetworkType.HANGZHOUNET} rpc={process.env.REACT_APP_TEZOS_RPC!} name="TezBet" >
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
        </WalletContextProvider>
    );
}

export default App;