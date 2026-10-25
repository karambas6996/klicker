// элементы интерфейса 
const scoreElement = document.getElementById("score")
const clickButton = document.getElementById("clickButton")
const totalClicksElement = document.getElementById("totalClicks")
const incomePerSecondElement = document.getElementById("incomePerSecondElement")
const clickPowerElement = document.getElementById("clickPowerElement")

// общие переменые
let score = 0;
let incomePerSecond = 0
let clickPower = 0
let totalClicks = 0

// инициализация игры async/await
async function loadGame(){
    const response = await fetch("http://localhost:8000/api/game.php", {
        method: "GET"
    })
    .then(response => response.json())
    score = response.score 
    incomePerSecond = response.incomePerSecond
    clickPower = response.clickPower
    totalClicks = response.totalClicks
    render()
}
loadGame()

// постояное увелечение счета
setInterval(function(){
    score = score + incomePerSecond
    render()
},1000)

// увелечение счета при клике
clickButton.addEventListener("click", async function(){
   await sendClick()
})

async function sendClick() { 
    const response = await fetch("http://localhost:8000/api/click.php", {
        method: "PUT"
    })
    .then(response => response.json())
    score = response.score
    totalClicks = response.totalClicks
    render()
}


function render() {
    scoreElement.textContent = score 
    incomePerSecondElement.textContent = incomePerSecond
    clickPowerElement.textContent = clickPower
    totalClicksElement.textContent = totalClicks
}