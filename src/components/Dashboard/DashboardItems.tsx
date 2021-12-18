import BigNumber from "bignumber.js";
import { Fragment } from "react";
import { Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { RedeemButton } from "../GameList/GameItemCommon";
import "./DashboardItems.css";

function ResultCard() {
    return (
        <Container className="dashboard-redeem-card">
            <Row>
                <GameResult teamAName={"Malte"} teamBName={"Andorre"} scoreTeamA={0} scoreTeamB={1} date={new Date()} />
            </Row>
            <Row className="dashboard-card-content">
                <RedeemContent />
            </Row>
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
        <OverlayTrigger placement="bottom" overlay={<Tooltip>{props.value.toNumber()} XTZ</Tooltip>}>
            <p className="dashboard-gain">
                <span className="dashboard-gain-value">{props.value.decimalPlaces(1).toString()}</span>
                <span className="dashboard-gain-xtz">XTZ</span>
            </p>
        </OverlayTrigger>
    );
}

function BetGainInfo(props: any) {
    return (
        <Container className="dashboard-bet-info">
            <div>
                Total bet:{" "}
                <OverlayTrigger overlay={<Tooltip>{props.betvalue.toNumber()} XTZ</Tooltip>}>
                    <span className="dashboard-bet-info-bold">{props.betvalue.decimalPlaces(1).toString()}</span>
                </OverlayTrigger>{" "}
                XTZ
            </div>
            <div>They were {props.followRate}% on your side.</div>
        </Container>
    );
}

export { ResultCard };
