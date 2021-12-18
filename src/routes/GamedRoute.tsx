import { Fragment } from 'react';
import GameList from '../components/GameList/GameList';
import { GamesLoader, GamesLoaderReturnType } from "../utils/Game";

function GamedRoute(props: any) {
    return (<GamesLoader>
        {(gamesLoader: GamesLoaderReturnType) => (
            <Fragment>
                {props.home && <GameList future gamesLoader={gamesLoader} />}
                {props.live && <GameList gamesLoader={gamesLoader} />}
                {props.dashboard && <></>}
            </Fragment>
        )}
    </GamesLoader>);
}


export default GamedRoute;