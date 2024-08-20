const playerInfo = document.querySelector(".player");
const allBoxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".btn");

let currentPlayer;
let grid;

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function intializer() {
    currentPlayer = 'X';
    grid = ["", "", "", "", "", "", "", "", ""];
    allBoxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    })
    playerInfo.innerText = `Current Player - ${currentPlayer}`;
    resetBtn.classList.remove("active");
}

intializer();

function swapPlayer() {
    if (currentPlayer=== 'X')
        currentPlayer = '0';
    else
        currentPlayer = 'X';
        playerInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkWin() {
    let answer = "";
    winningConditions.forEach((position) => {
        if ((grid[position[0]] != "" || grid[position[1]] != "" || grid[position[2]] != "" ) &&
            (grid[position[0]] == grid[position[1]] && grid[position[1]] == grid[position[2]] &&
            grid[position[2]] == grid[position[0] ]
            ))
        {
            if (grid[position[0]] == 'X')
                answer = 'X';
            else
                answer = '0';

            allBoxes.forEach((box , index) => {
                box.style.pointerEvents = 'none';
            })

            allBoxes[position[0]].classList.add("win");
            allBoxes[position[1]].classList.add("win");
            allBoxes[position[2]].classList.add("win");
            
        }
    });
    if (answer != "")
    {
        playerInfo.innerText = `Winner is - ${answer}`;
        resetBtn.classList.add("active");
        return

    }
    let count = 0;
    grid.forEach((box) => {
        if (box != "")
            count++;
        
    })
    if (count === 9) 
    {
        playerInfo.innerText = "Match Tied";
        resetBtn.classList.add("active");
    }
    console.log(count);
}

function handleClick(index) {
    if (grid[index] === "")
    {   console.log("Mai print ho gya hu sahab..");
        allBoxes[index].style.pointerEvents= 'none';
        allBoxes[index].innerText = currentPlayer;
        grid[index] = currentPlayer;

        swapPlayer();
        checkWin();
    }
}

allBoxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
})

resetBtn.addEventListener('click',() => {
    intializer();
})