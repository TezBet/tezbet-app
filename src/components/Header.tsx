import { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import TezBetLogo from "../img/icon.svg";
import { shortenString } from "../utils/utils";
import { WalletContext } from "../utils/WalletContextProvider";
import Faucet from "./Faucet";
import "./Header.css";

function WalletManagement() {
    const { connected, account, connect, disconnect, balance } = useContext(WalletContext)!;

    if (connected) {
        return (
            <Button className="blob-btn blob-colorwhitesecondary" onClick={disconnect}>
                {balance.decimalPlaces(3).toNumber()} XTZ
                <span className="blob-colorprimary"> ({shortenString(account!.address)})</span>
                <span className="blob-btn__inner blob-bgsecondary">
                    <span className="blob-btn__blobs">
                        <span className="blob-btn__blob blob-bgwhite"></span>
                        <span className="blob-btn__blob blob-bgwhite"></span>
                        <span className="blob-btn__blob blob-bgwhite"></span>
                        <span className="blob-btn__blob blob-bgwhite"></span>
                    </span>
                </span>
            </Button>
        );
    } else {
        return (
            <Button className="blob-btn blob-colorsecondarywhite" onClick={connect}>
                CONNECT WALLET
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

function Header(props: any) {
    return (
        <Navbar expand="lg" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand className="fs-3" href="/">
                    <img height="40px" width="40px" alt="Phoenician bet letter" src={TezBetLogo}></img>
                    TezBet
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavLink className="nav-link" to="/">
                            Home
                        </NavLink>
                        <NavLink className="nav-link" to="/live">
                            Live
                        </NavLink>
                        <NavLink className="nav-link" to="/dashboard">
                            Dashboard
                        </NavLink>
                        <NavLink className="nav-link nav-link-howto" to="/howto">
                            How to TezBet
                        </NavLink>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end basic-navbar-nav">
                    <Faucet />
                    <WalletManagement />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;
