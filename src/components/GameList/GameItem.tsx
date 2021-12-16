import { Col, Container, Placeholder, Row } from "react-bootstrap";
import Game from "../../utils/Game";
import "./GameItem.css";
import { BetButton, BetInfoHero, CornerButton, TotalBet, RedeemButton } from "./GameItemCommon";

function FutureGameItem({ game, onBetClick }: { game: Game; onBetClick: () => void }) {
    const total = game.betAmountTeamA.plus(game.betAmountTeamB).plus(game.betAmountTie);

    return (
        <Container className="game-item">
            <CornerButton contractId={game.id} />
            <Row className="g-0">
                <TotalBet total={total} />
                <BetInfoHero total={total} game={game} />
                <Col xs={2} className="game-vertical-align">
                    <p>
                        <BetButton onBetClick={onBetClick} />
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

function OngoingGameItem({ game }: { game: Game }) {
    const total = game.betAmountTeamA.plus(game.betAmountTeamB).plus(game.betAmountTie);

    return (
        <Container className="game-item">
            <CornerButton contractId={game.id} />
            <Row className="g-0">
                <TotalBet total={total} />
                <BetInfoHero total={total} game={game} />
                <Col xs={2} className="game-vertical-align">
                    <p className="game-item-score">0 - 4</p>
                </Col>
            </Row>
        </Container>
    );
}

function PlayedGameItem({ game, onRedeem }: { game: Game; onRedeem: () => void }) {
    const total = game.betAmountTeamA.plus(game.betAmountTeamB).plus(game.betAmountTie);

    if (!game.userbet) {
        // "negation" of "game.userbet" is temporary here to work on the redeem button
        return (
            <Container className="game-item">
                <CornerButton contractId={game.id} />
                <Row className="g-0">
                    <TotalBet total={total} />
                    <BetInfoHero total={total} game={game} />
                    <Col xs={2} className="game-vertical-align">
                        <p>
                            <RedeemButton onRedeem={onRedeem} />
                        </p>
                    </Col>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container className="game-item">
                <CornerButton contractId={game.id} />
                <Row className="g-0">
                    <TotalBet total={total} />
                    <BetInfoHero total={total} game={game} />
                    <Col xs={2} className="game-vertical-align">
                        <p className="game-item-score">0 - 4</p>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function GameItemPlaceholder() {
    return (
        <Container className="game-item">
            <Row>
                <Placeholder as="span" animation="glow">
                    <Placeholder xs={4} />
                </Placeholder>
            </Row>
            {[...Array(2)].map((_x, i) => (
                <Row key={i}>
                    {[...Array(6)].map((_y, j) => (
                        <Col key={i + "-" + j} xs={2}>
                            <Placeholder as="span" animation="glow">
                                <Placeholder xs={12} />
                            </Placeholder>
                        </Col>
                    ))}
                </Row>
            ))}
        </Container>
    );
}

export { FutureGameItem, OngoingGameItem, GameItemPlaceholder, PlayedGameItem };
