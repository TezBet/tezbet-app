function shortenString(str: string, begin:number = 4, end:number = 4) {
    if (str.length <= begin + end + 3) return str;
    return str.substring(0, begin) + "..." + str.substring(str.length-end);
}

function getExplorerLink(hash: string) {
    return process.env.REACT_APP_TEZOS_EXPLORER + hash;
}

export { shortenString, getExplorerLink };