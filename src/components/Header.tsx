import "./Header.css";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useWallet } from '@tezos-contrib/react-wallet-provider';
import TezBetLogo from '../img/icon.svg';

import Faucet from './Faucet';

function WalletManagement(props:any) {
    if (props.connected) {
        return (<Button className="blob-btn blob-colorwhitesecondary" onClick={props.disconnect}><span className="blob-colorprimary">{props.activeAccount?.address}</span>
            <span className="blob-btn__inner blob-bgsecondary">
                <span className="blob-btn__blobs">
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                    <span className="blob-btn__blob blob-bgwhite"></span>
                </span>
            </span>
        </Button>);
    } else {
        return (<Button className="blob-btn blob-colorsecondarywhite" onClick={props.connect}>CONNECT WALLET
            <span className="blob-btn__inner blob-bgwhite">
                <span className="blob-btn__blobs">
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                    <span className="blob-btn__blob blob-bgsecondary"></span>
                </span>
            </span>
        </Button>
        );
    }
}

function Header(props:any) {
    const { connected, connect, disconnect, activeAccount } = useWallet("CUSTOM", "https://rpc.hangzhounet.teztnets.xyz", "Hangzhounet");

    return (
        <Navbar expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand className="fs-3" href="/"><img height="40px" width="40px" alt="Phoenician bet letter" src={TezBetLogo}></img>TezBet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="nav-link" to="/">Home</NavLink>
                        <NavLink className="nav-link" to="/ongoing">Ongoing games</NavLink>
                        <NavLink className="nav-link" to="/dashboard">My bets</NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Faucet address={activeAccount?.address} />
                    <WalletManagement connected={connected} connect={connect} disconnect={disconnect} activeAccount={activeAccount} />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;