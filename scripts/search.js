const searchInput = document.querySelector('[data-search="input"]')
const searchAnswer = document.querySelector('[data-search="answer"]')
const searchButton = document.querySelector('[data-search="button"]')

const search = () => {
    const value = searchInput.value
    
    if(value.length > 0){
        searchAnswer.classList.remove("--hidden")
        searchAnswer.textContent = "Você buscou por: '" + value + "'"        
    }

    else {
        searchAnswer.classList.add("--hidden")
    }
}

searchButton.addEventListener("click", () => {
    search()
})
searchInput.addEventListener("keydown", (e) => {
    if(e.code === "Enter") search()
})

searchInput.addEventListener("input", (e) => {
    if(e.target.value === "") searchAnswer.classList.add("--hidden")
})
