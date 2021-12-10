import './BetButton.css';


import {ReactComponent as ClickIcon} from 'bootstrap-icons/icons/arrow-right-circle.svg';
import { Button } from 'react-bootstrap';
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

export default BetButton;