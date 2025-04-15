export class Menu {
    #popover = null
    #toggleElement = null
    isOpen = false

    /**
     * @param {Element} popover 
     * @param {Element} toggleElements
    */
    constructor(popover, toggleElements) {
        this.#popover = popover
        this.#toggleElement = toggleElements

        this.#setToggleListener()
    }
    
    toggle(){
        if(!this.isOpen) return this.open()
        this.close()
    }
    
    close(){
        this.isOpen = false
        this.#setElementVisible(false)
        this.#setSelectedToggleButton(false)
    }
    
    open(){
        this.isOpen = true
        this.#setElementVisible(true)
        this.#setElementCloseMethods()
        this.#setSelectedToggleButton(true)
    }

    #setElementCloseMethods(){
        const closeOnClickOut = (e) => {
            if(!this.#popover.contains(e.target) && (!this.#toggleElement.contains(e.target))){
                this.close()
                document.removeEventListener("click", closeOnClickOut)
                document.removeEventListener("keyDown", closeOnEsq)
            }
        }

        const closeOnEsq = (e) => {
            if(e.code === "Escape"){
                this.close()
                document.removeEventListener("keyDown", closeOnEsq)
                document.removeEventListener("click", closeOnClickOut)
            }
        }

        document.addEventListener("click", closeOnClickOut)
        document.addEventListener("keydown", closeOnEsq)
    }

    #setSelectedToggleButton(isSelected){
        if(isSelected) {
            this.#toggleElement.classList.add("font--color-main")
        } else {
            this.#toggleElement.classList.remove("font--color-main")
        }
    }

    #setElementVisible(isVisible){
        if(!isVisible) {
            this.#popover.classList.add("--hidden")
        } else {
            this.#popover.classList.remove("--hidden")
        }
    }

    #setToggleListener(){
        this.#toggleElement.addEventListener("click", (e)=>{
            this.toggle()
        })
    }
}