import BigNumber from "bignumber.js";
import { Fragment } from "react";
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { ReactComponent as CheckedIcon } from "bootstrap-icons/icons/check-lg.svg";
import { ReactComponent as UnCheckedIcon } from "bootstrap-icons/icons/x.svg";
import { RedeemButton } from "../GameList/GameItemCommon";
import "./DashboardItems.css";

function PlayingCard() {
    return (
        <Container className="dashboard-redeem-card">
            <Row>
                <GameResult teamAName={"Malte"} teamBName={"Andorre"} scoreTeamA={0} scoreTeamB={1} date={new Date()} />
            </Row>
            <Row className="dashboard-card-content">
                <PlayingHero
                    totalBetValue={new BigNumber(4.025)}
                    betA={new BigNumber(0.025)}
                    betB={new BigNumber(4)}
                    betTie={new BigNumber(0)}
                    betClick={() => alert("New bet!")}
                    unbetClick={() => alert("Unbet click")}
                />
            </Row>
        </Container>
    );
}

function ResultCard() {
    return (
        <Container className="dashboard-redeem-card">
            <Row>
                <GameResult teamAName={"Malte"} teamBName={"Andorre"} scoreTeamA={0} scoreTeamB={0} date={new Date()} />
            </Row>
            <Row className="dashboard-card-content">
                {true ? (
                    <RedeemContent
                        redeemValue={new BigNumber(7.2)}
                        totalBetValue={new BigNumber(4.025)}
                        betA={new BigNumber(0.025)}
                        betB={new BigNumber(4)}
                        betTie={new BigNumber(0)}
                        followRate={14}
                        onRedeem={() => alert("Redeem!")}
                    />
                ) : (
                    <NormalContent
                        redeemValue={new BigNumber(0)} // This must be 0 if the bet is lost
                        totalBetValue={new BigNumber(4.025)}
                        betA={new BigNumber(0.025)}
                        betB={new BigNumber(4)}
                        betTie={new BigNumber(0)}
                        followRate={14}
                    />
                )}
            </Row>
        </Container>
    );
}

function RedeemContent(props: any) {
    return (
        <Fragment>
            <Col xs={4} className="dashboard-vertical-align dashboard-no-padding">
                <BetGain value={props.redeemValue} />
            </Col>
            <Col xs={4} className="dashboard-vertical-align">
                <BetGainInfo
                    totalBetValue={props.totalBetValue}
                    betA={props.betA}
                    betB={props.betB}
                    betTie={props.betTie}
                    followRate={props.followRate}
                />
            </Col>
            <Col xs={4} className="dashboard-vertical-align">
                <RedeemButton onRedeem={props.onRedeem} />
            </Col>
        </Fragment>
    );
}

function NormalContent(props: any) {
    return (
        <Fragment>
            <Col xs={6} className="dashboard-vertical-align">
                <GameResultButton value={props.redeemValue} />
            </Col>
            <Col xs={6} className="dashboard-vertical-align dashboard-no-padding">
                <BetNormalInfo
                    totalBetValue={props.totalBetValue}
                    betA={props.betA}
                    betB={props.betB}
                    betTie={props.betTie}
                    followRate={props.followRate}
                />
            </Col>
        </Fragment>
    );
}

function GameResult(props: any) {
    return (
        <OverlayTrigger
            placement="top"
            overlay={
                <Tooltip>
                    Played{" "}
                    {`${props.date.toLocaleDateString()}-${props.date.getHours().toString().padStart(2, "0")}h${props.date
                        .getMinutes()
                        .toString()
                        .padStart(2, "0")}`}
                </Tooltip>
            }
        >
            <Container className="dashboard-item-team">
                <Row>
                    <Col xs={5} className="dashboard-item-team-name">
                        {props.teamAName}
                    </Col>
                    <Col xs={2} className="dashboard-item-team-score">
                        {props.scoreTeamA === 0 && props.scoreTeamB === 0 ? "•" : props.scoreTeamA + " - " + props.scoreTeamB}
                    </Col>
                    <Col xs={5} className="dashboard-item-team-name">
                        {props.teamBName}
                    </Col>
                </Row>
            </Container>
        </OverlayTrigger>
    );
}

function BetGain(props: any) {
    return (
        <OverlayTrigger placement="bottom" overlay={<Tooltip>You won {props.value.toNumber()} XTZ</Tooltip>}>
            <p className="dashboard-gain">
                <span className="dashboard-gain-value">{props.value.decimalPlaces(1).toString()}</span>
                <span className="dashboard-gain-xtz"> XTZ</span>
            </p>
        </OverlayTrigger>
    );
}

function BetGainInfo(props: any) {
    return (
        <Container className="dashboard-bet-gain-info">
            <div>
                Total bet:{" "}
                <BetValueOverlayTrigger
                    placement="top"
                    totalBetValue={props.totalBetValue}
                    betA={props.betA}
                    betB={props.betB}
                    betTie={props.betTie}
                >
                    <span className="dashboard-bet-gain-info-bold">{props.totalBetValue.decimalPlaces(1).toString()}</span>
                </BetValueOverlayTrigger>{" "}
                XTZ
            </div>
            <div>They were {props.followRate}% on your side.</div>
        </Container>
    );
}

function BetNormalInfo(props: any) {
    return (
        <Container className="dashboard-bet-normal-info">
            <div>
                <BetValueOverlayTrigger
                    placement="top"
                    totalBetValue={props.totalBetValue}
                    betA={props.betA}
                    betB={props.betB}
                    betTie={props.betTie}
                >
                    <span className="dashboard-bet-normal-value">{props.totalBetValue.decimalPlaces(1).toString()}</span>
                </BetValueOverlayTrigger>
                <span className="dashboard-bet-normal-xtz"> XTZ</span>
            </div>
            <div className="dashboard-bet-normal-comment">They were {props.followRate}% on your side.</div>
        </Container>
    );
}

function GameResultButton(props: any) {
    const iswon = props.value > 0;
    return (
        <Container className={"g-0 dashboard-game-result-status " + (iswon ? "dashboard-won-primary" : "dashboard-lost-primary")}>
            <OverlayTrigger overlay={<Tooltip>{props.value.toNumber()} XTZ</Tooltip>}>
                <div className="dashboard-game-result-status-content">
                    <span className="dashboard-game-result-status-text">
                        <span className="dashboard-game-result-status-text-value">{props.value.decimalPlaces(1).toString()}</span>{" "}
                        XTZ
                    </span>
                </div>
            </OverlayTrigger>
            {iswon ? (
                <OverlayTrigger overlay={<Tooltip>Nice, you won your bet!</Tooltip>}>
                    <CheckedIcon className="dashboard-game-result-status-icon dashboard-won-secondary" />
                </OverlayTrigger>
            ) : (
                <OverlayTrigger overlay={<Tooltip>Ooops, you lost this one!</Tooltip>}>
                    <UnCheckedIcon className="dashboard-game-result-status-icon dashboard-lost-secondary" />
                </OverlayTrigger>
            )}
        </Container>
    );
}

function PlayingHero(props: any) {
    return (
        <Fragment>
            <Col className="dashboard-vertical-align dashboard-text-center">
                <RebetButton betClick={props.betClick} />
            </Col>
            <Col className="dashboard-vertical-align dashboard-playinghero-central">
                <BetValue totalBetValue={props.totalBetValue} betA={props.betA} betB={props.betB} betTie={props.betTie} />
            </Col>
            <Col className="dashboard-vertical-align dashboard-text-center">
                <UnbetButton unbetClick={props.unbetClick} />
            </Col>
        </Fragment>
    );
}

function RebetButton(props: any) {
    return (
        <Button variant="light" as="span" className="dashboard-rebet-button" onClick={props.betClick}>
            <span className="dashboard-text-rebet">BET</span>
        </Button>
    );
}

function UnbetButton(props: any) {
    return (
        <Button variant="light" as="span" className="dashboard-unbet-button" onClick={props.unbetClick}>
            <span className="dashboard-text-unbet">UNBET</span>
        </Button>
    );
}

function BetValue(props: any) {
    return (
        <BetValueOverlayTrigger
            placement="bottom"
            totalBetValue={props.totalBetValue}
            betA={props.betA}
            betB={props.betB}
            betTie={props.betTie}
        >
            <p className="dashboard-gain">
                <span className="dashboard-gain-value">{props.totalBetValue.decimalPlaces(1).toString()}</span>
                <span className="dashboard-gain-xtz"> XTZ</span>
            </p>
        </BetValueOverlayTrigger>
    );
}

function BetValueOverlayTrigger(props: any) {
    return (
        <OverlayTrigger
            placement={props.placement}
            overlay={
                <Tooltip>
                    Your total bets: {props.totalBetValue.toNumber()} XTZ <br />(
                    {props.betA.toNumber() + " + " + props.betTie.toNumber() + " + " + props.betB.toNumber()})
                </Tooltip>
            }
        >
            {props.children}
        </OverlayTrigger>
    );
}

export { ResultCard, PlayingCard };
