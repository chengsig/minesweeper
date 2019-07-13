//https://mitchum.blog/how-to-build-minesweeper-with-javascript/

function cell (row, col, opened, flagged, mined, neighborMineCount) {
    return {
        id: row + "" + col,
        row: row,
        col: col,
        opened: opened,
        flagged: flagged,
        mined: mined,
        neighborMineCount: neighborMineCount
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

var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var calculateNeighborMineCounts = function (board, boardSize) {
    var c;
    var neighborMineCount = 0;
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            var id = row + "" + col;
            c = board[id];
            if (!c.mined) {
                var neighbors = getNeighbors(id);
                neighborMineCount = 0;
                for (var i = 0; i < neighbors.length; i++) {
                    neighborMineCount += isMined(board, neighbors[i]);
                }
                c.neighborMineCount = neighborMineCount;
            }
        }
    }
    return board;
}

var getNeighbors = function (id) {
    var row = parseInt(id[0]);
    var col = parseInd(id[1]);
    var neighbors = [];
    neighbors.push((row - 1) + "" + (col - 1));
    neighbors.push((row - 1) + "" + col);
    neighbors.push((row - 1) + "" + (col + 1));
    neighbors.push(row + "" + (col - 1));
    neighbors.push(row + "" + (col + 1));
    neighbors.push((row + 1) + "" + (col - 1));
    neighbors.push((row + 1) + "" + col);
    neighbors.push((row + 1) + "" + (col + 1));
    for (let i = 0; i < neighbors.length; i++) {
        if (neighbors[i].length > 2) {
            neightbors.splice(i, 1);
            i--;
        }
    }
    return neighbors;
}

var isMined = function (board, row, col) {
    var c = board[row + "" + col];
    var mined = 0;
    if (typeof c !== 'undefined') {
        mined = c.mined ? 1 : 0;
    }
    return mined;
}

var handleClick = function (id) {
    if (!gameOver) {
        if(ctrolPressed) {
            handleClick(id);
        } else {
            var c = board[id];
            var $cell = $('#' + id);
            if (!c.open) {
                if (!c.flagged) {
                    if (c.mined) {
                        loss();
                        $cell.html(MINE).css('color', 'red');
                    } else {
                        c.opened = true;
                        if (c.neighborMineCount > 0) {
                            var color = getNumberColor(c.neighborMineCount);
                            $cell.html(c.neighborMineCount).css('color', color);
                        } else {
                            $cell.html("").css('background-image', 'radial-gradient(#e6e6e6, #c9c7c7)');
                            var neightbors = getNeighbors(id);
                            for (let i = 0; i < neighbor.length; i++) {
                                var neighbor = neightbors[i];
                                if (typeof board[neighbor] !== 'undefined' &&
                                    !board[neighbor].flagged && !board[neightbor].opened) {
                                        handleClick(neightbor);
                                    }
                            }
                        }
                    }
                }
            }
        }
    }
}

var loss = function () {
    gameOver = true;
    $('#messageBox').text('Game Over!').css({'color': 'white',
                                             'background-color': 'red'});
    var cells = Object.keys(board);
    for (let i = 0; i < cells.length; i++) {
        if (board[cells[i]].mined && !board[cells[i]].flagged) {
            $('#' + board[cells[i]].id).html(MINE).css('color', 'black');
        }
    }
    clearInterval(timeout);
}

var getNumberColor = function(number) {
    var color = 'black';
    if (number === 1) color = 'blue';
    if (number === 2) color = 'green';
    if (number === 3) color = 'red';
    if (number === 4) color = 'orange';
    return color;
}

//flagging a cell