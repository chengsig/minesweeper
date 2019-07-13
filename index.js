function cell (row, col, opened, flagged, mined, neighborMinCount) {
    return {
        id: row + "" + col,
        row: row,
        col: col,
        opened: opened,
        flagged: flagged,
        mined: mined,
        neighborMinCount: neighborMinCount
    }
}

function board (boardSize, mineCount) {
    var board = {};
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            board[row + "" + col] = cell(row, col, false, false, false, 0);
        }
    }
    board = randomAssignMines(board, mineCount);
    board = calculateNeighborMineCounts(board, boardSize);
    return board;
}

var randomAssignMines = function(board, mineCount) {
    let mineCoord = [];
    for (let i = 0; i < mineCount; i++) {
        var randomRowCoord = getRandomInteger(0, boardSize);
        var randomeColCoord = getRandomInteger(0, boardSize);
        var c = randomRowCoord + "" + randomeColCoord;
        while (mineCoord.includes(c)) {
            randomRowCoord = getRandomInteger(0, boardSize);
            randomeColCoord = getRandomInteger(0, boardSize);
            c = randomRowCoord + "" + randomeColCoord;
        }
        mineCoord.push(c);
        board[c].mined = true;
    }
    return board;
}