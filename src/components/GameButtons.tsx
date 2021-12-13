import "./GameButtons.css";

import TZKTLink from "./TZLink";
import { ReactComponent as ContractIcon } from "bootstrap-icons/icons/file-earmark-bar-graph.svg";
import { ReactComponent as ClickIcon } from "bootstrap-icons/icons/arrow-right-circle.svg";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function BetButton({onBetClick}:{onBetClick:() => void}) {
    return (
        <Button variant="light" as="span" className="bet-button" onClick={onBetClick}>
            <span className="bet-text">BET</span>
            <ClickIcon className="arrow-icon" />
        </Button>
    );
}

function Odd({ bet, bets }: any) {
    if (bet.comparedTo(0) === 0) {
        return (
            <OverlayTrigger placement="bottom" overlay={<Tooltip>If you bet on this, you'll be the first to do so!</Tooltip>}>
                <p>
                    <Badge bg="secondary" className="palette-0">
                        No bet yet
                    </Badge>
                </p>
            </OverlayTrigger>
        );
    } else {
        let colorPalette;
        const odd = bets.dividedBy(bet);
        if (odd <= 1) {
            colorPalette = "palette-0";
        }
        // if(odd <2){
        //     colorPalette="palette-1";
        // }
        // else if(odd <2.5){
        //     colorPalette="palette-2";
        // }
        // else if(odd <3){
        //     colorPalette="palette-3";
        // }
        // else if(odd <5){
        //     colorPalette="palette-4";
        // }
        // else if(odd <8){
        //     colorPalette="palette-5";
        // }
        // else if(odd <10){
        //     colorPalette="palette-6";
        // }
        // else if(odd <50){
        //     colorPalette="palette-7";
        // }
        else {
            colorPalette = "palette-main";
            // colorPalette="palette-8";
        }
        return (
            <OverlayTrigger placement="bottom" overlay={<Tooltip>{bet.decimalPlaces(1).toString()} XTZ bet on this pool</Tooltip>}>
                <p>
                    <Badge bg="secondary" className={colorPalette}>
                        x{odd.decimalPlaces(1).toString()}
                    </Badge>
                </p>
            </OverlayTrigger>
        );
    }
}

function CornerButton({ contractId }: any) {
    return (
        <TZKTLink title="View Contract on tzkt.io" id={contractId}>
            <div className="corner-button">
                <ContractIcon className="icon" />
            </div>
        </TZKTLink>
    );
}

interface CountDownProps {
    distance: number;
}

interface DateSpanProps {
    targetDate: Date;
}

function DateSpan(props: DateSpanProps) {
    return (
        <p className="dateSpan">
            <span>{props.targetDate.toLocaleDateString()}</span>
            {"-"}
            {props.targetDate.getHours()}
            {"h"}
            {props.targetDate.getMinutes()}
        </p>
    );
}

function CountDown({ distance }: CountDownProps) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
        return <Badge bg="dark">Timer placeholder</Badge>;
    }

    return (
        <Badge bg="dark">
            {days}d {hours}:{minutes}:{seconds}
        </Badge>
    );
}

export { BetButton, Odd, CornerButton, DateSpan, CountDown };
