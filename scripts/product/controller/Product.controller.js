import { ProductCard } from "../model/Product.js"
import {ProductsView} from "../view/Product.view.js"
/** @type {Array<HTMLButtonElement>} button */
const productButtons = Array.from(document.querySelectorAll('[data-card="button-container"]'))

class ProductCardController {
    /** @type {ProductCard} */
    #productCardModel
    /** @type {ProductsView} */
    #productCardView

    /**
     * 
     * @param {ProductCard} productCardModel 
     * @param {ProductsView} productCardView 
     */
    constructor(productCardModel, productCardView){
        this.#productCardModel = productCardModel
        this.#productCardView = productCardView
        this.#productCardView.initialize({
            getQuantity: (id) => this.getQuantity(id), 
            onDecreaseQuantity: (id) => this.removeProduct(id), 
            onIncreaseQuantity: (id) => {
                const product = {
                    id,
                    name: "exemplo",
                    price: 0,
                    quantity: 1
                }

                this.addProduct(product)
            }
        })

        this.#productCardView.initializeListeners()
    }

    /** @param {import("../model/Product").ProductDTO} product */
    addProduct(product){
        return this.#productCardModel.addProduct(product)
    }

    /** @param {string} id */
    removeProduct(id){
        return this.#productCardModel.removeProduct(id, 1)
    }

    /** @param {string} id */
    getQuantity(id){
        return this.#productCardModel.getQuantity(id)
    }
}

const productCardModel = new ProductCard()
const productCardView = new ProductsView({productButtons})
const productCardController = new ProductCardController(productCardModel, productCardView)

export { productCardController }