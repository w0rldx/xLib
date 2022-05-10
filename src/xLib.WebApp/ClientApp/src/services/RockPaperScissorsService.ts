const calculateWinOrLose = (computer: number, player: number) => {
    if (computer === 1 && player === 1) {
        return undefined;
    }

    if (computer === 2 && player === 2) {
        return undefined;
    }

    if (computer === 3 && player === 3) {
        return undefined;
    }

    if (computer === 4 && player === 4) {
        return undefined;
    }

    if (computer === 5 && player === 5) {
        return undefined;
    }

    if (computer === 1 && player === 2) {
        return true;
    }

    if (computer === 1 && player === 3) {
        return false;
    }

    if (computer === 1 && player === 4) {
        return false;
    }

    if (computer === 1 && player === 5) {
        return true;
    }

    if (computer === 2 && player === 1) {
        return false;
    }

    if (computer === 2 && player === 3) {
        return true;
    }

    if (computer === 2 && player === 4) {
        return false;
    }

    if (computer === 2 && player === 5) {
        return true;
    }

    if (computer === 3 && player === 1) {
        return true;
    }

    if (computer === 3 && player === 2) {
        return false;
    }

    if (computer === 3 && player === 4) {
        return true;
    }

    if (computer === 3 && player === 5) {
        return false;
    }

    if (computer === 4 && player === 1) {
        return true;
    }

    if (computer === 4 && player === 2) {
        return true;
    }

    if (computer === 4 && player === 3) {
        return false;
    }

    if (computer === 4 && player === 5) {
        return false;
    }

    if (computer === 5 && player === 1) {
        return false;
    }

    if (computer === 5 && player === 2) {
        return false;
    }

    if (computer === 5 && player === 3) {
        return true;
    }

    if (computer === 5 && player === 4) {
        return true;
    }

    return undefined;
};

const RockPaperScissorsService = {
    calculateWinOrLose,
};

export default RockPaperScissorsService;
