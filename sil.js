

let gameBoardArray = [[0,1,2],[0,5,6],[0,8,9]];
let row = 2
let column = 0

function checkWin(row, column, gameBoardArray) {
    let colNeighInd1 = (column + 1) % 3;
    let colNeighInd2 = (column + 2) % 3;
    let rowNeighInd1 = (row + 1) % 3;
    let rowNeighInd2 = (row + 2) % 3;
    let index = row.toString() + column.toString();
    console.log()
    //Check row
    if ( (gameBoardArray[row][column] == gameBoardArray[row][colNeighInd1]) && (gameBoardArray[row][column] == gameBoardArray[row][colNeighInd2])){
        let rowStr = row.toString();
        let colStr = column.toString();
        let colNeighInd1Str = colNeighInd1.toString();
        let colNeighInd2Str = colNeighInd2.toString();
       
        return [rowStr + colStr, rowStr + colNeighInd1Str, rowStr + colNeighInd2Str];
    };

    //Check column
    if ((gameBoardArray[row][column] == gameBoardArray[rowNeighInd1][column]) && (gameBoardArray[row][column] == gameBoardArray[rowNeighInd2][column])){
        let rowStr = row.toString();
        let rowNeighInd1Str = rowNeighInd1.toString();
        let rowNeighInd2Str = rowNeighInd2.toString();
        let colStr = column.toString();
        return [rowStr + colStr, rowNeighInd1Str + colStr, rowNeighInd2Str + colStr];
    }

    //Check diagonal
    if (['00', '11', '22'].includes(index)){
        if ((gameBoardArray[0][0] == gameBoardArray[1][1]) && (gameBoardArray[0][0] == gameBoardArray[2][2])){
            return ['00', '11', '22'];
        } 
    };

    if (['02', '11', '20'].includes(index)){
        if ((gameBoardArray[0][2] == gameBoardArray[1][1]) && (gameBoardArray[0][2] == gameBoardArray[2][0])){
            return ['02', '11', '20'];
        }
    };
    return false;
}

console.log(checkWin(row, column, gameBoardArray));