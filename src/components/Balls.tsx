import './Balls.css';
import { useState } from 'react';
import useDocumentHeight from '../utils/useDocumentHeight';

const rowHeight = 150;

function Balls() {
    const documentHeight = useDocumentHeight();
    const [balls, setBalls] = useState(Array<object>());
    let ballsToShow:Array<object>;

    const missing = Math.floor(documentHeight/rowHeight) - balls.length;    
    if (missing <= 0) {
        ballsToShow = balls;
    } else {
        const newBalls = Array<object>(missing).fill({}).map((x, i) => {
            const size = getRandomInt(70, 200);
            return {
                left: getRandomInt(-10, 110),
                size: size,
                top: getRandomInt(0, rowHeight-size) + (balls.length + i) * rowHeight,
            };
        });
        console.log(newBalls);

        ballsToShow = balls.slice().concat(newBalls);
        setBalls(ballsToShow);
    }

    return <div className="soccer-balls">
        {ballsToShow.map((ballProps, i) => <Ball {...ballProps} key={i} /> )}
    </div>;
}

function Ball(props:any) {
    const documentHeight = useDocumentHeight();
    const height = Math.max(0, Math.min(documentHeight - props.top, props.size));
    console.log(height);

    return <div className="soccer-ball" style={{
        width: props.size + "px",
        height: height + "px",
        left: props.left + "%",
        top: props.top,
        backgroundSize: props.size + "px " + props.size + "px",
    }} />;
}

function getRandomInt(min:number, max:number) {
    if (min >= max) return min;
    return Math.floor(Math.random() * (max-min+1) + min)
}

export default Balls;