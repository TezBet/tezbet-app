import { useEffect, useState } from "react";
import useDocumentHeight from "../utils/useDocumentHeight";
import "./Balls.css";

const rowHeight = 150;

function Balls() {
    const documentHeight = useDocumentHeight();
    const [balls, setBalls] = useState(Array<object>());
    const missing = Math.floor(documentHeight / rowHeight) - balls.length - 1;

    useEffect(() => {
        let ballsToShow: Array<object>;

        if (missing > 0) {
            const newBalls = Array<object>(missing)
                .fill({})
                .map((_x, i) => {
                    const size = getRandomInt(70, 200);
                    return {
                        left: getRandomInt(-10, 110),
                        size: size,
                        top: getRandomInt(0, rowHeight - size) + (balls.length + i + 1) * rowHeight,
                    };
                });

            ballsToShow = balls.slice().concat(newBalls);
            setBalls(ballsToShow);
        }
    }, [missing, balls]);

    return (
        <div className="soccer-balls">
            {balls.map((ballProps, i) => (
                <Ball {...ballProps} key={i} />
            ))}
        </div>
    );
}

function Ball(props: any) {
    const documentHeight = useDocumentHeight();
    const height = Math.max(0, Math.min(documentHeight - props.top, props.size));

    return (
        <div
            className="soccer-ball"
            style={{
                width: props.size + "px",
                height: height + "px",
                left: props.left + "%",
                top: props.top,
                backgroundSize: props.size + "px " + props.size + "px",
            }}
        />
    );
}

function getRandomInt(min: number, max: number) {
    if (min >= max) return min;
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export default Balls;
