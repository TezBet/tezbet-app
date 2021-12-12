import { useState, Fragment, useContext } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Button, Modal } from 'react-bootstrap';
import { ReactComponent as BankIcon } from 'bootstrap-icons/icons/bank.svg';

import { WalletContext } from '../utils/WalletContextProvider';
import { getExplorerLink, shortenString } from '../utils/utils';

function Faucet(props: any) {
    const [transactionHash, setTransactionHash] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);
    const [show, setShow] = useState(false);

    const { connected, account, refreshBalance } = useContext(WalletContext)!;
    if (!connected) return <Fragment />;

    const address = account!.address;
    const amount = 10;
    const tzlink = transactionHash ? getExplorerLink(transactionHash) : "";
    const Tezos = new TezosToolkit(process.env.REACT_APP_TEZOS_RPC!);

    const handleClose = () => {
        if (step === 3) setStep(0);
        setShow(false);
    }

    const drip = () => {
        if (address == null) return;
        setShow(true);
        if (step !== 0) return;
        setStep(1);

        InMemorySigner.fromSecretKey(process.env.REACT_APP_FAUCET_PRIVATE_KEY!)
            .then((signer) => {
                Tezos.setProvider({ signer: signer });
            }).then(() => Tezos.contract.transfer({ to: address, amount: amount }))
            .then((op) => {
                setStep(2);
                setTransactionHash(op.hash);
                return op.confirmation(1);
            }).then(() => {
                setStep(3);
                refreshBalance();
            })
            .catch((err) => setError(JSON.stringify(err, null, 2)));
    }

    return (
        <Fragment>
            <Button onClick={() => setShow(true)} variant="dark" style={{ marginRight: "10px" }}>
                <BankIcon width="18px" height="18px" style={{ top: "-3px", position: "relative" }} /> FAUCET
            </Button>

            <Modal contentClassName="faucet-modal" show={show} onHide={handleClose} onShow={drip} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Hangzhounet XTZ Faucet</Modal.Title>
                </Modal.Header>
                <Modal.Body id="faucet-modal-body">
                    <p>Transfering {amount} ꜩ to {shortenString(address, 8)}.</p>
                    {step >= 2 &&
                        <Fragment>
                            <p>Waiting for
                                <a rel="noreferrer" target="_blank" href={tzlink}> {shortenString(transactionHash, 8)} </a>
                                to be confirmed.</p>
                            <p>You can close this window. The transaction will be processed in the background.</p>
                        </Fragment>
                    }
                    {step >= 3 &&
                        <p>Operation successful.</p>
                    }
                    {error &&
                        <p>Failed: {error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="dark">Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>);
}

export default Faucet;