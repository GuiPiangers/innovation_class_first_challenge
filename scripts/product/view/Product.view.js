/**
* @typedef {Object} ProductCardInitialize
    * @property {(id: string)=> void} onDecreaseQuantity
    * @property {(id: string)=> void} onIncreaseQuantity
    * @property {(id: string)=> number} getQuantity
*/

export class ProductsView {
    /**  @type {(id: string)=> number} */
    #getQuantity
    /**  @type {(button: HTMLButtonElement, id: string)=> void} */
    #onIncreaseQuantity
    /**  @type {(button: HTMLButtonElement, id: string)=> void} */
    #onDecreaseQuantity
    /**  @type {Array<HTMLButtonElement>}  */
    #productButtons

    /** @param {{productButtons: Array<HTMLButtonElement>}} param */
    constructor({productButtons}){
        this.#productButtons = productButtons
    }

    /** 
     * @param {HTMLButtonElement} button 
     * @param {string} id  
    */
    #renderButton(button, id){
            const quantity = this.#getQuantity(id)
            if(quantity > 0) {
                this.#renderBuyButton(button, id)
            }
            else {
                this.#renderDefaultButton(button, id)
            }
    }
    
    /** @param {ProductCardInitialize} params*/
    initialize({ onDecreaseQuantity, onIncreaseQuantity, getQuantity}){
        this.#onDecreaseQuantity = (button, id) => {
            onDecreaseQuantity(id)
            this.#renderButton(button, id)
        }
        this.#onIncreaseQuantity = (button, id) => {
            onIncreaseQuantity(id)
            this.#renderButton(button, id)
        }
        this.#getQuantity = (id) => {
            const qtd = getQuantity(id)
            return qtd
        }

        this.#initializeListeners()
    }


    #initializeListeners(){
        this.#productButtons.forEach((buttonContainer, index) => {
            const button = buttonContainer.querySelector('[data-card="button"]')
            button.addEventListener("click", ()=>{
                const id = `card-button-${index}`
                this.#onIncreaseQuantity(buttonContainer, id)
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
                <span data-card="quantity"> ${ this.#getQuantity(id)} </span>
                <button data-card="button-plus" class="font--extra-large card__button__operation">+</button>
            </div>
        `
        const minusButton = buttonContainer.querySelector('[data-card="button-minus"]')
        const plusButton = buttonContainer.querySelector('[data-card="button-plus"]')
        
        
        minusButton.addEventListener("click", ()=>{
            this.#onDecreaseQuantity(buttonContainer, id)
        })
        plusButton.addEventListener("click", ()=>{
            this.#onIncreaseQuantity(buttonContainer, id)
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
            this.#onIncreaseQuantity(buttonContainer, id)

        })
    }
}

export class ShopCardView {
    /** @type {HTMLDivElement} */
    #shopCardQuantity

    /** @param {{shopCardQuantity: HTMLDivElement}} param */
    constructor({shopCardQuantity}){
        this.#shopCardQuantity = shopCardQuantity
    }
    /** @param {string} quantity  */
    updateCardProduct(quantity){
        this.#shopCardQuantity.textContent = quantity
    }
}

