import { Fragment } from 'react';
import GameList from '../components/GameList/GameList';
import { GamesLoader, GamesLoaderReturnType } from "../utils/Game";
import HowTo from './HowTo';

function GamedRoute(props: any) {
    return (<GamesLoader>
        {(gamesLoader: GamesLoaderReturnType) => (
            <Fragment>
                {props.home && <GameList future gamesLoader={gamesLoader} />}
                {props.live && <GameList gamesLoader={gamesLoader} />}
                {props.dashboard && <></>}
                {props.howto && <HowTo />}
            </Fragment>
        )}
    </GamesLoader>);
}


export default GamedRoute;