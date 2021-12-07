import { useParams } from "react-router-dom";

function Game(props:any) {
    const params = useParams();

    return (<div>{params.gameId} - {props.bet}</div>);
}

export default Game;