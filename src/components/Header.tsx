import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Header.css";
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { NavLink } from "react-router-dom";

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
        <Navbar expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">TezBet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/ongoing">Ongoing games</NavLink>
                        <NavLink className="nav-link" to="/dashboard">My bets</NavLink>
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