/** @type {Array<HTMLButtonElement>} button */
const productButtons = Array.from(document.querySelectorAll('[data-card="button-container"]'))

/**
* @typedef {Object} ProductCardInitialize
    * @property {(id: string)=> void} onDecreaseQuantity
    * @property {(id: string)=> void} onIncreaseQuantity
    * @property {(id: string)=> number} getQuantity
*/

export class ProductCardView {
    /**  @type {(id: string)=> number} */
    getQuantity
    /**  @type {(button: HTMLButtonElement, id: string)=> void} */
    onIncreaseQuantity
    /**  @type {(button: HTMLButtonElement, id: string)=> void} */
    onDecreaseQuantity

    /** 
     * @param {HTMLButtonElement} button 
     * @param {string} id  
    */
    #renderButton(button, id){
            const quantity = this.getQuantity(id)
            if(quantity > 0) {
                this.#renderBuyButton(button, id)
            }
            else {
                this.#renderDefaultButton(button, id)
            }
            console.log(cardQuantity)
    }
    
    /** @param {ProductCardInitialize} */
    initialize({ onDecreaseQuantity, onIncreaseQuantity, getQuantity}){
        this.onDecreaseQuantity = (button, id) => {
            onDecreaseQuantity(id)
            this.#renderButton(button, id)
        }
        this.onIncreaseQuantity = (button, id) => {
            onIncreaseQuantity(id)
            this.#renderButton(button, id)
        }
        this.getQuantity = getQuantity
    }


    initializeListeners(){
        productButtons.forEach((buttonContainer, index) => {
            const button = buttonContainer.querySelector('[data-card="button"]')
            button.addEventListener("click", ()=>{
                const id = `card-button-${index}`
                this.onIncreaseQuantity(buttonContainer, id)
            })
        })
    }

    /** 
     * @param {HTMLButtonElement} buttonContainer 
     * @param {string} id  
    */
    #renderBuyButton(buttonContainer, id){
        buttonContainer.innerHTML = `
            <div data-card="button" class="button button--small card__button--buy">
                <button data-card="button-minus" class="font--extra-large card__button__operation">-</button>
                <span data-card="quantity"> ${ this.getQuantity(id)} </span>
                <button data-card="button-plus" class="font--extra-large card__button__operation">+</button>
            </div>
        `
        const minusButton = buttonContainer.querySelector('[data-card="button-minus"]')
        const plusButton = buttonContainer.querySelector('[data-card="button-plus"]')
        
        
        minusButton.addEventListener("click", ()=>{
            this.onDecreaseQuantity(buttonContainer, id)
        })
        plusButton.addEventListener("click", ()=>{
            this.onIncreaseQuantity(buttonContainer, id)
        })
    }
    
    /** 
     * @param {HTMLButtonElement} buttonContainer 
     * @param {string} id  
    */
    #renderDefaultButton(buttonContainer, id){
        const buttonHTML = `
        <button data-card="button" class="button button--small">
            Comprar
        </button>`

        buttonContainer.innerHTML = buttonHTML
        const button = buttonContainer.querySelector('[data-card="button"]')
        button.addEventListener("click", ()=> {
            this.onIncreaseQuantity(buttonContainer, id)

        })
    }
}

let cardQuantity = {}
const onDecreaseQuantity = (id) => {
    cardQuantity[id] = cardQuantity[id] !== undefined ? cardQuantity[id] - 1 : 0
}

const onIncreaseQuantity = (id) => {
    cardQuantity[id] = cardQuantity[id] !== undefined ? cardQuantity[id] + 1 : 1
}
const getQuantity = (id) => cardQuantity[id] ?? 1

const view = new ProductCardView()
view.initialize({onDecreaseQuantity, getQuantity, onIncreaseQuantity})

view.initializeListeners()

