/** @type {Array<Element>} */
const searchContainers = Array.from(document.querySelectorAll('[data-search="container"]'))

class SearchInput {
    /** @type {HTMLInputElement} */
    #searchInput
    /** @type {HTMLDivElement} */
    #searchAnswer
    /** @type {HTMLButtonElement} */
    #searchButton

    /** @param {Element} searchContainer*/
    constructor(searchContainer){
        this.#searchInput = searchContainer.querySelector('[data-search="input"]')
        this.#searchAnswer = searchContainer.querySelector('[data-search="answer"]')
        this.#searchButton = searchContainer.querySelector('[data-search="button"]')
    }

    #search() {
        const value = this.#searchInput.value
        
        if(value.length > 0){
            this.#searchAnswer.classList.remove("--hidden")
            this.#searchAnswer.textContent = "Você buscou por: '" + value + "'"        
        }
    
        else {
            this.#searchAnswer.classList.add("--hidden")
        }
    }

    initialize(){
        this.#searchButton.addEventListener("click", () => {
            this.#search()
         })
         this.#searchInput.addEventListener("keydown", (e) => {
             if(e.code === "Enter") this.#search()
         })
         
         this.#searchInput.addEventListener("input", (e) => {
             // @ts-ignore
             if(e.target.value === "" ) this.#searchAnswer.classList.add("--hidden")
         })
    }
}

searchContainers.forEach(searchContainer => {
    const searchInput = new SearchInput(searchContainer)
    searchInput.initialize()
})
