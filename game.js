// элементы интерфейса
const scoreElement = document.getElementById("score")
const clickButton = document.getElementById("clickButton")
const totalClicksElement = document.getElementById("totalClicks")
const incomePerSecondElement = document.getElementById("incomePerSecondElement")
const clickPowerElement = document.getElementById("clickPowerElement")
const upgradesListElement = document.getElementById("upgradesList")

// общие переменые
let score = 0;
let incomePerSecond = 0
let clickPower = 0
let totalClicks = 0

// инициализация игры async/await
async function loadGame(){
    const gameResponse = await fetch("http://localhost:8000/api/game.php", {
        method: "GET"
    })
    .then(response => response.json())
    score = gameResponse.score
    incomePerSecond = gameResponse.incomePerSecond
    clickPower = gameResponse.clickPower
    totalClicks = gameResponse.totalClicks
    let playerUpgrades = gameResponse.upgrades;

// 1. Создаем объект параметров
const params = new URLSearchParams();

// 2. Наполняем его в формате, который поймет PHP: upgrades[имя_апгрейда]=уровень
playerUpgrades.forEach(upgrade => {
    params.append(`upgrades[${upgrade.name}]`, upgrade.currentLevel);
});

const upgradesURL = "http://localhost:8000/api/upgrades.php?" + params.toString()

// 3. Отправляем GET-запрос с параметрами (строка получится вида: ?upgrades[rainbow]=1&upgrades[wonderful]=1)
const upgradesResponse = await fetch(upgradesURL, {
    method: "GET"
})
.then(response => response.json());

    upgradesListElement.innerHTML = upgradesResponse.upgrades

    render()
}
loadGame()

// постояное увелечение счета
setInterval(async function(){
    // отправляем запрос на растчет текущего состояния состояние счета 
    const response = await fetch("http://localhost:8000/api/income.php" , {
        method: "PUT"
    })
    .then(response => response.json())
    // читаем ответ сервера
    // исрользуем данные из ответа для отоброжения нашего клиента
    score = response.score
    render()
},500)

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