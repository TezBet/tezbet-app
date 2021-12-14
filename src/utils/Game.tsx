import BigNumber from "bignumber.js";

type Game = {
    id: string;
    startDate: Date;
    description?: string;

    teamA: string;
    teamB: string;

    betAmountTeamA: BigNumber;
    betAmountTeamB: BigNumber;
    betAmountTie: BigNumber;

    betCountTeamA: number;
    betCountTeamB: number;
    betCountTie: number;

    status: number;
};

export default Game;