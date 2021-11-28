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
        }
    }
    if (document.querySelector("input").value === "") {
        let button = document.querySelector("button")
        button.style.backgroundColor = "#C4C4C4"
    }
}