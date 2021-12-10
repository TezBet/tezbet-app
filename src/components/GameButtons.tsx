import './GameButtons.css';


import TZKTLink from './TZKTLink';
import {ReactComponent as ContractIcon} from 'bootstrap-icons/icons/file-earmark-bar-graph.svg';
import {ReactComponent as ClickIcon} from 'bootstrap-icons/icons/arrow-right-circle.svg';
import { Badge, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function BetButton(props:any){
    return (
        <Link title="Bet on this game" to={`/game/${props.id}/bet`}>
        <Button variant="light" as="span" className="bet-button">
            <span className="bet-text">BET</span>
            <ClickIcon className="arrow-icon" />
        </Button></Link>
        )
}

function Odd({bet, bets}:any) {
    if(bet === 0){
        return (
            <OverlayTrigger placement="bottom" overlay={<Tooltip>If you bet on this, you'll be the first to do so!</Tooltip>}>
                <p><Badge bg="secondary" className="palette-0">No bet yet</Badge></p>
            </OverlayTrigger>
        );
    } else {
        let colorPalette;
        const odd = bets/bet;
        if(odd<=1){
            colorPalette="palette-0";
        }
        if(odd <2){
            colorPalette="palette-1";
        }
        else if(odd <2.5){
            colorPalette="palette-2";
        }
        else if(odd <3){
            colorPalette="palette-3";
        }
        else if(odd <5){
            colorPalette="palette-4";
        }
        else if(odd <8){
            colorPalette="palette-5";
        }
        else if(odd <10){
            colorPalette="palette-6";
        }
        else if(odd <50){
            colorPalette="palette-7";
        }
        else {
            colorPalette="palette-8";
        }
        return (
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Potential gain for this pool: {bets-bet} XTZ</Tooltip>}>
                <p><Badge bg="secondary" className={colorPalette}>x{odd.toPrecision(2)}</Badge></p>
            </OverlayTrigger>
        );
    }
}

function CornerButton({contractId}:any) {
    return (
        <TZKTLink title="View Contract on tzkt.io" id={contractId}>
            <div className="corner-button">
                <ContractIcon className="icon" />
            </div>
        </TZKTLink>
    );
}

export {BetButton, Odd, CornerButton};