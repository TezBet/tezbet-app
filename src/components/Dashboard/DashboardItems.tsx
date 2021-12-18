import BigNumber from "bignumber.js";
import { ReactComponent as CheckedIcon } from "bootstrap-icons/icons/check-lg.svg";
import { ReactComponent as UnCheckedIcon } from "bootstrap-icons/icons/x.svg";
import { ReactComponent as PendingIcon } from "bootstrap-icons/icons/arrow-repeat.svg";
import { Fragment } from "react";
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { Game } from "../../utils/Game";
import { shortenString } from "../../utils/utils";
import { RedeemButton } from "../GameList/GameItemCommon";
import "./DashboardItems.css";

function PlayingCard({
    game,
    onBetClick,
    onUnBetClick,
}: {
    game: Game;
    onBetClick: (game: Game) => void;
    onUnBetClick: (game: Game) => void;
}) {
    return (
        <Col>
            <Container className="dashboard-redeem-card">
                <Row>
                    <GameResult
                        teamAName={game.teamA}
                        teamBName={game.teamB}
                        scoreTeamA={-1}
                        scoreTeamB={1}
                        date={game.startDate}
                    />
                </Row>
                <Row className="dashboard-card-content">
                    <PlayingHero
                        totalBetValue={game.userBetA.plus(game.userBetB).plus(game.userBetTie)}
                        betA={game.userBetA}
                        betB={game.userBetB}
                        betTie={game.userBetTie}
                        betClick={() => onBetClick(game)}
                        unbetClick={() => onUnBetClick(game)}
                    />
                </Row>
            </Container>
        </Col>
    );
}

function ResultCard({ game, onRedeem }: { game: Game; onRedeem: (game: Game) => void }) {
    const userTotal = game.userBetA.plus(game.userBetB).plus(game.userBetTie);
    let redeemable = new BigNumber(0);

    if (game.outcome === 10) {
        redeemable = userTotal;
    } else {
        let pool = new BigNumber(0);
        let user = new BigNumber(0);
        if (game.outcome === 0) {
            pool = game.userBetA;
            user = game.betAmountTeamA;
        } else if (game.outcome === 1) {
            pool = game.userBetB;
            user = game.betAmountTeamB;
        } else if (game.outcome === 2) {
            pool = game.userBetTie;
            user = game.betAmountTie;
        }
        redeemable = user.multipliedBy(game.betAmountTeamA.plus(game.betAmountTeamB).plus(game.betAmountTie).dividedBy(pool));
    }

    return (
        <Col>
            <Container className="dashboard-redeem-card">
                <Row>
                    <GameResult
                        teamAName={game.teamA}
                        teamBName={game.teamB}
                        scoreTeamA={-1}
                        scoreTeamB={1}
                        date={game.startDate}
                    />
                </Row>
                <Row className="dashboard-card-content">
                    {redeemable.comparedTo(new BigNumber(0)) > 0 ? (
                        <RedeemContent
                            redeemValue={redeemable}
                            totalBetValue={userTotal}
                            betA={game.userBetA}
                            betB={game.userBetB}
                            betTie={game.userBetTie}
                            betCount={game.betCountTeamA + game.betCountTeamB + game.betCountTie}
                            onRedeem={() => onRedeem(game)}
                        />
                    ) : (
                        <NormalContent
                            redeemValue={new BigNumber(0)} // This must be 0 if the bet is lost
                            totalBetValue={userTotal}
                            betA={game.userBetA}
                            betB={game.userBetB}
                            betTie={game.userBetTie}
                            betCount={game.betCountTeamA + game.betCountTeamB + game.betCountTie}
                            isLive={game.startDate.getTime() < new Date().getTime() && game.outcome === -1}
                        />
                    )}
                </Row>
            </Container>
        </Col>
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
                    betCount={props.betCount}
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
                <GameResultButton value={props.redeemValue} isLive={props.isLive} />
            </Col>
            <Col xs={6} className="dashboard-vertical-align dashboard-no-padding">
                <BetNormalInfo
                    totalBetValue={props.totalBetValue}
                    betA={props.betA}
                    betB={props.betB}
                    betTie={props.betTie}
                    betCount={props.betCount}
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
                        {shortenString(props.teamAName, 13, 0)}
                    </Col>
                    <Col xs={2} className="dashboard-item-team-score">
                        {props.scoreTeamA < 0 || props.scoreTeamB < 0 ? "•" : props.scoreTeamA + " - " + props.scoreTeamB}
                    </Col>
                    <Col xs={5} className="dashboard-item-team-name">
                        {shortenString(props.teamBName, 13, 0)}
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
            <div>{props.betCount} people bet on this game.</div>
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
            <div className="dashboard-bet-normal-comment">{props.betCount} people bet on this game.</div>
        </Container>
    );
}

function GameResultButton(props: any) {
    if (props.isLive) {
        return (
            <OverlayTrigger overlay={<Tooltip>This match is still in live or not yet processed</Tooltip>}>
                <Container className={"g-0 dashboard-game-result-status dashboard-pending-primary"}>
                    <div className="dashboard-game-result-status-content">
                        ...
                        <span className="dashboard-game-result-status-text">
                            <span className="dashboard-game-result-status-text-value">LIVE</span>
                        </span>
                        ...
                    </div>
                    <PendingIcon className="dashboard-game-result-status-icon dashboard-pending-secondary" />
                </Container>
            </OverlayTrigger>
        );
    }
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
