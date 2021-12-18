import { Container, Row } from 'react-bootstrap';
import './HowTo.css';

function HowTo() {
    return <Container className="howto-container">
        <Row>
            <h2>How can I bet?</h2>
            <p>
                To place a bet you have to connect your wallet by clicking on the upright
                corner <b>Connect your wallet</b> button<sup>1</sup>.
                Once this is done, make sure you have some XTZ in your Hangzhou wallet to start betting<sup>2</sup>.
                You can now start betting on a game clicking on <b>Bet</b>. A window will pop-up displaying the outcomes on which you
                can bet, a multiplier indicating your potential gains and an input field<sup>3</sup>. Once you have entered a
                valid amount, click on <b>Send</b> and confirm the transaction via the wallet confirmation window.
                Consider there are needed gas fees needed to run such transactions.
            </p>
            <p><b>Keep in mind that you can only bet on non-started games.</b></p>
            <ol>
                <li>See “How to connect my wallet to Tezbet” for more details.</li>
                <li>See “How to top up my wallet with Hangzhou XTZ?” for more details.</li>
                <li>See “Potential gains” for more details on the displayed multiplier.</li>
            </ol>
        </Row>
        <Row>
            <h2>How can I connect my wallet to Tezbet?</h2>
            <p>
                A Beacon pop-up window will display a list of the Tezos-audited wallets you can connect to the application with.
                Requests can take quite a while since we are using the Hangzhou testnet; if you are stuck in a connection request
                you can cancel it and retry. Afterwards, your wallet browser extension will display a <b>Confirm</b> window asking for
                your consent to grant Tezbet connection rights. Once confirmed, the pop-up will close and
                the <b>Connect your wallet</b> will be replaced with a button containing your current Hangzhou balance and your
                wallet address. Clicking back on this button will disconnect your wallet from Tezbet.
            </p>
        </Row>
        <Row>
            <h2>How can I top up my wallet with Hangzhou XTZ?</h2>
            <p>
                Your regular XTZ won’t appear on your balance since we are not on the mainnet. To top up your wallet with Hangzhou
                XTZ, you can click on the upright <b>Faucet</b> button, which will send 10 XTZ to your address.
            </p>
        </Row>
        <Row>
            <h2>How are odds calculated?</h2>
            <p>
                The smaller the proportion of bets on an outcome relatively to the others, the higher the odds. Odds can be seen
                as potential gain multipliers and have nothing to do with common pre-calculated odds. Outcome multipliers are
                likely to change as long as players can bet and unbet on a game; they are not fixed until the game actually
                begins. Tweaking your bet amount in the betting window you can observe the potential gains multiplier changing.
            </p>
        </Row>
        <Row>
            <h2>Can I bet on several games and outcomes at the same time?</h2>
            <p>Yes. However, you will have to re-execute the betting procedure for each bet.</p>
        </Row>
        <Row>
            <h2>How can I remove my bet(s)?</h2>
            <p>
                You can remove a bet directly through your dashboard - just click on <b>Remove my bet</b> on the bet you want to remove.
                Consider there may be a bet removal fee when doing so: if you bet on a game later than 24 hours before its beginning,
                the fee will apply. Otherwise, removing a bet doesn’t cost anything more than regular transaction fees<sup>1</sup>.
            </p>
            <p><b>Keep in mind that you cannot remove bets from started games.</b></p>
            <ol>
                <li>See <b>Why are there bet removal fees?</b> for more details.</li>
            </ol>
        </Row>
        <Row>
            <h2>What if I bet on an outcome and nobody bets on the others?</h2>
            <p>
                The multiplier equals 1 when there are no recorded bets on a game, meaning that you will recover your spent amount
                if no bets are placed on adversarial outcomes when a game begins.
            </p>
        </Row>
        <Row>
            <h2>What if a game ends up being postponed/cancelled?</h2>
            <p>
                Players can recover their bet amount in such cases via their dashboard. They only pay for transaction fees.
            </p>
        </Row>
        <Row>
            <h2>Why are there bet removal fees?</h2>
            <p>
                Bet removal fees are redistributed to winning betters. Since bet removal fees only apply for late betters, this
                mechanism entices players to bet early and to stick to their original bets.
            </p>
        </Row>
        <Row>
            <h2>When will TezBet be live on Tezos mainnet?</h2>
            <p>Soon. We are sorting out issues regarding oracles. For the time being we are responsible for game updates.</p>
        </Row>
        <Row>
            <h2>When $TEZBET?</h2>
            <p>We do not plan on issuing our own FA1.2 token for the time being.</p>
        </Row>
    </Container>;
}

export default HowTo;