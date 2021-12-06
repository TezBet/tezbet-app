import { Navbar, Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/button";
import "./Header.css";
import { useWallet } from '@tezos-contrib/react-wallet-provider';

function WalletManagement(props:any) {
    const { connected, connect, disconnect, activeAccount } = useWallet("CUSTOM", "https://rpc.hangzhounet.teztnets.xyz", "Hangzhounet");
    if (connected) {
        return <Button variant="outline-light" onClick={disconnect}>Connected with {activeAccount?.address}</Button>;
    } else {
        return <Button variant="light" onClick={connect}>Connect wallet</Button>;
    }
}

function Header(props:any) {
    return (
        <Navbar bg="secondary" expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">TezBet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/bets">My bets</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <WalletManagement />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;