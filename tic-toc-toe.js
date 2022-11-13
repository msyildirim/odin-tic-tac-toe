const gameBoard = (() => {
    let gameBoardArray;
    const getGameBoardArray = () => gameBoardArray;
    const insertMark = (mark, row, column) => {
        //todo: check inputs if index not between 0-2 or mark is not 0 or 1 return -1
        gameBoardArray[row][column] = mark;
        
        //below code chekcs if the plyer winned.
        let colNeighInd1 = (column + 1) % 3;
        let colNeighInd2 = (column + 2) % 3;
        let rowNeighInd1 = (row + 1) % 3;
        let rowNeighInd2 = (row + 2) % 3;
        let index = row.toString() + column.toString();
        //Check row
        if ( (gameBoardArray[row][column] == gameBoardArray[row][colNeighInd1]) && (gameBoardArray[row][column] == gameBoardArray[row][colNeighInd2])){
            let rowStr = row.toString();
            let colStr = column.toString();
            let colNeighInd1Str = colNeighInd1.toString();
            let colNeighInd2Str = colNeighInd2.toString();
            let winnderIndexes = [rowStr + colStr, rowStr + colNeighInd1Str, rowStr + colNeighInd2Str];
            endGame(mark, winnderIndexes);
        };

        //Check column
        if ((gameBoardArray[row][column] == gameBoardArray[rowNeighInd1][column]) && (gameBoardArray[row][column] == gameBoardArray[rowNeighInd2][column])){
            let rowStr = row.toString();
            let rowNeighInd1Str = rowNeighInd1.toString();
            let rowNeighInd2Str = rowNeighInd2.toString();
            let colStr = column.toString();
            let winnderIndexes =  [rowStr + colStr, rowNeighInd1Str + colStr, rowNeighInd2Str + colStr];
            endGame(mark, winnderIndexes);
        }

        //Check diagonal
        if (['00', '11', '22'].includes(index)){
            if ((gameBoardArray[0][0] == gameBoardArray[1][1]) && (gameBoardArray[0][0] == gameBoardArray[2][2])){
                let winnderIndexes = ['00', '11', '22'];
                endGame(mark, winnderIndexes);
            } 
            
        };

        if (['02', '11', '20'].includes(index)){
            if ((gameBoardArray[0][2] == gameBoardArray[1][1]) && (gameBoardArray[0][2] == gameBoardArray[2][0])){
                let winnderIndexes = ['02', '11', '20'];
                endGame(mark, winnderIndexes);
            }
        };
        return false;

    };


    const restart = () => {
        gameBoardArray = [[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]; //randomly initiated
        document.querySelectorAll(".gameBoard .square p").forEach((mark)=>{
            mark.remove();
        });

        document.querySelectorAll(".gameBoard .square").forEach((square)=>{
            const boardEventHandler = () => {
                if(!square.hasChildNodes()){
                    let playerMark = playerUser.getPlayerMark();
                    let row = square.dataset.index[0];
                    let column = square.dataset.index[1];
                    let p = document.createElement("p");
                    p.innerHTML = playerMark;
                    square.append(p);
                    gameBoard.insertMark(playerMark, row, column);
                    setTimeout(playComputer, 1000); 
                }
            };
            square.addEventListener('click', boardEventHandler, 
            {once: true}) // event listener ın bir kere çalılşıp kalkması için
        });
    };

    const endGame = (player, result) => {
        const resultScreen = document.querySelector(".resultScreen");
        const mainScreen = document.querySelector(".gameFrame");
        if(player == "draw"){
            resultScreen.innerHTML = "Draw!"
        } else if (player == "X"){
            resultScreen.innerHTML = "The winner is <br>X"
        } else if (player == "O"){
            resultScreen.innerHTML = "The winner is <br>O"
        } else return "Unknown Player";
    
        result.forEach((index)=>{
            document.querySelector('#square-' + index).classList.toggle('blink');
        })
        setTimeout(()=>{
            mainScreen.classList.toggle("blur");
            resultScreen.classList.toggle("hide");
            result.forEach((index)=>{
                document.querySelector('#square-' + index).classList.toggle('blink');
            })
            document.body.addEventListener('click', ()=>{
                resultScreen.classList.toggle("hide");
                mainScreen.classList.toggle("blur");
                gameBoard.restart();
            }, {once: true});
        }, 2000);
    
    };

    return {
    insertMark, restart, getGameBoardArray
    };
})();

const Player = (playerName) => {
    let playerMark;
    const setPlayerMark = (mark) => {
        playerMark = mark;
    }
    const getPlayerName = () => playerName;
    const getPlayerMark = () => playerMark;
    return {
        setPlayerMark, getPlayerName, getPlayerMark
    }
}

//Computer play can be made smarter in the future.
function playComputer(){
    let boardArray = gameBoard.getGameBoardArray();
    for(let row=0; row<3; row++){
        for(let col=0; col<3; col++){
            if(boardArray[row][col] == -1){
                let computerMark = playerComputer.getPlayerMark();
                let square = document.querySelector('#square-' + row + col);
                let p = document.createElement("p");
                p.innerHTML = computerMark;
                square.append(p);
                gameBoard.insertMark(computerMark, row, col);
                return true;
            }
        }
    }
}
//Initialize the game
const playerUser = Player("User");
const playerComputer = Player("Computer");
playerUser.setPlayerMark('X'); // default user mark is X
playerComputer.setPlayerMark('O'); // default computer mark is O
gameBoard.restart();

///Event Listeners///
document.querySelector("#xselection").addEventListener("click", () => {
    playerUser.setPlayerMark('X');
    playerComputer.setPlayerMark('O');
});

document.querySelector("#oselection").addEventListener("click", () => {
    playerUser.setPlayerMark('O');
    playerComputer.setPlayerMark('X');
    playComputer(); //if computer is X then it will start first;
});




