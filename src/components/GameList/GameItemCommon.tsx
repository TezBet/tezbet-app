import BigNumber from "bignumber.js";
import { ReactComponent as ArrowIcon } from "bootstrap-icons/icons/arrow-right-circle.svg";
import { ReactComponent as ContractIcon } from "bootstrap-icons/icons/file-earmark-bar-graph.svg";
import { useMemo } from "react";
import { Badge, Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Game from "../../utils/Game";
import TZLink from "../TZLink";
import { Counter } from "./Counter";
import "./GameItemCommon.css";

function TotalBet(props: { total: BigNumber }) {
    return (
        <Col xs={2} className="game-vertical-align game-item-colorsecondary">
            <Row>
                <p className="game-title-bold">Total bet</p>
            </Row>
            <Row>
                <p>
                    <span className="game-item-colorprimary game-title game-title-bold">
                        {props.total.decimalPlaces(1).toString()}
                    </span>
                    <span className="game-item-xtz"> ꜩ</span>
                </p>
            </Row>
        </Col>
    );
}

function BetInfoHero(props: { total: BigNumber; game: Game }) {
    return (
        <Col xs={8}>
            <Container className="game-item-hero game-item-separator-right">
                <Row>
                    <Col xs={4}>
                        <p className="game-item-title-left">{props.game.description ? props.game.description : "Match"}</p>
                    </Col>
                    <Col xs={4}>
                        <Counter targetDate={props.game.startDate} />
                    </Col>
                    <Col xs={4}>
                        <DateSpan targetDate={props.game.startDate} />
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className="game-vertical-align game-col-title">
                        <p>{props.game.teamA}</p>
                    </Col>
                    <Col xs={4} className="game-vertical-align game-col-subtitle">
                        <p className="game-item-tie">TIE</p>
                    </Col>
                    <Col xs={4} className="game-vertical-align game-col-title">
                        <p>{props.game.teamB}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs={4} className="game-vertical-align">
                        <Multiplier total={props.total} betAmount={props.game.betAmountTeamA} />
                    </Col>
                    <Col xs={4} className="game-vertical-align">
                        <Multiplier total={props.total} betAmount={props.game.betAmountTie} />
                    </Col>
                    <Col xs={4} className="game-vertical-align">
                        <Multiplier total={props.total} betAmount={props.game.betAmountTeamB} />
                    </Col>
                </Row>
            </Container>
        </Col>
    );
}

function Multiplier(props: { className?: string; total: BigNumber; betAmount: BigNumber }) {
    const odd = useMemo(() => props.total.dividedBy(props.betAmount), [props.total, props.betAmount]);
    const palette = useMemo(() => (props.betAmount.comparedTo(0) === 0 ? "" : "bet-multiplier-purple"), [props.betAmount]);

    const [tooltipText, badgeText] = useMemo(() => {
        if (props.betAmount.comparedTo(0) === 0) {
            return ["If you bet on this, you'll be the first to do so!", "No bet yet"];
        }
        return [`${props.betAmount.decimalPlaces(1).toString()} XTZ bet on this pool`, `x${odd.decimalPlaces(1).toString()}`];
    }, [props.betAmount, odd]);

    return (
        <TooltippedBadge tooltipText={tooltipText} badgeText={badgeText} className={props.className} badgeClassName={palette} />
    );
}

function TooltippedBadge(props: { tooltipText: string; badgeText: string; className?: string; badgeClassName?: string }) {
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

function DateSpan(props: { targetDate: Date }) {
    return (
        <p className="date-span">
            {`${props.targetDate.toLocaleDateString()}-${props.targetDate
                .getHours()
                .toString()
                .padStart(2, "0")}h${props.targetDate.getMinutes().toString().padStart(2, "0")}`}
        </p>
    );
}

function BetButton({ onBetClick }: { onBetClick: () => void }) {
    return (
        <Button variant="light" as="span" className="bet-button" onClick={onBetClick}>
            <span className="bet-text">BET</span>
            <ArrowIcon className="arrow-icon" />
        </Button>
    );
}

function CornerButton({ contractId }: any) {
    return (
        <TZLink title="View contract on tzstats.com" id={contractId}>
            <div className="corner-button">
                <ContractIcon className="icon" />
            </div>
        </TZLink>
    );
}

function RedeemButton({ onRedeem }: { onRedeem: () => void }) {
    return (
        <Button variant="light" as="span" className="btn-redeem" onClick={onRedeem}>
            <span className="redeem-text">REDEEM</span>
        </Button>
    );
}

export { TotalBet, BetInfoHero, DateSpan, TooltippedBadge, Multiplier, CornerButton, BetButton, RedeemButton };
