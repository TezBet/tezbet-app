import { ContractMethod, Wallet } from '@taquito/taquito';
import BigNumber from 'bignumber.js';
import { useCallback, useContext, useMemo, useState } from 'react';
import { Button, Form, InputGroup, Modal, OverlayTrigger, ToggleButton, ToggleButtonGroup, Tooltip } from 'react-bootstrap';
import Game from '../../utils/Game';
import { WalletContext } from '../../utils/WalletContextProvider';
import './BetModal.css';
import { Multiplier, TooltippedBadge } from './GameItemCommon';

function BetModal({ show, currentGame, onBetClose }: { show: boolean, currentGame: Game, onBetClose: () => void }) {
    const { connected, balance, Tezos, refreshBalance, connect } = useContext(WalletContext)!;
    const [choice, setChoice] = useState(0);
    const [amount, setAmount] = useState(1);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const total = useMemo(() => currentGame.betAmountTeamA.plus(currentGame.betAmountTie).plus(currentGame.betAmountTeamB), [currentGame]);
    const choiceAmout = useMemo(() => {
        switch (choice) {
            case 1:
                return currentGame.betAmountTeamA;
            case 2:
                return currentGame.betAmountTie;
            case 3:
                return currentGame.betAmountTeamB;
            default:
                return new BigNumber(0);
        }
    }, [choice, currentGame]);

    const onChangeChoice = useCallback((value: number) => setChoice(value), [setChoice]);
    const onChangeAmount = useCallback((event: any) => setAmount(event.target.value), [setAmount]);
    const setMax = useCallback(() => setAmount(balance.toNumber()), [balance, setAmount]);

    const isValid = useMemo(() => (choice === 1 || choice === 2 || choice === 3) && amount >= 0.1, [choice, amount]);

    const sendBet = useCallback(() => {
        if (!isValid) return;
        setSubmitLoading(true);
        Tezos.wallet
            .at(process.env.REACT_APP_TEZBET_CONTRACT!)
            .then((contract) => {
                let m: (ContractMethod<Wallet> | undefined) = undefined;
                switch (choice) {
                    case 1:
                        m = contract.methods.bet_on_team_a(currentGame.id)
                        break;
                    case 2:
                        m = contract.methods.bet_on_tie(currentGame.id)
                        break;
                    case 3:
                        m = contract.methods.bet_on_team_b(currentGame.id)
                        break;
                }
                return m!.send({ amount: amount })
            }).then((op) => op.confirmation())
            .then((result) => {
                if (result.completed) {
                    onBetClose();
                    refreshBalance();
                } else {
                    setError("Transaction failed");
                }
            });
    }, [onBetClose, Tezos, currentGame, amount, refreshBalance, choice, setError, isValid]);

    if (!connected) connect();

    return (
        <Modal show={show} onHide={onBetClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Bet on {currentGame?.description}: {currentGame.teamA} - {currentGame.teamB}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <ToggleButtonGroup className="w-100" onChange={onChangeChoice}
                            size="lg" type="radio" name="options" value={choice}>
                            <ToggleButton disabled={submitLoading} variant="outline-dark"
                                id="toggle-1" value={1}>{currentGame.teamA}</ToggleButton>
                            <ToggleButton disabled={submitLoading} variant="outline-dark"
                                id="toggle-2" value={2}>Tie</ToggleButton>
                            <ToggleButton disabled={submitLoading} variant="outline-dark"
                                id="toggle-3" value={3}>{currentGame.teamB}</ToggleButton>
                        </ToggleButtonGroup>
                    </Form.Group>

                    {choice === 0 ?
                        <TooltippedBadge className="betmodal-odds" badgeText="?" tooltipText="Please make a choice" />
                        :
                        <Multiplier className="betmodal-odds" total={total.plus(new BigNumber(amount))} betAmount={choiceAmout.plus(new BigNumber(amount))} />
                    }

                    <Form.Group>
                        <InputGroup size="lg">
                            <InputGroup.Text>Bet amount</InputGroup.Text>
                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Minimum amount is 0.1 XTZ</Tooltip>}>
                                <Form.Control type="number" value={amount} onChange={onChangeAmount} />
                            </OverlayTrigger>
                            <InputGroup.Text>XTZ</InputGroup.Text>
                            <Button variant="success" onClick={setMax}>MAX</Button>
                        </InputGroup>
                    </Form.Group>
                </Form>

                {typeof error != 'undefined' && <p>{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onBetClose}>Cancel</Button>
                <Button variant="primary" onClick={sendBet} disabled={!isValid || submitLoading}>
                    {submitLoading ? "Loading..." : "Send to Wallet"}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export { BetModal };
