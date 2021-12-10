import { Navbar, Container, Nav, Button } from "react-bootstrap";
import "./Header.css";
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import { NavLink } from "react-router-dom";

function WalletManagement(props:any) {
    const { connected, connect, disconnect, activeAccount } = useWallet("CUSTOM", "https://rpc.hangzhounet.teztnets.xyz", "Hangzhounet");
    if (connected) {
        return <Button className="blob-btn blob-colorwhitesecondary" onClick={disconnect}><span className="blob-colorprimary">{activeAccount?.address}</span>
            <span className="blob-btn__inner blob-bgsecondary">
                <span className="blob-btn__blobs">
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                </span>
            </span>
        </Button>;
    } else {
        return <Button className="blob-btn blob-colorsecondarywhite" onClick={connect}>CONNECT WALLET
            <span className="blob-btn__inner blob-bgwhite">
                <span className="blob-btn__blobs">
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                </span>
            </span>
        </Button>
        ;
    }
}

function Header(props:any) {
    return (
        <Navbar expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand className="fs-3" href="/">TezBet</Navbar.Brand>
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