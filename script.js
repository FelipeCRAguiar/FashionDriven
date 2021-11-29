let name = prompt("Qual o seu nome?")
function select(option) {
    let parent = option.parentElement.parentElement
    if (parent.querySelector(".selected") !== null) {
        parent.querySelector(".selected").classList.remove("selected")
    }
    option.classList.add("selected")
    checkOptions()
}
function checkOptions() {
    if (document.querySelectorAll(".selected").length === 3) {
        if (document.querySelector("input").value !== "") {
            let button = document.querySelector("button")
            button.style.backgroundColor = "#404EED"
            button.setAttribute("onclick", "createShirt()")
        }
    }
    if (document.querySelector("input").value === "") {
        let button = document.querySelector("button")
        button.style.backgroundColor = "#C4C4C4"
        button.removeAttribute("onclick")
    }
}
function getShirts() {
    promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts")
    promise.then(listShirts)
}
function listShirts(promise) {
    console.log(promise)
    let shirts = promise.data
    document.querySelector(".orders").innerHTML = ""
    for (let i = 0; i < shirts.length; i++) {
        document.querySelector(".orders").innerHTML += `
        <div class="order" onclick="orderExistingShirt(this)">
            <img src="${shirts[i].image}">
            <p><b>Criador:</b> ${shirts[i].owner}</p>
            <p class="model hidden">${shirts[i].model}</p>
            <p class="neck hidden">${shirts[i].neck}</p>
            <p class="material hidden">${shirts[i].material}</p>
            <p class="image hidden">${shirts[i].image}</p>
            <p class="owner hidden">${shirts[i].owner}</p>
        </div>
        `
    }
}
function createShirt() {
    let image = document.querySelector("input").value
    try {
        new URL(image)
    }
    catch{
        return alert("Sua URL não é valida")
    }
    let choices = document.querySelectorAll(".selected .hidden")
    let shirt = {model: choices[0].innerHTML, neck: choices[1].innerHTML, material: choices[2].innerHTML, image: image, owner: name, author: name}
    let post = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", shirt)
    post.then(postShirt)
    post.catch(error)
}
function postShirt(obj) {
    alert("Sua camisa foi encomendada")
    getShirts()
}
function error(obj) {
    alert("Ops, não conseguimos processar sua encomenda")
}
function orderExistingShirt(shirt) {
    let choices = shirt.querySelectorAll(".hidden")
    let newShirt = {model: choices[0].innerHTML, neck: choices[1].innerHTML, material: choices[2].innerHTML, image: choices[3].innerHTML, owner: name, author: choices[4].innerHTML}
    if (confirm("Você quer encomendar essa camisa?")) {
        let post = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", newShirt)
        post.then(postShirt)
        post.catch(error)
    }
}
getShirts()