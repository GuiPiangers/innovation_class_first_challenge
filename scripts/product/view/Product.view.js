// @ts-nocheck
/** @type {Array<HTMLButtonElement>} button */
const productButtons = Array.from(document.querySelectorAll('[data-card="button-container"]'))

/**
* @typedef {Object} ProductCardInitialize
    * @property {(string)=> void} decreaseQuantity
    * @property {(string)=> void} increaseQuantity
    * @property {(string)=> number} getQuantity
*/

class ProductCardView {
    /**  @type {HTMLButtonElement | null} */
    #quantityElement = null
    /**  @type {(id: string)=> number} */
    getQuantity
    /**  @type {(id: string)=> void} */
    increaseQuantity
    /**  @type {(id: string)=> void} */
    decreaseQuantity

    /** 
     * @param {HTMLButtonElement} button 
     * @param {string} id  
    */
    #renderButton(button, id){
        return ()=> {
            const quantity = this.getQuantity(id)
            if(quantity > 0) {
                this.#renderBuyButton(button, id)
            }
            else {
                this.#renderDefaultButton(button, id)
            }
        }
    }
    
    /** @param {ProductCardInitialize} */
    initialize({ decreaseQuantity, increaseQuantity, getQuantity}){
        this.decreaseQuantity = decreaseQuantity
        this.increaseQuantity = increaseQuantity
        this.getQuantity = getQuantity
    }


    initializeListeners(){
        productButtons.forEach((buttonContainer, index) => {
            const button = buttonContainer.querySelector('[data-card="button"]')
            button.addEventListener("click", this.#renderButton(buttonContainer, `card-button-${index}`))
        })
    }

    /** 
     * @param {HTMLButtonElement} button 
     * @param {string} id  
    */
    #renderBuyButton(button, id){
        button.innerHTML = `
            <div data-card="button" class="button button--small card__button--buy">
                <button data-card="butto-minus" class="font--extra-large">-</button>
                <span data-card="quantity"> ${ this.getQuantity(id)} </span>
                <button data-card="butto-plus" class="font--extra-large">+</button>
            </div>
        `
        const minusButton = button.querySelector('[data-card="butto-minus"]')
        const plusButton = button.querySelector('[data-card="butto-plus"]')
        
        
        minusButton.addEventListener("click", ()=>{
            this.decreaseQuantity(id)
            this.#renderButton(button, id)()
        })
        plusButton.addEventListener("click", ()=>{
            this.increaseQuantity(id)
            this.#renderButton(button, id)()
        })
    }
    
    /** 
     * @param {HTMLButtonElement} button 
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
            this.increaseQuantity(id)
            this.#renderButton(buttonContainer, id)
        })
    }
}

let quantity = 1
const decreaseQuantity = () => {quantity -= 1}
const increaseQuantity = () => {quantity += 1}
const getQuantity = () => quantity

const view = new ProductCardView()
view.initialize({decreaseQuantity, getQuantity, increaseQuantity})

view.initializeListeners()

