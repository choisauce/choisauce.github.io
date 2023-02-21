// Initialize tape pointer and code pionter
let pntr = 0
let codePos = 0

//initialize tape of length 255
let len = 255
let tape = new Array(len).fill(0)

// Initialize output arrays 
let outputArray = []
let outputAsciiArray = ""

// Call update function to display initial values into the Tape
update()

// Brainfuck function
function brainfuck(code) {

    // Reset tape pointer and code pionter
    pntr = 0
    codePos = 0

    // Reset tape of length 255
    len = 255
    tape = new Array(len).fill(0)

    // Call update function to display initial values into the Tape
    update()
    
    // reset output arrays 
    outputArray = []
    outputAsciiArray = ""

    // Display the initialized outputs and clears the outputs when the function is called again
    document.getElementById('output').innerHTML = outputArray
    document.getElementById('outputAscii').innerHTML = outputAsciiArray

    // Parse through the code and execute brainfuck commands
    while(codePos < code.length) {

        // Shift left
        if(code[codePos] == '<') {
            pntr--
            // If pointer index is less than 0, set to 0
            if(pntr == -1) {
                pntr = tape.length - 1
            }
        }

        // Shift right
        else if(code[codePos] == '>') {
            pntr++
            // If pointer index is greater than length of tape, set to 0
            if(pntr == tape.length) {
                pntr = 0
            }
        }

        // Increment current cell
        else if(code[codePos] == '+') {
            tape[pntr]++
            // If current cell is larger than a byte, set to 0
            if(tape[pntr] == 256) {
                tape[pntr] = 0
            }
        }

        // Decrement current cell
        else if(code[codePos] == '-') {
            tape[pntr]--
            // If current cell is less than 0, set to 255
            if(tape[pntr] == -1) {
                tape[pntr] = 255
            }
        }

        // Prompt for input and set value of cell at pointer to numeric of first character
        else if(code[codePos] == ',') {
            let inputValue = 0
            do {
                try {
                    inputValue = parseInt(prompt("Enter a number between 0 and 255 inclusive: "))
                    if(inputValue < 0 || inputValue > 255) {
                        alert("ERROR: Input must be a nubmer between 0 and 255 inclusive")
                    }
                }
                catch(err) {
                    alert("ERROR: Input must be a nubmer between 0 and 255 inclusive")
                }
            } while (inputValue < 0 || inputValue > 255);
            tape[pntr] = inputValue
        }

        // Output value of cell at pointer as both numeric and ascii character
        else if(code[codePos] == '.') { 
            outputAsciiArray += String.fromCharCode(tape[pntr])
            outputArray.push(tape[pntr])
            document.getElementById('output').innerHTML = outputArray
            document.getElementById('outputAscii').innerHTML = outputAsciiArray
        }

        // Start while loop
        else if(code[codePos] == '[') {
            if(tape[pntr] == 0) {
                x = 1
                while(x > 0) {
                    codePos++
                    if(code[codePos] == '[') {
                        x++
                    }
                    else if(code[codePos] == ']') {
                        x--
                    }
                }
            }
        }
        else if(code[codePos] == ']') {
            codePos--
            x = 1
            while(x > 0) {
                if(code[codePos] == ']') {
                    x++
                }
                else if(code[codePos] == '[') {
                    x--
                }
                codePos--
            }
        }
        codePos++
        update()
    }
}

// Function to display the value of a cell in the tape
function cellDisplay(value) {
    var pointValue = pntr + value
    if(pointValue < 0) {
        cellValue = tape[tape.length + pointValue]
    }
    else if(pointValue >= tape.length) {
        cellValue = tape[pointValue - tape.length]
    }
    else {
        cellValue = tape[pointValue]
    }
    return cellValue
}

// Function to display the cell number in the tape
function cellNumDisplay(val) {
    var pointNumValue = pntr + val
    if(pointNumValue < 0) {
        cellNumValue = tape.length + pointNumValue + 1
    }
    else if(pointNumValue >= tape.length) {
        cellNumValue = pointNumValue - tape.length + 1
    }
    else {
        cellNumValue = pointNumValue + 1
    }
    return cellNumValue
}

// Functio to update the tape
function update() {
    document.getElementById('a').innerHTML=cellDisplay(-2)
    document.getElementById('b').innerHTML=cellDisplay(-1)
    document.getElementById('c').innerHTML=cellDisplay(0)
    document.getElementById('d').innerHTML=cellDisplay(1)
    document.getElementById('e').innerHTML=cellDisplay(2)
    document.getElementById('locA').innerHTML=cellNumDisplay(-2)
    document.getElementById('locB').innerHTML=cellNumDisplay(-1)
    document.getElementById('locC').innerHTML=cellNumDisplay(0)
    document.getElementById('locD').innerHTML=cellNumDisplay(1)
    document.getElementById('locE').innerHTML=cellNumDisplay(2)
}
