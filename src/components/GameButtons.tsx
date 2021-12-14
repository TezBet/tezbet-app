import BigNumber from "bignumber.js";
import { ReactComponent as ClickIcon } from "bootstrap-icons/icons/arrow-right-circle.svg";
import { ReactComponent as ContractIcon } from "bootstrap-icons/icons/file-earmark-bar-graph.svg";
import { useMemo } from 'react';
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./GameButtons.css";
import TZKTLink from "./TZLink";

function BetButton({ onBetClick }: { onBetClick: () => void }) {
    return (
        <Button variant="light" as="span" className="bet-button" onClick={onBetClick}>
            <span className="bet-text">BET</span>
            <ClickIcon className="arrow-icon" />
        </Button>
    );
}

function Multiplier(props: { className?: string, total: BigNumber, betAmount: BigNumber }) {
    const odd = useMemo(() => props.total.dividedBy(props.betAmount), [props.total, props.betAmount]);
    const palette = useMemo(() => props.betAmount.comparedTo(0) === 0 ? "" : "palette-main", [props.betAmount]);

    const [tooltipText, badgeText] = useMemo(() => {
        if (props.betAmount.comparedTo(0) === 0) {
            return [
                "If you bet on this, you'll be the first to do so!",
                "No bet yet"
            ];
        }
        return [
            `${props.betAmount.decimalPlaces(1).toString()} XTZ bet on this pool`,
            `x${odd.decimalPlaces(1).toString()}`
        ];
    }, [props.betAmount, odd]);


    return (<TooltippedBadge tooltipText={tooltipText} badgeText={badgeText} className={props.className} badgeClassName={palette} />);
}

function TooltippedBadge(props: { tooltipText: string, badgeText: string, className?: string, badgeClassName?: string }) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{props.tooltipText}</Tooltip>}>
            <p className={props.className}>
                <Badge bg="secondary" className={props.badgeClassName}>
                    {props.badgeText}
                </Badge>
            </p>
        </OverlayTrigger>
    );
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
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
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

export { BetButton, Multiplier, CornerButton, DateSpan, CountDown, TooltippedBadge };
