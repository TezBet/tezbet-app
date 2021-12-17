import Game from './Game';

function shortenString(str: string, begin: number = 4, end: number = 4) {
    if (str.length <= begin + end + 3) return str;
    return str.substring(0, begin) + "..." + str.substring(str.length - end);
}

function getExplorerLink(hash: string) {
    return process.env.REACT_APP_TEZOS_EXPLORER + hash;
}

function compareGames(a:Game, b:Game) {
    const at = a.startDate.getTime();
    const bt = b.startDate.getTime();
    if (at > bt) return 1;
    if (at < bt) return -1;
    return 0;
}

export { shortenString, getExplorerLink, compareGames };