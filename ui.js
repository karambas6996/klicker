const shopPanel = document.getElementById("shopPanel")
const openShopButton = document.getElementById("openShopButton")
const overlay = document.getElementById("overlay")

openShopButton.addEventListener("click", function(){
    shopPanel.classList.add("open")
    overlay.classList.add("open")
})

const closeShopButton = document.getElementById("closeShopButton")

closeShopButton.addEventListener("click", function(){
    shopPanel.classList.remove("open")
    overlay.classList.remove("open")
})