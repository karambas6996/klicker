// элементы интерфейса 
const scoreElement = document.getElementById("score")
const clickButton = document.getElementById("clickButton")
const totalClicksElement = document.getElementById("totalClicks")

// общие переменые
let score = 0;
let incomePerSecond = 1
let clickPower = 10
let totalClicks = 0

// постояное увелечение счета
setInterval(function(){
    score = score + incomePerSecond
    scoreElement.textContent = score 
},1000)

// увелечение счета при клике
clickButton.addEventListener("click",function(){
    score = score + clickPower
    totalClicks = totalClicks + 1
    scoreElement.textContent = score
    totalClicksElement.textContent = totalClicks 
})