import { useState, Fragment } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';
import { Button, Modal } from 'react-bootstrap';

function Faucet(props:any) {
    const [transactionHash, setTransactionHash] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState(0);
    const [show, setShow] = useState(false);

    const amount = 10;
    const tzlink = transactionHash ? `https://hangzhou.tzstats.com/${transactionHash}` : "";
    const tezos = new TezosToolkit('https://rpc.hangzhounet.teztnets.xyz');

    const handleClose = () => {
        if (step === 3) setStep(0);
        setShow(false);
    }

    const drip = () => {
        if (props.address == null) return;
        setShow(true);
        if (step !== 0) return;
        setStep(1);
        
        InMemorySigner.fromSecretKey(process.env.REACT_APP_FAUCET_PRIVATE_KEY!)
        .then((signer) => {
            tezos.setProvider({ signer: signer });
        }).then(() => tezos.contract.transfer({ to: props.address, amount: amount }))
        .then((op) => { setStep(2); setTransactionHash(op.hash); op.confirmation(1).then(() => setStep(3)); })
        .catch((err) => setError(JSON.stringify(err, null, 2)));
    }

    return (
        <Fragment>
            <Button disabled={props.address == null} onClick={() => setShow(true)} variant="outline-dark" style={{ marginRight: "10px" }}>FAUCET</Button>

            <Modal contentClassName="faucet-modal" show={show} onHide={handleClose} onShow={drip} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Hangzhounet XTZ Faucet</Modal.Title>
                </Modal.Header>
                <Modal.Body id="faucet-modal-body">
                    <p>Transfering {amount} ꜩ to {props.address}.</p>
                    { step >= 2 &&
                        <Fragment>  
                            <p>Waiting for <a rel="noreferrer" target="_blank" href={tzlink}>{transactionHash}</a> to be confirmed.</p>
                            <p>You can close this window. The transaction will be processed in the background.</p>
                        </Fragment>
                    }
                    { step >= 3 &&
                        <p>Operation successful.</p>
                    }
                    { error && 
                        <p>Failed: {error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} variant="dark">Close</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>);
}

export default Faucet;