let turn = 1
//const row = ['f','e','d','c','b','a']
const row2 = ['a','b','c','d','e','f']
const board = [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]]
let winner = 0
let video = document.getElementById("winner-video")
let whoWin = document.getElementById("alertWinner")

function mouseOver(column) {
    if(document.getElementById('f'+column[3]).className == 0) {
        let colColor = (turn == 1) ? document.getElementById(column).style.backgroundColor = "yellow":document.getElementById(column).style.backgroundColor = "red"
    }
    if (winner != 0) {
        document.getElementById(column).style.backgroundColor = "blue"
    }
}

function mouseOut(column) {
    document.getElementById(column).style.backgroundColor = "blue"
}

function mouseClick(colVal) {
    if(winner != 0) {
        return 0
    }
    let i = 0
    checkRow(i, colVal)
    winner = checkWinner(board)
    turn *= -1
    let colColor = (turn == 1) ? document.getElementById(colVal).style.backgroundColor = "yellow":document.getElementById(colVal).style.backgroundColor = "red"
    if(winner != 0) {
        let winnerIs = (winner == 1) ? whoWin.innerHTML="Yellow is the winner!":whoWin.innerHTML="Red is the winner!"
        let winnerColor = (winner == 1) ? whoWin.style.color = "yellow":whoWin.style.color = "red"
        video.play()
        document.getElementById(colVal).style.backgroundColor = "blue"
    }
}

function clearBoard() {
    for(let i in row2) {
        for(let x = 1; x <= 7; x++) {
            document.getElementById(row2[i]+x).style.backgroundColor = 'white'
            document.getElementById(row2[i]+x).className = 0
            board[i][x-1]=0
        }
    }
    video.pause()
    video.currentTime = 0
    whoWin.innerHTML = ''
    whoWin.style.color = "white"
    winner = 0
    turn = 1
}

function checkLine(a,b,c,d) {
    // Check first cell non-zero and all cells match
    return ((a != 0) && (a ==b) && (a == c) && (a == d));
}

function checkWinner(bd) {
    for (r = 0; r < 3; r++)
        for (c = 0; c < 7; c++)
            if (checkLine(bd[r][c], bd[r+1][c], bd[r+2][c], bd[r+3][c]))
                return bd[r][c]
    for (r = 0; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(bd[r][c], bd[r][c+1], bd[r][c+2], bd[r][c+3]))
                return bd[r][c]
    for (r = 0; r < 3; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(bd[r][c], bd[r+1][c+1], bd[r+2][c+2], bd[r+3][c+3]))
                return bd[r][c]
    for (r = 3; r < 6; r++)
        for (c = 0; c < 4; c++)
            if (checkLine(bd[r][c], bd[r-1][c+1], bd[r-2][c+2], bd[r-3][c+3]))
                return bd[r][c]
    return 0;
}

// Recursive row check function
function checkRow(rowVal, colVal) {
    nextRow = rowVal + 1
    if(document.getElementById(row2[rowVal]+colVal[3]).className == 0) {
        let drop = (turn == 1) ? document.getElementById(row2[rowVal]+colVal[3]).style.backgroundColor = 'yellow':document.getElementById(row2[rowVal]+colVal[3]).style.backgroundColor = 'red'
        document.getElementById(row2[rowVal]+colVal[3]).className = turn
        board[rowVal][colVal[3]-1] = turn
    }
    else {
        checkRow(nextRow, colVal)
    }
}