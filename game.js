// элементы интерфейса 
const scoreElement = document.getElementById("score")
const clickButton = document.getElementById("clickButton")
const totalClicksElement = document.getElementById("totalClicks")

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
}
loadGame()

// постояное увелечение счета
setInterval(function(){
    score = score + incomePerSecond
    scoreElement.textContent = score 
},1000)

// увелечение счета при клике
clickButton.addEventListener("click",function(){
    score = score + clickPower
    totalClicks = totalClicks + 1

    syncGame()
    scoreElement.textContent = score
    totalClicksElement.textContent = totalClicks 
})

async function syncGame() { 
    await fetch("http://localhost:8000/api/click.php", {
        method: "PUT"
    })
    .then(response => response.ok)
}