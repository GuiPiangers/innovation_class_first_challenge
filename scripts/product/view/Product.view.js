// @ts-nocheck
/** @type {Array<HTMLButtonElement>} button */
const productButtons = Array.from(document.querySelectorAll('[data-card="button-container"]'))

/**
* @typedef {Object} ProductCardConstructor
    * @property {()=> void} decreaseQuantity
    * @property {()=> void} increaseQuantity
    * @property {(number)=> void} getQuantity
*/

class ProductCardView {
    /**  @type {HTMLButtonElement | null} */
    #quantityElement = null
    getQuantity
    increaseQuantity
    decreaseQuantity

    /** @param {ProductCardConstructor} */
    constructor({ decreaseQuantity, increaseQuantity, getQuantity}){
        this.decreaseQuantity = decreaseQuantity
        this.increaseQuantity = increaseQuantity
        this.getQuantity = getQuantity
    }

    /** * @param {HTMLButtonElement} button */
    #renderButton(button){
        return ()=> {
            const quantity = this.getQuantity()
            if(quantity > 0) {
                this.#changeButtonToBuyButton(button)
            }
            else {
                this.#changeButtonToDefaultButton(button)
            }
        }
    }


    initializeListeners(){
        productButtons.forEach((buttonContainer) => {
            const button = buttonContainer.querySelector('[data-card="button"]')
            button.addEventListener("click", this.#renderButton(buttonContainer))
        })
    }

    /**  @param {HTMLButtonElement} button*/
    #changeButtonToBuyButton(button){
        button.innerHTML = `
            <div data-card="button" class="button button--small card__button--buy">
                <button data-card="butto-minus" class="font--extra-large">-</button>
                <span data-card="quantity"> ${ this.getQuantity()} </span>
                <button data-card="butto-plus" class="font--extra-large">+</button>
            </div>
        `
        const minusButton = button.querySelector('[data-card="butto-minus"]')
        const plusButton = button.querySelector('[data-card="butto-plus"]')
        
        
        minusButton.addEventListener("click", ()=>{
            this.decreaseQuantity()
            this.#renderButton(button)()
        })
        plusButton.addEventListener("click", ()=>{
            this.increaseQuantity()
            this.#renderButton(button)()
        })
    }
    
    /** @param {HTMLButtonElement} buttonContainer */    
    #changeButtonToDefaultButton(buttonContainer){
        const buttonHTML = `
        <button data-card="button" class="button button--small">
            Comprar
        </button>`

        buttonContainer.innerHTML = buttonHTML
        const button = buttonContainer.querySelector('[data-card="button"]')
        console.log(button)
        button.addEventListener("click", ()=> {
            this.increaseQuantity()
            this.#renderButton(buttonContainer)
        })
    }
}

let quantity = 1
const decreaseQuantity = () => {quantity -= 1}
const increaseQuantity = () => {quantity += 1}
const getQuantity = () => quantity

const view = new ProductCardView({decreaseQuantity, getQuantity, increaseQuantity})

view.initializeListeners()

