import BigNumber from "bignumber.js";
import { Fragment } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { ReactComponent as CheckedIcon } from "bootstrap-icons/icons/check-lg.svg";
import { ReactComponent as UnCheckedIcon } from "bootstrap-icons/icons/x.svg";
import { RedeemButton } from "../GameList/GameItemCommon";
import "./DashboardItems.css";

function ResultCard() {
    return (
        <Container className="dashboard-redeem-card">
            <Row>
                <GameResult teamAName={"Malte"} teamBName={"Andorre"} scoreTeamA={0} scoreTeamB={1} date={new Date()} />
            </Row>
            <Row className="dashboard-card-content">{false ? <RedeemContent /> : <NormalContent />}</Row>
        </Container>
    );
}

function RedeemContent() {
    return (
        <Fragment>
            <Col xs={4} className="dashboard-vertical-align dashboard-no-padding">
                <BetGain value={new BigNumber(5.5055555)} />
            </Col>
            <Col xs={4} className="dashboard-vertical-align">
                <BetGainInfo betvalue={new BigNumber(50.155)} followRate={14} />
            </Col>
            <Col xs={4} className="dashboard-vertical-align">
                <RedeemButton onRedeem={() => alert("Redeem!")} />
            </Col>
        </Fragment>
    );
}

function NormalContent() {
    return (
        <Fragment>
            <Col xs={6} className="dashboard-vertical-align">
                <GameResultButton value={new BigNumber(5.5055555)} />
            </Col>
            <Col xs={6} className="dashboard-vertical-align dashboard-no-padding">
                <BetNormalInfo betvalue={new BigNumber(50.155)} followRate={14} />
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
                    </Col>{" "}
                    <Col xs={2} className="dashboard-item-team-score">
                        {props.scoreTeamA} - {props.scoreTeamB}
                    </Col>{" "}
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
                <span className="dashboard-gain-xtz">XTZ</span>
            </p>
        </OverlayTrigger>
    );
}

function BetGainInfo(props: any) {
    return (
        <Container className="dashboard-bet-gain-info">
            <div>
                Total bet:{" "}
                <OverlayTrigger overlay={<Tooltip>{props.betvalue.toNumber()} XTZ</Tooltip>}>
                    <span className="dashboard-bet-gain-info-bold">{props.betvalue.decimalPlaces(1).toString()}</span>
                </OverlayTrigger>{" "}
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
                <OverlayTrigger overlay={<Tooltip>{props.betvalue.toNumber()} XTZ</Tooltip>}>
                    <span className="dashboard-bet-normal-value">{props.betvalue.decimalPlaces(1).toString()}</span>
                </OverlayTrigger>
                <span className="dashboard-bet-normal-xtz">XTZ</span>
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
                        <span className="dashboard-game-result-status-text-value">{props.value.decimalPlaces(1).toString()}</span>
                        XTZ
                    </span>
                </div>
            </OverlayTrigger>
            {iswon ? (
                <CheckedIcon className="dashboard-game-result-status-icon dashboard-won-secondary" />
            ) : (
                <UnCheckedIcon className="dashboard-game-result-status-icon dashboard-lost-secondary" />
            )}
        </Container>
    );
}

export { ResultCard };
