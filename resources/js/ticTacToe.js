let turn = 1
const board = [[0,0,0],[0,0,0],[0,0,0]]
const letter = ['A','B','C']
let win = 0
let video = document.getElementById("background_video")
let boardTxt = ''
let whoWin = document.getElementById("winAlert")
whoWin.innerHTML = "Turn: X"

function mouseOver(cell) {
    if(cell.className == 0) {
        let place = (turn == 1) ? cell.innerHTML='X':cell.innerHTML='O';
    }
}

function mouseOut(cell) {
    if(cell.className == 0) {
        cell.innerHTML='';
    }
}

function mouseClick(cell,x,y) {
    if(cell.className == 0) {
        let place = (turn == 1) ? cell.innerHTML='X':cell.innerHTML='O';
        cell.className = turn
        board[x][y] = turn
        turn *= -1
    }
    for(let i in board) {
        if(board[i][0] == board[i][1] && board[i][1] == board[i][2]) {
            win = board[i][0]
            break
        }
        else if(board[0][i] == board[1][i] && board[1][i] == board[2][i]) {
            win = board[0][i]
            break
        }
    }
    if(board[0][0] == board[1][1] && board[1][1] == board[2][2]) {
        win = board[1][1]
    }
    else if(board[2][0] == board[1][1] && board[1][1] == board[0][2]) {
        win = board[1][1]
    }
    let turnIs = (turn == 1) ? whoWin.innerHTML = "Turn: X": whoWin.innerHTML = "Turn: O"
    if(win != 0) {
        let winner = (win == 1) ? whoWin.innerHTML = "X is the winner!": whoWIn.innerHTML = "O is the winner!"
        video.play()
    }
}

function clearBoard() {
    for(let i in letter) {
        for(let x = 1; x <=3; x++) {
            document.getElementById(letter[i]+x).className = 0
            document.getElementById(letter[i]+x).innerHTML = ''
            board[i][x-1]=0
        }
    }
    video.pause()
    video.currentTime=0
    whoWin.innerHTML = 'Turn: X'
    turn = 1
    win = 0
}